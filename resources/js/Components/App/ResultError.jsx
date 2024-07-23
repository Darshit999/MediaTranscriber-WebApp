import React, { useState } from "react";
import NewPrimaryButton from "../NewPrimaryButton";
import NewSecondaryButton from "./NewSecondaryButton";

export default function ResultError() {

    return (
        <>
            <div className="p-6 bg-secondary h-full">
                <h1 className="text-xl font-medium py-2">File/Media Title</h1>

                <div className="pt-12">
                    <div className="flex justify-center">
                        <img className="h-44" src="/Images/no-audio.png" />
                    </div>
                    <p className="text-center text-xl font-semibold py-4">
                        No text is transcribed, please select video or audio
                        with clear vocals.
                    </p>
                    <div className="flex space-x-2 px-20 pt-4">
                        <NewPrimaryButton>
                            <span className="">
                                <i className="fa-solid fa-rotate-right"></i>
                            </span>
                            <span className="text-sm font-medium">
                                Try example
                            </span>
                        </NewPrimaryButton>
                        <NewSecondaryButton>
                            <span className="">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </span>
                            <span className="text-sm font-medium">
                                Upload another
                            </span>
                        </NewSecondaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}
