import React, { useEffect, useState } from "react";
import ListItem from "../ListItem";
import MediaUploadModal from "./MediaUploadModal";
import Modal from "../Modal";
import PrimaryButton from "../PrimaryButton";

export default function LeftSidebar({ files }) {
    const [sidebar, setsidebar] = useState(true);
    const [sidebarModal, setsidebarModal] = useState(false);
    const [MediaModal, setMediaModal] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        setUploadedFiles(files);
    }, []);

    const toggleSidebar = () => {
        setsidebar(!sidebar);
    };

    return (
        <>
            <div
                className={
                    "sm:block hidden p-4 bg-secondary transition-all duration-300 lg:relative z-50 h-full " +
                    (sidebar ? "min-w-72 absolute" : "w-20")
                }
            >
                <div className="flex">
                    <button
                        className={
                            "flex justify-center items-center space-x-2 py-2 rounded-lg transition ease-in-out duration-300 " +
                            (sidebar
                                ? "w-full hover:bg-primary hover:text-secondary text-primary border-2 border-primary/60"
                                : "w-12 bg-primary text-secondary text-2xl")
                        }
                        onClick={(ev) => setMediaModal(true)}
                    >
                        <span className={sidebar ? "text-lg flex" : ""}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        {sidebar && (
                            <span className="text-md uppercase font-medium ">
                                Upload file
                            </span>
                        )}
                    </button>
                </div>

                <div className="pt-8">
                    <div
                        className={
                            "flex items-center " +
                            (sidebar ? "justify-between" : "justify-center")
                        }
                    >
                        {sidebar && (
                            <span className="font-medium ">
                                Transcribe list
                            </span>
                        )}
                        <button
                            className="text-lg outline-none"
                            onClick={toggleSidebar}
                        >
                            <i className="fa-solid fa-bars-staggered"></i>
                        </button>
                    </div>
                </div>

                <div className={"pt-6 space-y-2 " + (sidebar ? "" : "w-12")}>
                    {uploadedFiles.map((file) => (
                        <ListItem
                            active={
                                file.id == window.location.pathname.substring(7)
                                    ? true
                                    : false
                            }
                            file={file}
                            key={file.id}
                        />
                    ))}

                    {uploadedFiles.length == 0 && sidebar && (
                        <div className="flex justify-center items-center h-40 rounded-lg bg-primary/10">
                            <span>Upload files to start</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                className="absolute bottom-[70px] z-50 right-2 flex sm:hidden justify-center items-center size-10 rounded-lg text-xl bg-primary hover:bg-primary-hover text-secondary"
                onClick={(ev) => setsidebarModal(true)}
            >
                <i className="fa-solid fa-bars-staggered"></i>
            </button>

            <Modal
                show={sidebarModal}
                onClose={(ev) => setsidebarModal(false)}
                className="sm:hidden"
            >
                <div className="pt-6 pb-4 px-4">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-xl">
                            Transcribe list
                        </span>
                        <button
                            className="text-3xl text-primary outline-none"
                            onClick={(ev) => setsidebarModal(false)}
                        >
                            <i className="fa-solid fa-square-xmark"></i>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2 pt-4">
                        {uploadedFiles.map((file) => (
                            <button
                                key={file.id}
                                onClick={(ev) => setsidebarModal(false)}
                            >
                                <ListItem
                                    file={file}
                                    active={
                                        file.id ==
                                        window.location.pathname.substring(7)
                                            ? true
                                            : false
                                    }
                                />
                            </button>
                        ))}
                    </div>
                    <div className="pt-6">
                        <PrimaryButton
                            className="w-full"
                            onClick={(ev) => {
                                setsidebarModal(false);
                                setMediaModal(true);
                            }}
                        >
                            Upload audio or video file
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            <MediaUploadModal
                setUploadedFiles={setUploadedFiles}
                show={MediaModal}
                onClose={(ev) => setMediaModal(false)}
            />
        </>
    );
}
