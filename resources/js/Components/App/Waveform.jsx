// Waveform.js
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ audioUrl, isPlaying, onSeek }) => {
    const waveformRef = useRef(null);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        if (!waveSurfer && waveformRef.current) {
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#ddd",
                progressColor: "#8B5CF6",
                cursorColor: "#8B5CF6",
                barWidth: 2,
                barGap: 3,
                height: 100,
                dragToSeek: true,
            });
            setWaveSurfer(ws);

            ws.on("seeking", (progress) => {
                if (onSeek) onSeek(progress);
            });
        }

        return () => {
            if (waveSurfer) {
                waveSurfer.destroy();
            }
        };
    }, [waveSurfer]);

    useEffect(() => {
        if (waveSurfer && audioUrl) {
            waveSurfer.load(audioUrl);
        }
    }, [waveSurfer, audioUrl]);

    useEffect(() => {
        if (waveSurfer) {
            isPlaying ? waveSurfer.play() : waveSurfer.pause();
        }
    }, [isPlaying, waveSurfer]);

    return <div className="w-full px-2" ref={waveformRef} />;
};

export default Waveform;
