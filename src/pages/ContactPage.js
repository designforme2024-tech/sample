import Navbar from '../components/Navbar/Navbar';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/UI/WhatsAppFloat';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <WhatsAppFloat />

      <main style={{ paddingTop: '100px' }}>
        <Contact />
      </main>

      <Footer />
    </>
  );
}