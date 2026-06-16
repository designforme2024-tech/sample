import Navbar from '../components/Navbar/Navbar';
import About from '../components/About/About';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/UI/WhatsAppFloat';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <WhatsAppFloat />

      <main>
        <About />
      </main>

      <Footer />
    </>
  );
}