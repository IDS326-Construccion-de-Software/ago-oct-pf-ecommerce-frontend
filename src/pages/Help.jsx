import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Help() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <h1>Ayuda</h1>
        <p>¿Necesitas asistencia? Aquí encontrarás respuestas a preguntas frecuentes y formas de contacto.</p>
        <section style={{ marginTop: '1rem' }}>
          <h2>Contacto</h2>
          <ul>
            <li>Email: soporte@example.com</li>
            <li>Teléfono: +1 555 123 4567</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
