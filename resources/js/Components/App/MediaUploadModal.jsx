import React, { useRef, useState } from "react";
import Modal from "../Modal";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";

export default function MediaUploadModal({
    setUploadedFiles,
    show = false,
    onClose = () => {},
}) {
    const [chosenFile, setchosenFile] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");

    const actualBtnRef = useRef(null);

    const CloseModal = () => {
        onClose();
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", chosenFile);

        try {
            const response = await axios.post(route("upload.file"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setUploadedFiles(response.data);

            onClose();
            setchosenFile(null);
            setFileName("No file chosen");
        } catch (error) {
            console.error("File upload failed");
        }
    };
    return (
        <Modal show={show} onClose={CloseModal} className="">
            <div className="p-4">
                <div className="flex justify-between items-center text-xl sm:text-2xl font-medium">
                    <h1>Upload file</h1>
                    <button
                        className="text-4xl text-primary hover:text-primary-hover outline-none transition ease-in-out duration-200"
                        onClick={CloseModal}
                    >
                        <i className="fa-solid fa-square-xmark"></i>
                    </button>
                </div>
                <div className="pt-6 pb-4">
                    <div className="flex relative flex-col justify-center items-center h-32 bg-primary/10 rounded-lg">
                        {chosenFile && (
                            <div
                                className={
                                    "text-5xl " +
                                    (chosenFile.type == "audio/mpeg"
                                        ? "text-teal-400"
                                        : "text-violet-400")
                                }
                            >
                                {chosenFile.type == "audio/mpeg" ? (
                                    <i className="fa-solid fa-file-audio"></i>
                                ) : (
                                    <i className="fa-solid fa-file-video"></i>
                                )}
                            </div>
                        )}
                        <span className="text-md py-2">{fileName}</span>
                        {chosenFile && (
                            <button
                                className="absolute top-1 right-2 text-xl text-primary hover:text-primary-hover outline-none transition ease-in-out duration-200"
                                onClick={(e) => {
                                    setchosenFile(null);
                                    setFileName("No file chosen");
                                }}
                            >
                                <i className="fa-solid fa-square-xmark"></i>
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        {chosenFile ? (
                            ""
                        ) : (
                            <label
                                className="py-2 px-6 mt-6 w-fit rounded-lg cursor-pointer bg-primary hover:bg-primary-hover text-secondary transition ease-in-out duration-200"
                                htmlFor="Media-btn"
                            >
                                Upload file
                            </label>
                        )}
                        <form className="w-full" onSubmit={handleUpload}>
                            <input
                                hidden
                                required
                                accept="audio/*,video/*"
                                type="file"
                                id="Media-btn"
                                ref={actualBtnRef}
                                onChange={() => {
                                    setFileName(
                                        actualBtnRef.current.files[0].name
                                    );
                                    setchosenFile(
                                        actualBtnRef.current.files[0]
                                    );
                                }}
                            />
                            <PrimaryButton
                                className="w-full mt-6"
                                type="submit"
                            >
                                Transcribe now
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
