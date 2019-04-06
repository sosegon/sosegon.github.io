import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import Resume from './Resume';
import Footer from './Footer';
import Social from './Social';
import $ from 'jquery';

class App extends React.Component {
  moveHomeBackground() {
    setTimeout(() => {
      $('.home').addClass('backimage');
    }, 4500);
  }

  showAboutImage() {
    $(window).on('scroll', () => {
      if($(window).scrollTop() > $('.about-img').height() + 100) {
        $('.about-img').css({ 'opacity': '1', 'transform': 'scale(1)' });
        $('.wave').css({ 'animation': 'ripple-in 0.75s' });
      }
    });
  }

  resizeBlogPost() {
    $(window).on('resize', () => {
      let single_blog_height = $('.right-side').height() + "px";
      $('.left-side').css('height', single_blog_height);

      if (window.innerWidth < 991 && window.innerWidth > 767) {
        single_blog_height = $('.right-side').height() + "px";
        $('.singleBlog-img').css('height', single_blog_height);
      }
    });
  }

  render() {
    this.moveHomeBackground();
    this.showAboutImage();
    return (
      <div className="wrapper">
        <Header />
        <Home />
        <About />
        <Blog />
        <Resume />
        <Social />
        <Footer />
      </div>
    );
  }
}

export default App;