import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';

export default function GalleryPage() {
  return (
    <div className="w-full bg-black text-white min-h-screen flex flex-col justify-between">
      {/* 1. Ta Navbar identique aux autres pages */}
      <Header />
      
      <Breadcrumb />
      
      {/* 2. Le contenu de ta galerie centré et calibré */}
      <main 
        className="gallery-container flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-12"
      >
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-color, #fff)' }}>
            Notre Galerie
          </h1>
          <p className="text-lg opacity-80" style={{ color: 'var(--text-color, #ccc)' }}>
            Découvrez les moments forts et les talents de l'association en direct.
          </p>
        </header>

        {/* Section du widget Instagram Elfsight */}
        <section aria-label="Flux Instagram de Sanouva Bien" className="w-full">
          <div 
            className="elfsight-app-88979fd7-de80-4930-9632-6620ba7ba1ef" 
            data-elfsight-app-lazy
          ></div>
        </section>
      </main>

      {/* 3. Ton Footer en bas de page */}
      <Footer />
    </div>
  );
}
