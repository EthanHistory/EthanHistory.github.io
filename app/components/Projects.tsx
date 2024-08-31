'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Chip, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { GithubIcon } from '@/app/icons/githubIcon';
import { YoutubeIcon } from "../icons/youtubeIcon";

interface ProjectItem {
    title: string;
    subtitle: string;
    img: string;
    skills: string[];
    theme: string;
    summary: JSX.Element;  // Changed type to JSX.Element
    github?: string;
    youtube?: string;
}

const Projects = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);

    const list: ProjectItem[] = [
        {
            title: "RehearsAI",
            subtitle: "AI mock interview web application",
            img: "/project_thumbnails/rehearsAI.jpg",
            skills: ["Google Gemini", "Nextjs", "LangChain"],
            theme: "dark",
            summary: (
                <p>
                    RehearsAI is an innovative web application built with Next.js that revolutionizes the way you prepare for behavioral interviews. With its AI-driven mock interviews, you can practice in a realistic environment with voice interaction, experiencing responses in as little as 2-3 seconds. The platform allows you to pause and resume interviews at any time and offers customization options for your name, job description, and interview duration, up to 10 minutes. After each session, you&apos;ll receive detailed feedback, including an overall review, specific comments, and access to voice recordings for thorough preparation.
                </p>
            ),            
            youtube: "https://www.youtube.com/watch?v=cV3pxeGaZ7U&t=8s"
        },
        {
            title: "Camera Calibration",
            subtitle: "Implementation of Zhang's method",
            img: "/project_thumbnails/calibration.png",
            skills: ["Non-linear optimization", "OpenCV"],
            theme: "dark",
            summary: (
                <p>
                    Camera calibration involves estimating parameters related to the transformation in the pinhole camera model. 
                    This includes intrinsic and extrinsic camera parameters, which are essential for accurate image analysis and computer vision tasks.
                </p>
            ),
            github: "https://github.com/EthanHistory/Camera-Calibration/tree/main"
        }
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.1, ease: "easeInOut" }
        },
    };

    const handleCardPress = (item: ProjectItem) => {
        setSelectedItem(item);
        onOpen();
    };

    return (
        <>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                {list.map((item, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={cardVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none m-2 overflow-hidden"
                            isPressable
                            onPress={() => handleCardPress(item)}
                        >
                            <CardHeader className={`absolute z-10 top-1 flex-col !items-start ${item.theme}`}>
                                <div className="absolute top-0 left-0 m-4 p-2 bg-black/40 backdrop-blur-md rounded-lg">
                                    <p className="text-left text-sm text-white/60 uppercase font-bold">{item.title}</p>
                                    <h4 className="text-xl font-medium text-white">{item.subtitle}</h4>
                                </div>
                            </CardHeader>
                            <Image
                                alt={item.subtitle}
                                className="z-0 w-full h-full object-cover"
                                height={300}
                                src={item.img}
                                width={500}
                            />
                            <CardFooter className="space-x-2 justify-end before:bg-white/10 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
                                {
                                    item.skills?.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            color="success"
                                            variant="dot"
                                            className={`${item.theme}`}
                                        >
                                            {skill}
                                        </Chip>
                                    ))
                                }
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Modal component */}
            <Modal 
                backdrop="opaque" 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ width: '90vw', maxHeight: '80vh' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Project Summary</ModalHeader>
                            <ModalBody>
                                {selectedItem?.summary} {/* Render summary directly */}
                            </ModalBody>
                            <ModalFooter>
                                {selectedItem?.github && (
                                    <Button
                                        isIconOnly
                                        as="a"
                                        href={selectedItem.github}
                                        className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                                        target="_blank"
                                    >
                                        <GithubIcon />
                                    </Button>
                                )}
                                {selectedItem?.youtube && (
                                    <Button
                                        isIconOnly
                                        as="a"
                                        href={selectedItem.youtube}
                                        className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                                        target="_blank"
                                    >
                                        <YoutubeIcon />
                                    </Button>
                                )}
                                {!selectedItem?.github && !selectedItem?.youtube && (
                                    <>
                                        <Button color="primary" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                            Action
                                        </Button>
                                    </>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default Projects;
