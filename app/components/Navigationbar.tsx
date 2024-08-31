'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar, Divider, Switch } from '@nextui-org/react';
import { MusicIcon } from "@/app/icons/musicIcon";
import { MuteIcon } from "@/app/icons/muteIcon";
import { useState, useEffect } from 'react';

// Define the type for the props
interface NavigationbarProps {
  setPage: (page: string) => void;
}

const Navigationbar: React.FC<NavigationbarProps> = ({ setPage }) => {
  const [isMuted, setIsMute] = useState<boolean>(true);

  const toggleMute = () => {
    setIsMute(!isMuted);
  };

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      isMuted ? audio.pause() : audio.play();
    }
  }, [isMuted]);

  return (
    <>
      <audio id="background-music" loop>
        <source src="/sound/space_ambient.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
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
          <NavbarItem className="flex h-5 items-center space-x-4">
            {/* Use setPage to change the page state on link click */}
            <Link href="#" color="secondary" onClick={() => setPage('Home')}>Home</Link>
            <Divider orientation="vertical" />
            <Link href="#" color="secondary" onClick={() => setPage('Resume')}>Resume</Link>
            <Divider orientation="vertical" />
            <Link href="#" color="secondary" onClick={() => setPage('Projects')}>Project</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Switch
            defaultSelected={false}
            size="lg"
            color="success"
            startContent={<MusicIcon />}
            endContent={<MuteIcon />}
            onValueChange={toggleMute}
          />
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Navigationbar;
