import { Mail, HelpCircle, ShieldCheck, FileText } from "lucide-react";
import Logo from "../assets/LogoTheRevenge.svg";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="rev-footer">
      <div className="container footer-grid">
        {/* Col 1: Logo */}
        <div className="footer-brand">
          <img src={Logo} alt="The Revenge" className="footer-logo" />
        </div>

        {/* Col 2: Nosotros */}
        <nav className="footer-col">
          <h4>Nosotros</h4>
          <ul>
            <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
            <li><a href="/mision">Misión y valores</a></li>
            <li><a href="/trabaja-con-nosotros">Trabaja con nosotros</a></li>
          </ul>
        </nav>

        {/* Col 3: Servicio al cliente */}
        <nav className="footer-col">
          <h4>Servicio al cliente</h4>
          <ul>
            <li>
              <a href="/ayuda">
                <HelpCircle size={16} /> Centro de ayuda
              </a>
            </li>
            <li>
              <a href="/terminos">
                <FileText size={16} /> Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/privacidad">
                <ShieldCheck size={16} /> Política de privacidad
              </a>
            </li>
          </ul>
        </nav>

        {/* Col 4: Newsletter */}
        <section className="footer-col footer-newsletter">
          <h4 className="nl-title">
            <Mail size={18} /> Suscripción newsletter
          </h4>
          <p className="nl-copy">
            Suscríbete para recibir nuestras promociones y novedades.
          </p>

          <form
            className="nl-form"
            onSubmit={(e) => {
              e.preventDefault();
             
              alert("¡Gracias por suscribirte! 🧡");
            }}
          >
            <label className="sr-only" htmlFor="nl-email">Correo electrónico</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="Ingresa tu correo electrónico"
            />
            <label className="nl-check">
              <input type="checkbox" required />
              <span>
                Acepto los <a href="/terminos">Términos y condiciones</a>
              </span>
            </label>

            <button type="submit" className="nl-btn">Suscribirme</button>
          </form>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <small>© {new Date().getFullYear()} THE REVENGE. Todos los derechos reservados.</small>
          <div className="footer-legal">
            <a href="/terminos">Términos</a>
            <span aria-hidden>·</span>
            <a href="/privacidad">Privacidad</a>
            <span aria-hidden>·</span>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
