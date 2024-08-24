'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button, ScrollShadow } from '@nextui-org/react';
import Chat, { ChatHandle } from './Chat';
import Selections from './Selections';
import { generateAnswer } from '../util/api';

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
  const [resume, setResume] = useState("");
  const [mute, setMute] = useState(true);
  const chatRef = useRef<ChatHandle>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const StartChat = async (userMessage: string) => {
    try {
      if (!resume) {
        const response = await fetch('/api/extractPdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: 'resume.pdf' }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch PDF text');
        }
    
        const data = await response.json();
        const resumeText: string = data.text;
        setResume(resumeText);
      }

      if (chatRef.current) {
        chatRef.current.addMessage(userMessage, "user");
      }

      // Initialize a new message
      let accumulatedText = '';
      if (chatRef.current) {
        chatRef.current.addMessage(accumulatedText, "ai");
      }

      // Generate answer with streaming
      await generateAnswer(userMessage, resume, (chunk) => {
        accumulatedText += chunk;
        if (chatRef.current) {
          chatRef.current.updateLastMessage(accumulatedText);
        }
      });
      
    } catch (error) {
      console.error('Error in StartChat:', error);
    }
  };
  
  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      mute ? audio.pause() : audio.play();
    }
  }, [mute]);

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
        <ScrollShadow 
          className="w-full h-[400px]" ref={scrollContainerRef}
          hideScrollBar={true}
        >
          <Chat ref={chatRef} scrollContainerRef={scrollContainerRef} />
        </ScrollShadow>
        <motion.div
          initial="initial"
          animate="animate"
          variants={delayedFadeIn}
        >
          <Selections buttons={buttonLabels} onClick={StartChat} />
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
