import React from 'react';

const About = () => (
  <section className="about" id="About">
    <div className="container">
      <div className="sec-cont mt-5">
        <div className="home-cont">
          <div className="side-social social-gray">
          </div>
          <div className="inner-cont ">
            <div className="row">
              <div className="col-lg-4 col-sm-12 about-img ">
                <div className=" shadow ripple-effect">
                  <div className="wave"></div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-7 col-sm-12 ">
                <div className="about-title mb-3">
                  <h1>
                    <span>Sebastian</span> <br /> Velasquez
                  </h1>
                </div>
                <div className="about-content">
                  <p>
                    I am a computer science professional who helps other professionals and companies to solve problems using a wide range of technologies.
                  </p>
                  <p>
                    Soon after finishing my undergraduate studies, I started my career as a software developer. Over the years, I have acquired experience in different contexts of computer graphics. From creating content to be used in games and simulators, to developing tools for 3D printing purposes.
                  </p>
                  <p>
                    Following my passion for learning cutting-edge technologies, I decided to learn AI. This lead me to pursue a career in the field. After some time studying and working in different projects, I specialized in computer vision, machine learning and user experience.
                  </p>
                  <p>
                    I like to work in challenging projects, if you think I can help with yours, do not hesitate to contact me.
                  </p>
                </div>
                <br />
                <div className="buttons-grb">
                </div>
              </div>
            </div>
          </div>
          <div className="slide-list">
            <ul>
              <li></li>
              <li className="active"></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="water-mark text-right">
      <div>About&nbsp;Me</div>
    </div>
  </section>
);

export default About;