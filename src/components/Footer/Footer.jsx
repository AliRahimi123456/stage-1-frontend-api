import "../../blocks/Footer.css";
import facebook from "../../assets/facebook-icon.png";
import github from "../../assets/github-icon.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        @2025 Supersite, Powered by News API
      </div>
      <div className="footer__right">
        <div className="footer__btns-container">
          <a
            href="https://tripleten.com/"
            className="footer__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <a href="/" className="footer__btn">
            Home
          </a>
        </div>
        <div className="footer__image-container">
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
