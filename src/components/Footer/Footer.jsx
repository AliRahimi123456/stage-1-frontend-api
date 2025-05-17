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
        <button className="footer__btn">TripleTen</button>
        <button className="footer__btn">Home</button>
        <img src={facebook} alt="facebook" className="footer__icon" />
        <img src={github} alt="github" className="footer__icon" />
      </div>
    </footer>
  );
}

export default Footer;
