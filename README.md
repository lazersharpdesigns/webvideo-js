# Webvideo-js

This library provides a VideoRecorder class that will allow you to attach specific events onto
buttons and video elements to allow you to record videos through your webcam

## Installation

Install validate-object-js with npm or yarn

```bash
  npm install webvideo-js
  --or--
  yarn add webvideo-js
```

## Documentation

Available functions are:
`onStopButtonClicked, onStartButtonClicked`

In order to preview and display final video you need to add these id's to the video elements in your code:

1. "video-recorder-recording" -> for the final playable video
2. "video-recorder-preview" -> for the preview video while recording

## Demo

    ### JS Example

    const VideoRecorder = require("videorecorder-js");

    const recorder = new VideoRecorder(document);

    let startButton = document.getElementById("video-recorder-startButton"); // you can attach function to any button
    let stopButton = document.getElementById("video-recorder-stopButton"); // you can attach function to any button

    // 5000 = milliseconds for recording (default = 5000/5s)
    startButton.addEventListener("click", () => {
        recorder.onStartButtonClicked(5000, (blob, url) => {
            console.log(blob, url);
        });
    });

    stopButton.addEventListener("click", () => {
        recorder.onStopButtonClicked();
    });

    ### HTML Example
    <body>
        <div class="left">
        <div id="video-recorder-startButton" class="button">Start Recording</div>
        <h2>Preview</h2>
        <video
            id="video-recorder-preview"
            width="160"
            height="120"
            autoplay
            muted
        ></video>
        </div>
        <div class="right">
        <div id="video-recorder-stopButton" class="button">Stop Recording</div>
        <h2>Recording</h2>
        <video
            id="video-recorder-recording"
            width="160"
            height="120"
            controls
        ></video>
        <a id="video-recorder-downloadButton" class="button"> Download </a>
        </div>
    </body>

## Authors

- [@lazersharpdesigns](https://www.github.com/lazersharpdesigns)
