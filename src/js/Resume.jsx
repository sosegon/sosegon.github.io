import React from 'react';

const Resume = () => (
  <section className="Resume" id="Resume">
    <div className="container">
      <div className="row resume mt-3">
        <div className="resume-title animated fadeIn wow">
          Resume
        </div>
        <div className="buttons-grb">
          <a href="./assets/docs/resume-se-vel.pdf" className="shadow green">Download CV</a>
        </div>
      </div>
      <div className="sec-cont ">
        <div className="home-cont">
          <div className="side-social social-gray">
          </div>
          <div className="inner-cont w-100">
            <div className="row jobs">
              <div className="job-info text-left animated fadeIn wow">
                <div className="duration">2017 - Present</div>
                <div className="job-title">Mentor</div>
                <span>Udacity</span>
                <p>Supporting students to succeed in machine learning and software development programs.</p>
              </div>
              <div className="job-info text-left animated fadeIn wow">
                <div className="duration">2009 - 2016</div>
                <div className="job-title">3D modeler</div>
                <span>Freelancer</span>
                <p>Creation of 3D content for games, simulators, visualizations, etc. </p>
              </div>
              <div className="job-info text-left animated fadeIn wow">
                <div className="duration">2011 - 2016</div>
                <div className="job-title">3D developer</div>
                <span>NYQuicksale</span>
                <p>Implementation of features for CAD software.</p>
              </div>
              <div className="job-info text-right animated fadeIn wow">
                <div className="duration green">2017 - 2018</div>
                <div className="job-title">University of Edinburgh</div>
                <span className="blue">M.S., Artificial Intelligence</span>
                <p>Specialization in computer vision and user experience</p>
              </div>
              <div className="job-info text-right animated fadeIn wow">
                <div className="duration green">2016 - 2018</div>
                <div className="job-title">Udacity</div>
                <span className="blue">Nano-degree</span>
                <p>Machine learning and Android development.</p>
              </div>
              <div className="job-info text-right animated fadeIn wow">
                <div className="duration green">2002 - 2009</div>
                <div className="job-title">EPN</div>
                <span className="blue">B.S., Electronics and Networking</span>
                <p>Networking, distributed systems and programming.</p>
              </div>
              <div className="side-blobks green">
                <div className="animated fadeIn wow">
                  <img src="assets/images/iconos-24.png" className=" animated fadeIn wow"/>
                  <div className="sm-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="lg-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="lg-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="sm-line"></div>
                </div>
              </div>
              <div className="side-blobks blue">
                <div className="animated fadeIn wow">
                  <img src="assets/images/iconos-23.png" />
                  <div className="sm-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="lg-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="lg-line"></div>
                </div>
                <div className="animated fadeIn wow">
                  <div className="block "></div>
                  <div className="sm-line"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-list">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li className="active"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="water-mark text-right">
      <div>Resume</div>
    </div>
  </section>
);

export default Resume;