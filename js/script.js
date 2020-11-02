const vidWidth = 300; // def 764
const vidHeight = 424; // def 1080

document.addEventListener('DOMContentLoaded', () => {
  //Elements
  const preloader = document.querySelector('.preloader');
  const preloaderContent = document.querySelector('.preloader__content');

  preloaderContent.classList.add('preloader__content--active');

  // ! Half loading. Video active
  window.addEventListener('arjs-video-loaded', () => {
    console.log('arjs-video-loaded');
    //here goes the camera video

    preloader.classList.add('preloader--halfway');
    preloader.classList.remove('preloader--active');
  });

  // ! Full Loading. Hide preloader Ready to augment
  window.addEventListener('arjs-nft-loaded', () => {
    console.log('arjs-nft-loaded');
    //here the nft data is fully loaded
    //todo hide the preloader

    preloader.classList.remove('preloader--halfway');
  });
});

window.onload = function () {
  // console.log('AFRAME Object');
  console.log(AFRAME);

  //Console log component
  AFRAME.registerComponent('log', {
    schema: { type: 'string' },

    init: function () {
      var stringToLog = this.data;
      console.log(stringToLog);
    },
  });

  // ! Handle video play/pause on markerFound / Lost events
  AFRAME.registerComponent('videohandler', {
    init: function () {
      var marker = this.el;
      this.vid = document.querySelector('#vid');

      // console.log('this');
      // console.log(marker);

      this.el.addEventListener('arjs-nft-loaded', () => {
        console.log('arjs-nft-loaded');
      });

      window.marker = this.el;
      window.vid = this.vid;

      marker.addEventListener(
        'markerFound',
        function () {
          this.vid.play();
          console.log('video play');
          // console.log(this.el.getAttribute('position'));
          // console.log(this.el.getAttribute('rotation'));
          // console.log(this.el.getAttribute('scale'));
          // console.log(this.el.getAttribute('visible'));

          // console.log(this.vid.getAttribute('position'));
          // console.log('video');
          // console.log(this.vid);

          // console.log(this.vid.height);
        }.bind(this)
      );

      marker.addEventListener(
        'markerLost',
        function () {
          this.vid.pause();
          this.vid.currentTime = 0;
          console.log('video pause');
        }.bind(this)
      );
    },
  });

  // Define component for an video element entity
  AFRAME.registerComponent('videoelement', {
    init: function () {
      window.videoElement = this.el;
      // console.log('videoelement');
      // console.log(this.el);

      // console.log(this.el.getAttribute('position')); // 0 0 0

      // ! here set attributes of video entity (e.g. move / scale)
      // this.el.setAttribute('position', { x: 0, y: 0, z: 0 });
      // this.el.setAttribute('visible', true);

      // set SCALE of elelment. Preserved on markerLost
      // videoElement.object3D.scale.set(0.5, 0.5, 0.5);
      videoElement.object3D.position.x += vidWidth / 2;
      videoElement.object3D.position.z -= vidHeight / 2;
    },
  });
};

// source & display 414 x 736
// screen 414 x 736
// video 300 x 424
// fits marker.

// source & display 414 x 736
// screen 375 x 812
// video 300 x 424
// fits marker, x shift ~ 2.25
