import "../../blocks/Footer.css";
import facebook from "../../assets/facebook-icon.png";
import github from "../../assets/github-icon.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">@2025 Supersite, Powered by News API</p>

      <div className="footer__content">
        <nav className="footer__nav">
          <a
            href="https://tripleten.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <a href="/" className="footer__link">
            Home
          </a>
        </nav>
        <div className="footer__social">
          <img src={facebook} alt="facebook" className="footer__icon" />
          <a
            href="https://github.com/AliRahimi123456?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
