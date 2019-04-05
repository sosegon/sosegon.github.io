import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import Resume from './Resume';

const App = () => (
  <div className="wrapper">
    <Header />
    <Home />
    <About />
    <Blog />
    <Resume />
  </div>
);
export default App;