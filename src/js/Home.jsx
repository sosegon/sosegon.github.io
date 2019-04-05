import React from 'react';

const Home = () => (
  <section className="home" id="Home">
    <div className="container">
      <div className="sec-cont">
        <div className="home-cont">
          <div className="side-social social-white animated bounceInLeft wow"/>
          <div className="personal-pranding">
            <h2 className="main-title animated fadeIn">
              <span>Sebastian</span> <br /> Velasquez
            </h2>
            <p className="sub-title animated fadeIn ">AI consultant</p>
            <p className="sub-title animated fadeIn ">Software developer</p>
          </div>
          <div className="slide-list animated bounceInRight wow">
            <ul>
              <li className="active"></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="water-mark text-left  animated slideInUp ">
        <div className="container">Sebastian<br />Velasquez</div>
      </div>
    </div>
  </section>
);

export default Home;