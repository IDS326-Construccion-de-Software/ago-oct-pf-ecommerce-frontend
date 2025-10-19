import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { sendContact } from '../services/contactService';

export default function Help() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      Swal.fire({ icon: 'warning', title: 'Completa todos los campos' });
      return;
    }
    try {
      await sendContact(form);
      Swal.fire({ icon: 'success', title: 'Mensaje enviado' });
      setForm({ nombre: '', email: '', mensaje: '' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'No se pudo enviar', text: err?.message || 'Intenta más tarde' });
    }
  };

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <h1>Ayuda</h1>
        <p>¿Necesitas asistencia? Aquí encontrarás respuestas a preguntas frecuentes y formas de contacto.</p>

        <section style={{ marginTop: '1.5rem' }}>
          <h2>Contáctanos</h2>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: '10px', maxWidth: 520 }}>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={onChange} required />
            <textarea name="mensaje" placeholder="Mensaje" rows={4} value={form.mensaje} onChange={onChange} required />
            <button type="submit" className="nl-btn" style={{ width: 'fit-content' }}>Enviar</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
