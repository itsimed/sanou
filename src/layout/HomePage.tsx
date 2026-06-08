import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="w-full">
      <Header />
      <Breadcrumb />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
