class VideoRecorder {
  constructor(document) {
    this.document = document;
    this.preview = document.getElementById("video-recorder-preview");
    this.recording = document.getElementById("video-recorder-recording");
  }

  wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }

  async startRecording(stream, lengthInMS = 5000) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });

    let recorded = this.wait(lengthInMS).then(
      () => recorder.state == "recording" && recorder.stop()
    );

    await Promise.all([stopped, recorded]);
    return data;
  }

  stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  onStartButtonClicked(time, callback) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.preview.srcObject = stream;
        this.preview.captureStream =
          this.preview.captureStream || this.preview.mozCaptureStream;
        return new Promise((resolve) => (this.preview.onplaying = resolve));
      })
      .then(() => this.startRecording(this.preview.captureStream(), time))
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        let url = URL.createObjectURL(recordedBlob);
        this.recording.src = url;
        this.stop(this.preview.srcObject);
        callback(recordedBlob, url);
      })
      .catch((err) => {
        throw err;
      });
  }

  onStopButtonClicked() {
    this.stop(this.preview.srcObject);
  }
}

module.exports = VideoRecorder;
