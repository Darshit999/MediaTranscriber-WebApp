import React from "react";
import NewSecondaryButton from "./NewSecondaryButton";

export default function TranscriptionPage({ selectedMedia }) {
    return (
        <div className="p-6 bg-secondary h-full">
            <h1 className="text-xl font-medium py-2">
                {selectedMedia.file.name.substring(10)}
            </h1>

            <div className="pt-16">
                <div
                    className={
                        "flex text-8xl justify-center items-center " +
                        (selectedMedia.file.type == "audio"
                            ? "text-teal-600"
                            : "text-primary")
                    }
                >
                    {selectedMedia.file.type == "audio" ? (
                        <i className="fa-solid fa-file-audio"></i>
                    ) : (
                        <i className="fa-solid fa-file-video"></i>
                    )}
                </div>
                <p className="text-center text-xl font-semibold pt-8">
                    Transcribe audio or video to the text 
                </p>
                <div className="flex space-x-2 px-20 pt-6">
                    <NewSecondaryButton>
                        <span className="">
                            <i className="fa-solid fa-retweet"></i>
                        </span>
                        <span className="text-sm font-medium">
                            Transcribe Now
                        </span>
                    </NewSecondaryButton>
                </div>
            </div>
        </div>
    );
}
