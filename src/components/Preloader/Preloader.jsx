import "../../blocks/Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-spinner"></div>
      <div className="preloader-message">searching for news</div>
    </div>
  );
};

export default Preloader;
