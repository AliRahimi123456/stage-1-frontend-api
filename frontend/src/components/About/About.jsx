import "../../blocks/About.css";
import avatarImage from "../../assets/avatar-image.png";

function About() {
  return (
    <>
      <section className="about">
        <img src={avatarImage} alt="Author" className="about__image" />

        <div className="about__content">
          <h2 className="about__title">About the author</h2>

          <div className="about__paragraphs">
            <p className="about__paragraph">
              My experience in coding has been an exciting journey of learning
              and discovery.
            </p>{" "}
            <p className="about__paragraph">
              I started with little knowledge, but through consistent practice
              and curiosity, I’ve developed skills in HTML, CSS, JavaScript, and
              Python.
            </p>
            <p className="about__paragraph">
              {" "}
              I’ve worked on several projects, including websites, data
              visualizations, and small applications, which have helped me
              understand both the creative and logical sides of programming.
            </p>
            <p className="about__paragraph">
              {" "}
              Coding has not only improved my technical skills but also
              strengthened my problem-solving and critical thinking abilities.
            </p>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
export default About;
