const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            // video.src = window.URL.createObjectURL(localMediaStream); Was this in video but depreciated, doesnt need ti convert to url?
            video.play();
        })
        .catch(err => {
            console.error('Allow Webcam', err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

getVideo();