import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import Resume from './Resume';
import Footer from './Footer';
import Social from './Social';

const App = () => (
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
export default App;