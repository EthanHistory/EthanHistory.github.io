'use client';

import { motion } from 'framer-motion';
import Home from "@/app/components/Home";
import Resume from "@/app/components/Resume";
import Projects from "@/app/components/Projects";
import Navigationbar from '@/app/components/Navigationbar';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5 } },
};

const App = () => {
  const [page, setPage] = useState('Home');

  return (
    <>
      {/* Pass setPage to Navigationbar to allow page switching */}
      <Navigationbar setPage={setPage} />

      {/* Conditionally render components based on the 'page' state */}
      <motion.div key={page} variants={fadeIn} initial="initial" animate="animate">
        {page === 'Home' && <Home />}
        {page === 'Resume' && <Resume />}
        {page === 'Projects' && <Projects />}
      </motion.div>
    </>
  );
};

export default App;
