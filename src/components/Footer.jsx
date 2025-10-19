import { Mail, HelpCircle, ShieldCheck, FileText, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { subscribeNewsletter } from "../services/newsletterService";
import Logo from "../assets/LogoTheRevenge.svg";
import "../styles/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const handleNewsletter = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    try {
      const res = await subscribeNewsletter(email);
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: res.simulated ? 'Suscripción registrada (simulada)' : '¡Te suscribiste al newsletter!',
        showConfirmButton: false,
        timer: 2500
      });
      form.reset();
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'error',
        title: 'No se pudo completar la suscripción',
        text: err?.message || 'Intenta nuevamente más tarde',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };
  return (
    <footer className="rev-footer">
      <div className="container footer-grid">
        {/* Col 1: Logo */}
        <div className="footer-brand">
          <img src={Logo} alt="The Revenge" className="footer-logo" />
          <ul className="contact-list">
            <li>
              <Phone size={16} />
              <a href="tel:+18095551234">+1 (809) 555-1234</a>
            </li>
            <li>
              <Mail size={16} />
              <a href="mailto:soporte@therevenge.com">soporte@therevenge.com</a>
            </li>
            <li>
              <Clock size={16} />
              <span>Lun-Vie: 9:00–18:00</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>Santo Domingo, RD</span>
            </li>
          </ul>
        </div>

        {/* Col 2: Nosotros */}
        <nav className="footer-col">
          <h4>Nosotros</h4>
          <ul>
            <li><NavLink to="/sobre-nosotros">Sobre nosotros</NavLink></li>
            <li><NavLink to="/mision">Misión y valores</NavLink></li>
            <li><NavLink to="/trabaja-con-nosotros">Trabaja con nosotros</NavLink></li>
          </ul>
        </nav>

        {/* Col 3: Servicio al cliente */}
        <nav className="footer-col">
          <h4>Servicio al cliente</h4>
          <ul>
            <li>
              <NavLink to="/ayuda">
                <HelpCircle size={16} /> Centro de ayuda
              </NavLink>
            </li>
            <li>
              <NavLink to="/terminos">
                <FileText size={16} /> Términos y condiciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacidad">
                <ShieldCheck size={16} /> Política de privacidad
              </NavLink>
            </li>
          </ul>
          <div className="social-links">
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={18} />
            </a>
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={18} />
            </a>
            <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer">
              <Youtube size={18} />
            </a>
          </div>
        </nav>

        {/* Col 4: Newsletter */}
        <section className="footer-col footer-newsletter">
          <h4 className="nl-title">
            <Mail size={18} /> Suscripción newsletter
          </h4>
          <p className="nl-copy">
            Suscríbete para recibir nuestras promociones y novedades.
          </p>

          <form className="nl-form" onSubmit={handleNewsletter}>
            <label className="sr-only" htmlFor="nl-email">Correo electrónico</label>
            <input
              id="nl-email"
              type="email"
              required
              name="email"
              placeholder="Ingresa tu correo electrónico"
            />
            <label className="nl-check">
              <input type="checkbox" required />
              <span>
                Acepto los <NavLink to="/terminos">Términos y condiciones</NavLink>
              </span>
            </label>

            <button type="submit" className="nl-btn">Suscribirme</button>
          </form>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <small>© {year} THE REVENGE. Todos los derechos reservados.</small>
          <div className="footer-legal">
            <NavLink to="/terminos">Términos</NavLink>
            <span aria-hidden>·</span>
            <NavLink to="/privacidad">Privacidad</NavLink>
            <span aria-hidden>·</span>
            <NavLink to="/cookies">Cookies</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
