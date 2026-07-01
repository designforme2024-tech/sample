#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const VIDEO_DIR = path.join(ROOT, 'src', 'assets', 'videos');
const TMP_DIR = path.join(VIDEO_DIR, '.tmp-optimized');

function exit(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

function checkCommand(cmd) {
  const result = spawnSync(cmd, ['-version'], { stdio: 'ignore' });
  return result.status === 0;
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.toString().trim() : '';
    throw new Error(`Command failed: ${command} ${args.join(' ')}\n${stderr}`);
  }
  return result.stdout ? result.stdout.toString() : '';
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function percentSaved(original, optimized) {
  if (original === 0) return '0%';
  return `${(((original - optimized) / original) * 100).toFixed(1)}%`;
}

function optimizeVideo(inputPath, outputPath) {
  const args = [
    '-hide_banner',
    '-y',
    '-i', inputPath,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '28',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-c:a', 'aac',
    '-b:a', '96k',
    outputPath,
  ];
  runCommand('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
}

function ensureTempDir() {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
}

function main() {
  if (!checkCommand('ffmpeg') || !checkCommand('ffprobe')) {
    exit(
      'FFmpeg is not installed or not available on PATH.\n' +
      'Install FFmpeg and make sure both `ffmpeg` and `ffprobe` are accessible, then rerun `npm run optimize:videos`.'
    );
  }

  if (!fs.existsSync(VIDEO_DIR)) {
    exit(`Video directory not found: ${VIDEO_DIR}`);
  }

  const files = fs.readdirSync(VIDEO_DIR)
    .filter((file) => file.toLowerCase().endsWith('.mp4'))
    .sort();

  if (!files.length) {
    console.log('No MP4 video files found in src/assets/videos. Nothing to optimize.');
    return;
  }

  ensureTempDir();

  const summary = [];

  for (const file of files) {
    const originalPath = path.join(VIDEO_DIR, file);
    const tempPath = path.join(TMP_DIR, file);

    const originalSize = fs.statSync(originalPath).size;
    process.stdout.write(`Optimizing ${file}... `);

    try {
      optimizeVideo(originalPath, tempPath);
      const optimizedSize = fs.statSync(tempPath).size;

      if (optimizedSize < originalSize) {
        fs.copyFileSync(tempPath, originalPath);
        fs.unlinkSync(tempPath);
        console.log(`done (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, ${percentSaved(originalSize, optimizedSize)} saved)`);
        summary.push({ file, originalSize, optimizedSize, replaced: true });
      } else {
        fs.unlinkSync(tempPath);
        console.log(`skipped (optimized larger or equal) ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, ${percentSaved(originalSize, optimizedSize)} saved`);
        summary.push({ file, originalSize, optimizedSize, replaced: false });
      }
    } catch (err) {
      console.error(`failed: ${err.message}`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      process.exit(1);
    }
  }

  console.log('\nOptimization summary:');
  summary.forEach((item) => {
    if (item.replaced) {
      console.log(`  • ${item.file}: replaced (${formatBytes(item.originalSize)} → ${formatBytes(item.optimizedSize)}, ${percentSaved(item.originalSize, item.optimizedSize)} saved)`);
    } else {
      console.log(`  • ${item.file}: kept original (${formatBytes(item.originalSize)} → ${formatBytes(item.optimizedSize)}, ${percentSaved(item.originalSize, item.optimizedSize)} saved)`);
    }
  });
  console.log('\nFinished optimizing videos.');
}

main();
