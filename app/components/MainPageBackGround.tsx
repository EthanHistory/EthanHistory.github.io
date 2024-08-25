'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar } from '@nextui-org/react';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5 } },
};

const MainPageBackGround = () => {
  const [mute, setMute] = useState(true);

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      mute ? audio.pause() : audio.play();
    }
  }, [mute]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      {/* Navbar */}
      <Navbar isBordered isBlurred className="fixed top-0 left-0 w-full z-50 flex items-center">
        <NavbarBrand className='space-x-4'>
          <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="/inseong_avatar.jpg"
          />
          <p className="font-bold text-inherit">Inseong Han</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Button color="secondary" variant="ghost">
              <Link color="foreground" href="#">
                Projects
              </Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="secondary" variant="ghost">
              <Link color="foreground" href="#">
                Work Experience
              </Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="secondary" variant="ghost">
              <Link color="foreground" href="#">
                Education
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem>
            <Button
              isIconOnly
              onClick={() => setMute(!mute)}
              className="flex"
            >
              <img
                src={mute ? "/icons/mute.svg" : "/icons/open.svg"}
                alt={mute ? "Unmute" : "Mute"}
                className="w-6 h-6"
              />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <audio id="background-music" loop>
        <source src="/sound/space_ambient.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <motion.h2
        className="text-center text-8xl font-bold text-white"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        Gen AI Engineer
      </motion.h2>
      <motion.p
        className="text-center text-2xl text-gray-500 mt-4"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        Python🐍 | Pytorch🔥 | HuggingFace🤗 | LangChain 🔗🦜
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

export default MainPageBackGround;
