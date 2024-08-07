// components/MainPageBackGround.tsx
'use client';

import { motion } from 'framer-motion';
import Chat from './Chat';
import Selections from './Selections';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5 } },
};

const MainPageBackGround = () => {
  const buttonLabels = ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5'];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <motion.h2
        className="text-center text-8xl font-bold text-white mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        Inseong Han
      </motion.h2>
      <div className="w-full max-w-xl z-20">
        <Chat />
        <Selections buttons={buttonLabels} />
      </div>
      <div className="absolute bottom-4 right-4 z-30 text-gray-500 text-sm">
        <a
          href="https://github.com/crnacura/AmbientCanvasBackgrounds"
          target="_blank"
          rel="noopener noreferrer"
        >
          Background effect by crnacura
        </a>
      </div>
    </div>
  );
};

export default MainPageBackGround;
