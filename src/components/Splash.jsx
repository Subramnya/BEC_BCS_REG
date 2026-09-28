import React, { useEffect, useRef } from 'react';

// Full-screen intro. No skip button: it ends on its own when the video
// finishes — or immediately if the browser refuses to autoplay it
// (e.g. iOS Low Power Mode), so nobody gets stuck on a blank screen.
export default function Splash({ onDone }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };
    const v = videoRef.current;
    if (!v) return finish();

    v.src = '/intro_new.mp4';

    let startTimer = setTimeout(finish, 4000); // never started → move on
    let hardStop = null;
    const onPlaying = () => {
      clearTimeout(startTimer);
      const remaining = isFinite(v.duration) ? (v.duration - v.currentTime) * 1000 : 12000;
      hardStop = setTimeout(finish, remaining + 1500); // safety net if 'ended' never fires
    };
    v.addEventListener('playing', onPlaying, { once: true });
    v.addEventListener('ended', finish);
    v.addEventListener('error', finish);
    v.play()?.catch(finish);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hardStop);
      v.removeEventListener('ended', finish);
      v.removeEventListener('error', finish);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black h-[100dvh] w-screen overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 w-full h-full object-contain portrait:object-cover"
      />
    </div>
  );
}
