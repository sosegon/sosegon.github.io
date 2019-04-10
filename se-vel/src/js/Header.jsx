import React from 'react';

class Header extends React.Component {
  position () {
    document.querySelector('#Home').scrollIntoView({
      behavior: 'smooth'
    });
  }
  render() {
    return (
      <div className="header container sticky-top navbar-light bg-light">
        <div className="header-cont">
          <div className="logo">
            SV
          </div>
          <nav className="navbar navbar-expand-sm">
            <span className="navbar-toggler" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <img src="../images/bars.png" className="d-block"/>
              <img src="../images/close.png" className="d-none"/>
            </span>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active animated fadeIn">
                  <a className="nav-link" href="#Home" onClick={this.position}>Home</a>
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
  }
}

export default Header;