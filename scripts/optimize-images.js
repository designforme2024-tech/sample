#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');
const VALID_IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const SOURCE_CODE_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const IMPORT_REGEX = /(import\s+[^'"\n]+\s+from\s+)(['"])([^'"\n]+\.(?:png|jpe?g))\2/g;

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function percentSaved(original, optimized) {
  if (original === 0) return '0%';
  return `${(((original - optimized) / original) * 100).toFixed(1)}%`;
}

async function pathExists(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function getWebpPath(imagePath) {
  return imagePath.replace(/\.[^.]+$/, '.webp');
}

function getWebpQuality(ext) {
  const normalized = ext.toLowerCase();
  return normalized === '.png' ? 85 : 80;
}

async function walkDirectory(sourceDir, visitor) {
  const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const resolved = path.join(sourceDir, entry.name);
    if (entry.isDirectory()) {
      await walkDirectory(resolved, visitor);
    } else {
      await visitor(resolved);
    }
  }
}

async function collectFiles(baseDir, validExts) {
  const results = [];
  await walkDirectory(baseDir, async (filePath) => {
    if (validExts.has(path.extname(filePath).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results.sort();
}

async function convertImage(sourcePath) {
  const sourceStat = await fs.promises.stat(sourcePath);
  const webpPath = getWebpPath(sourcePath);
  const tempPath = `${webpPath}.tmp`;

  try {
    const quality = getWebpQuality(path.extname(sourcePath));
    await sharp(sourcePath)
      .webp({ quality })
      .toFile(tempPath);

    await fs.promises.rename(tempPath, webpPath);
    const webpStat = await fs.promises.stat(webpPath);
    return { sourceSize: sourceStat.size, webpSize: webpStat.size, webpPath };
  } catch (error) {
    if (await pathExists(tempPath)) {
      await fs.promises.unlink(tempPath).catch(() => {});
    }
    throw error;
  }
}

async function replaceImports() {
  const sourceFiles = await collectFiles(SRC_DIR, SOURCE_CODE_EXTS);
  let replacedCount = 0;
  let filesUpdated = 0;

  for (const sourceFile of sourceFiles) {
    let content = await fs.promises.readFile(sourceFile, 'utf8');
    let updatedContent = content;
    let changed = false;

    updatedContent = updatedContent.replace(IMPORT_REGEX, (fullImport, prefix, quote, importPath) => {
      const sourceDir = path.dirname(sourceFile);
      const resolvedSource = path.resolve(sourceDir, importPath);
      const ext = path.extname(importPath).toLowerCase();
      if (!VALID_IMAGE_EXTS.has(ext)) {
        return fullImport;
      }

      const webpPath = getWebpPath(resolvedSource);
      if (!fs.existsSync(webpPath)) {
        return fullImport;
      }

      const relativeWebpPath = path.relative(sourceDir, webpPath).split(path.sep).join('/');
      const normalizedPath = relativeWebpPath.startsWith('.') ? relativeWebpPath : `./${relativeWebpPath}`;
      changed = true;
      replacedCount += 1;
      return `${prefix}${quote}${normalizedPath}${quote}`;
    });

    if (changed && updatedContent !== content) {
      await fs.promises.writeFile(sourceFile, updatedContent, 'utf8');
      filesUpdated += 1;
    }
  }

  return { filesUpdated, replacedCount };
}

async function main() {
  if (!(await pathExists(ASSETS_DIR))) {
    console.error(`\nERROR: Assets directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  const imageFiles = await collectFiles(ASSETS_DIR, VALID_IMAGE_EXTS);
  if (!imageFiles.length) {
    console.log('No PNG or JPEG images found under src/assets.');
    return;
  }

  let converted = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  console.log(`Optimizing ${imageFiles.length} images under src/assets...`);

  for (const sourcePath of imageFiles) {
    const webpPath = getWebpPath(sourcePath);
    const sourceStat = await fs.promises.stat(sourcePath);
    const sourceSize = sourceStat.size;
    totalBefore += sourceSize;

    const shouldSkip = await pathExists(webpPath) && (await fs.promises.stat(webpPath)).mtimeMs >= sourceStat.mtimeMs;
    if (shouldSkip) {
      skipped += 1;
      const webpSize = (await fs.promises.stat(webpPath)).size;
      totalAfter += webpSize;
      console.log(`SKIP ${path.relative(ROOT, sourcePath)} → ${path.relative(ROOT, webpPath)} (${formatBytes(sourceSize)} → ${formatBytes(webpSize)}, ${percentSaved(sourceSize, webpSize)} saved)`);
      continue;
    }

    try {
      const { webpSize } = await convertImage(sourcePath);
      converted += 1;
      totalAfter += webpSize;
      console.log(`CONVERT ${path.relative(ROOT, sourcePath)} → ${path.relative(ROOT, webpPath)} (${formatBytes(sourceSize)} → ${formatBytes(webpSize)}, ${percentSaved(sourceSize, webpSize)} saved)`);
    } catch (error) {
      console.error(`FAILED ${path.relative(ROOT, sourcePath)}: ${error.message}`);
    }
  }

  const importResult = await replaceImports();
  const totalSaved = percentSaved(totalBefore, totalAfter);

  console.log('\nImage optimization summary:');
  console.log(`  Images converted: ${converted}`);
  console.log(`  Images skipped: ${skipped}`);
  console.log(`  Import references updated: ${importResult.replacedCount} occurrences in ${importResult.filesUpdated} files`);
  console.log(`  Total size before: ${formatBytes(totalBefore)}`);
  console.log(`  Total size after: ${formatBytes(totalAfter)}`);
  console.log(`  Total percentage saved: ${totalSaved}`);
}

main().catch((error) => {
  console.error(`\nERROR: ${error.message}`);
  process.exit(1);
});
