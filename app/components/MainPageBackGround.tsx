'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Chat from './Chat';
import Selections from './Selections';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5 } },
};

const delayedFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5, delay: 1 } },
};

const MainPageBackGround = () => {
  const buttonLabels = ['Summary', 'Education', 'Projects', 'Job Ex', 'Contact'];
  const [mute, setMute] = useState(false);

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      mute ? audio.pause() : audio.play();
    }
  }, [mute]);

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => {
        console.log("Audio play was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <audio id="background-music" loop>
        <source src="/sound/space_ambient.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <motion.h2
        className="text-center text-8xl font-bold text-white mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        Inseong Han
      </motion.h2>
      <div className="w-full max-w-2xl">
        <Chat />
        <motion.div
          initial="initial"
          animate="animate"
          variants={delayedFadeIn}
        >
          <Selections buttons={buttonLabels} onClick={generateAnswer} />
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
        <a
          href="https://github.com/crnacura/AmbientCanvasBackgrounds"
          target="_blank"
          rel="noopener noreferrer"
        >
          Background effect by crnacura
        </a>
      </div>
      <Button
        isIconOnly
        onClick={() => setMute(!mute)} 
        className="absolute flex top-4 right-4"
      >
        <img 
          src={mute ? "/icons/mute.svg" : "/icons/open.svg"} 
          alt={mute ? "Unmute" : "Mute"} 
          className="w-6 h-6"
        />
      </Button>
    </div>
  );
};

export default MainPageBackGround;
