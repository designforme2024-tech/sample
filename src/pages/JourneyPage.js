import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/UI/WhatsAppFloat';
import GrowthJourneyV2 from '../components/GrowthJourneyV3/GrowthJourneyV3';

export default function JourneyPage() {
  return (
    <>
      <Navbar />
      <WhatsAppFloat />

      <main style={{ paddingTop: '20px' }}>
        <GrowthJourneyV2 />
      </main>

      <Footer />
    </>
  );
}