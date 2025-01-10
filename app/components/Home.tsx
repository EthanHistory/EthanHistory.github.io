'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5 } },
};

const Home = () => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
      <motion.h2
        className="text-center text-8xl font-bold text-white"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        Data Scientist | ML Engineer
      </motion.h2>
      <motion.p
        className="text-center text-2xl text-gray-500 mt-4"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        AI Application 🤖 | ML/Dev Ops 🚀 | Agile 🎯 | System Design ⚖️
      </motion.p>
      <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
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

export default Home;
