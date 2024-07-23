import React, { useState } from "react";
import NewSecondaryButton from "./NewSecondaryButton";
import MediaUploadModal from "./MediaUploadModal";

export default function WarningPage() {
    return (
        <>
            <div className="p-4 h-full w-full bg-secondary rounded-md">
                <div className="pt-16">
                    <div className="flex text-9xl text-gray-300 justify-center">
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className="text-center text-xl font-medium pt-8">
                        <p>
                            No video or audio file is selected,
                            <br />
                            please select the file.
                        </p>
                    </div>
                    <div className="flex justify-center items-center h-10 relative text-center py-10 px-16">
                        <hr className="bg-gray-400 w-full h-0.5" />
                        <span className="absolute w-10 bg-white">OR</span>
                    </div>
                    <div className="flex space-x-2 px-20">
                        <NewSecondaryButton>
                            <span className="">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </span>
                            <span className="text-sm font-medium">
                                Upload Media
                            </span>
                        </NewSecondaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}
