import "../../blocks/About.css";
import avatarImage from "../../assets/avatar-image.png";
// import Footer from "../Footer/Footer";

function About() {
  return (
    <>
      <div className="about">
        <img src={avatarImage} alt="Author" className="about__image" />

        <div className="about__text">
          <h1 className="about__author">About the author</h1>
          <p className="about__author-paragraph">
            <p className="about__author-paragraph">
              My experience in coding has been an exciting journey of learning
              and discovery.
            </p>{" "}
            <p className="about__author-paragraph">
              I started with little knowledge, but through consistent practice
              and curiosity, I’ve developed skills in HTML, CSS, JavaScript, and
              Python.
            </p>
            <p className="about__author-paragraph">
              {" "}
              I’ve worked on several projects, including websites, data
              visualizations, and small applications, which have helped me
              understand both the creative and logical sides of programming.
            </p>
            <p className="about__author-paragraph">
              {" "}
              Coding has not only improved my technical skills but also
              strengthened my problem-solving and critical thinking abilities.
            </p>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
export default About;
