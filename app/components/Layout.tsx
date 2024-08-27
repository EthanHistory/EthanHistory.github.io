'use client';

import Head from 'next/head';
import Script from 'next/script';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar } from '@nextui-org/react';

const Layout = ({ children }: { children: ReactNode }) => {
  const [mute, setMute] = useState(true);

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      mute ? audio.pause() : audio.play();
    }
  }, [mute]);

  return (
    <div className="dark relative min-h-screen">
      <Head>
        <title>Home</title>
      </Head>
      <Script src="/js/util.js" strategy="beforeInteractive" />
      <Script src="/js/noise.min.js" strategy="beforeInteractive" />
      <Script
        src="/js/swirl.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('swirl.js script loaded');
          if (typeof window.setup === 'function') {
            window.setup();
          }
        }}
      />
      <div className="absolute inset-0 content--canvas z-0">
        {/* Canvas will be here */}
      </div>
      {/* Navbar */}
      <Navbar isBordered isBlurred className="fixed top-0 left-0 w-full z-50 flex items-center">
        <NavbarBrand className='space-x-4'>
          <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Inseong Han"
              size="md"
              src="/inseong_avatar.jpg"
          />
          <p className="font-bold text-white">Inseong Han</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              <Button
                isIconOnly
                className="flex"
                >
                <img
                  src={"/icons/home.svg"}
                  alt={"home"}
                  className="w-6 h-6"
                  />
              </Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="secondary" variant="ghost">
              <Link color="foreground" href="/resume">
                Resume
              </Link>
            </Button>
          </NavbarItem>
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

      {/* Background Music */}
      <audio id="background-music" loop>
        <source src="/sound/space_ambient.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Main Content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
