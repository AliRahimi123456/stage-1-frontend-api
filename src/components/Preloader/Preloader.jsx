import "../../blocks/Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__spinner"></div>
      <div className="preloader__message">searching for news</div>
    </div>
  );
};

export default Preloader;
