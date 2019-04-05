import React from 'react';

const Header = () => (
	<div className="header">
    <div className="header-cont">
      <nav className="navbar navbar-expand-sm">
        <span className="navbar-toggler" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <img src="assets/images/bars.png" className="d-block"/>
          <img src="assets/images/close.png" className="d-none"/>
        </span>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active animated fadeIn">
              <a className="nav-link" href="#Home">Home</a>
            </li>
            <li className="nav-item animated fadeIn">
              <a className="nav-link" href="#About">About Me</a>
            </li>
            <li className="nav-item animated fadeIn">
              <a className="nav-link" href="#Blog">Blog</a>
            </li>
            <li className="nav-item animated fadeIn">
              <a className="nav-link" href="#Resume">Resume</a>
            </li>
          </ul>
        </div>
        <div className="nav-border  bounceInRight wow animated"></div>
      </nav>
    </div>
  </div>
);

export default Header;
