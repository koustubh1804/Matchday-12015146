import React, { useEffect } from "react";
import "./Video.css";
import video from "../assets/video.mp4";

const Video = () => {
  var videoObject = null;
  useEffect(() => {
    videoObject = document.getElementById("video");
  }, []);

  const play = () => {
    if (videoObject.paused) videoObject.play();
  };

  const pause = () => {
    if (!videoObject.paused) videoObject.pause();
  };

  const forward = () => {
    var newTime,
      forwardAmt = 5,
      videoTime = videoObject.currentTime,
      videoDuration = videoObject.duration;
    if (videoTime + forwardAmt <= videoDuration) {
      newTime = videoTime + forwardAmt;
    } else {
      newTime = videoDuration;
    }
    videoObject.currentTime = newTime;
  };

  const backward = () => {
    var newTime,
      backwardAmt = 5,
      videoTime = videoObject.currentTime;
    if (videoTime - backwardAmt >= 0) {
      newTime = videoTime - backwardAmt;
    } else {
      newTime = 0;
    }
    videoObject.currentTime = newTime;
  };

  return (
    <div className="video-screen">
      <header>
        <h2>Video Analytics</h2>
      </header>
      <video id="video" autoPlay src={video} />
      <div className="controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={forward}>5 sec forward</button>
        <button onClick={backward}>5 sec backward</button>
      </div>
    </div>
  );
};

export default Video;
