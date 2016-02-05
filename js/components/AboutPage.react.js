/*
  Currently chat ap ahs header, the thread section, and the message section
  UserNameSetter is part of message section right now but could be
  set apart
*/

var Header = require('./Header.react');
var React = require('react');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div className='chatapp'>
        <Header />
        <div className="AboutPage">
          <div className='col-md-6 col-md-offset-3'>
            <p>
              I made this as a way to learn about React.js and the flux
              architecture described by facebook.
            </p>

            <div className="row">
              <p> </p>
            </div>

              <p>
                To see the code head over to my github:
                <a href='https://github.com/williambertrand/BertChat'> williambertrand </a>
              </p>

              <p>Also, I loved this video:
                <a href='https://www.youtube.com/watch?v=nYkdrAPrdcw'>Flux video</a>
              </p>

              <div className="row">
                <p> </p>
              </div>
              <div className="row">
                <p> </p>
              </div>

              <p>Other Ways to Connect:</p>

              <p></p>

              <div className='row'>

                <div className='col-md-6 col-offset-3'>
                  <a href='https://www.linkedin.com/in/williambertrand'>
                    <img src='https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAANyAAAAJGRlZTNlZDQwLTk4YTItNDA1MS04MzBjLWJmNGQ5M2RmZGUxYw.png'
                         className='icon-img'/>
                  </a>

                  <a href='https://www.facebook.com/william.bertrand.31'>
                    <img src='https://www.facebookbrand.com/img/fb-art.jpg'
                         className='icon-img'/>
                  </a>
                </div>

              </div>

          </div>
        </div>

      </div>

    );
  }

});

module.exports = AboutPage;
