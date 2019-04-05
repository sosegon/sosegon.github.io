import React from 'react';

const Blog = () => (
	<section className="Blog" id="Blog">
    <div className="container">
      <div className="sec-cont mt-5">
        <div className="home-cont">
          <div className="side-social social-white" />
          <div className="inner-cont w-100">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 ">
                <div className="input-group mb-3 handel-sm">
                  <div className="input-group-append" />
                </div>
              </div>
              <div className="col-lg-1 d-lg-block d-md-none"></div>
              <div className="col-md-8 col-sm-12 ">
                <div className="blog-content row">
                  <div className="col-lg-4 col-md-6 blog-block animated fadeInRight wow">
                    <a href="https://medium.com/datadriveninvestor/computer-vision-with-human-faces-3-3-c15665228cc">
                      <div className="blog-img">
                      </div>
                      <div className="blog-des">
                        <div className="b-title">AI</div>
                        <h3>Computer vision with human faces (3/3)</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-6  blog-block animated fadeInRight wow">
                    <a href="https://medium.com/@sosegon/affordances-and-visual-consistency-6c04b4f7cdf4">
                      <div className="blog-img">
                      </div>
                      <div className="blog-des">
                        <div className="b-title">UX</div>
                        <h3>Affordances and Visual Consistency</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-12  blog-block animated fadeInRight wow">
                    <a href="https://medium.com/@sosegon/machine-learning-to-classNameify-pixels-68b628715833">
                      <div className="blog-img">
                      </div>
                      <div className="blog-des">
                        <div className="b-title">AI</div>
                        <h3>Machine Learning to classNameify pixels</h3>
                      </div>
                    </a>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="slide-list">
            <ul>
              <li></li>
              <li></li>
              <li className="active"></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sec-footer ">
        <div className="col-sm-4 col-md-3">
          <div className="row"><a href="https://www.linkedin.com/in/sosegon/" className="title"> Contact Me</a></div>
        </div>
      </div>
    </div>
    <div className="water-mark text-left">
      <div>Blog</div>
    </div>
  </section>
);

export default Blog;