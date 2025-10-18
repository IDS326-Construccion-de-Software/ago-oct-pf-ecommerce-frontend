import HeaderSimple from '../components/HeaderSimple';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <HeaderSimple />
      <main className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Página no encontrada</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          La ruta que intentas abrir no existe o fue movida.
        </p>
        <Link to="/" className="btn-orange" style={{ padding: '0.75rem 1rem', borderRadius: 8 }}>
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
