import React, { useEffect, useRef, useState } from "react";
import Waveform from "./App/Waveform";

const MediaPlayer = ({ className, file }) => {
    const [isPlaying, setisPlaying] = useState(false);
    const [currentTime, setcurrentTime] = useState(0);
    const [duration, setduration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef(null);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setisPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setcurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedData = () => {
        setduration(audioRef.current.duration);
    };

    const handleSeek = (progress) => {
        if (isFinite(progress)) {
            setcurrentTime(parseInt(progress));
        } else {
            const value = parseFloat(progress.target.value);
            if (audioRef.current && isFinite(duration)) {
                const newTime = (value / 100) * 100;

                setcurrentTime(newTime);
            }
        }
    };

    const handleMute = () => {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    console.log(file)
    return (
        <div className="relative">
            {file ? (
                <div className="flex mb-2 items-center justify-center overflow-hidden bg-gradient-to-r from-violet-800 to-purple-800 opacity-80 h-48 rounded-md">
                    {file.file.type == "audio" ? (
                        <Waveform
                            audioUrl={file.file.url}
                            isPlaying={isPlaying}
                            onSeek={handleSeek}
                        />
                    ) : (
                        <video
                            className="object-cover w-full h-full"
                            src={file.file.url}
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedData={handleLoadedData}
                        />
                    )}

                    <audio
                        src={file.file.url}
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedData={handleLoadedData}
                    />
                </div>
            ) : (
                <div className="flex mb-2 items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-900 opacity-80 h-48 rounded-md"></div>
            )}

            <div className="w-full px-2 bg-gradient-to-t sm:from-transparent from-black/50 sm:relative absolute bottom-0 ">
                {file && file.file.type == "video" && (
                    <div className={"sm:pb-2 " + (file ? "" : "opacity-60")}>
                        <input
                            className="w-full audio-range"
                            type="range"
                            max={duration}
                            min={0}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                    </div>
                )}
                <div className="flex sm:space-x-3 sm:px-0 px-2 items-center sm:pt-2">
                    <div className="flex justify-center sm:order-1 order-2 sm:w-auto w-full items-center space-x-2">
                        <button
                            className={
                                "flex justify-center items-center size-8 sm:bg-black text-secondary rounded-full " +
                                (file ? "" : "opacity-50")
                            }
                            onClick={toggleAudio}
                            disabled={file ? false : true}
                        >
                            {isPlaying ? (
                                <i className="fa-solid fa-pause"></i>
                            ) : (
                                <i className="fa-solid fa-play"></i>
                            )}
                        </button>
                    </div>
                    <div
                        className={
                            "flex sm:order-2 justify-end pt-1 order-3 sm:w-auto w-full items-center text-sm select-none sm:text-gray-500 text-secondary " +
                            (file ? "" : "opacity-60")
                        }
                    >
                        <span>{formatTime(currentTime)}</span> /{" "}
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className="flex sm:order-3 sm:text-md text-sm order-1 w-full sm:justify-end justify-start sm:text-black text-secondary">
                        <button
                            className={file ? "" : "opacity-50"}
                            onClick={handleMute}
                            disabled={file ? false : true}
                        >
                            {isMuted ? (
                                <i className="fa-solid fa-volume-xmark"></i>
                            ) : (
                                <i className="fa-solid fa-volume-high"></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPlayer;
