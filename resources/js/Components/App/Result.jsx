import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import jsPDF from "jspdf";

export default function Result({ selectedMedia }) {
    const [editable, seteditable] = useState(false);
    const [documentTitle, setdocumentTitle] = useState("");
    const [documentText, setdocumentText] = useState("");

    const toggleTitleEdit = () => {
        seteditable(!editable);
    };

    useEffect(() => {
        setdocumentTitle(selectedMedia.file.transcription_title);
        setdocumentText(selectedMedia.file.transcription_text);
    }, []);

    const updateDocumentTitle = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                route("update.title", selectedMedia.file.id),
                { title: documentTitle, text: documentText }
            );
        } catch (error) {
            console.error("File upload failed");
        }

        seteditable(!editable);
    };

    const downloadTextFile = () => {
        const fileContent = `${documentTitle}\n\n${documentText}:`;
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `transcriptionFile.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadPdfFile = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text(documentTitle, 10, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const textLines = doc.splitTextToSize(documentText, 180);
        doc.text(textLines, 10, 40);

        doc.save("myDocument.pdf");
    };

    return (
        <div className="h-full">
            <div className="sticky top-0 px-2 sm:px-4 py-2 rounded-md bg-secondary">
                <div className="flex justify-between space-x- items-center">
                    <div className="w-full">
                        <input
                            className="text-lg text-ellipsis truncate w-full font-medium border-0 outline-none focus:ring-0"
                            id="documentTitle"
                            type="text"
                            value={documentTitle}
                            onChange={(e) => setdocumentTitle(e.target.value)}
                            disabled={!editable}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        {editable ? (
                            <button
                                className="py-1 px-2 cursor-pointer rounded-lg bg-primary hover:bg-primary-hover text-secondary transition ease-in-out duration-200"
                                onClick={updateDocumentTitle}
                            >
                                <i className="fa-solid fa-floppy-disk"></i>
                            </button>
                        ) : (
                            <button
                                className="py-1 px-2 rounded-lg bg-primary hover:bg-primary-hover text-secondary transition ease-in-out duration-200"
                                onClick={toggleTitleEdit}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                        )}

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-2 py-1.5 px-4 rounded-md bg-primary hover:bg-primary-hover text-secondary transition ease-in-out duration-200">
                                    <i className="fa-solid fa-arrow-down text-sm"></i>
                                    <span>Download</span>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    className="gap-2 font-medium"
                                    onClick={downloadTextFile}
                                >
                                    <span className="text-sky-600">
                                        <i className="fa-solid fa-file-lines"></i>
                                    </span>
                                    <span>Text File</span>
                                </Dropdown.Link>
                                <Dropdown.Link
                                    className="gap-2 font-medium"
                                    onClick={downloadPdfFile}
                                >
                                    <span className="text-red-600">
                                        <i className="fa-solid fa-file-pdf"></i>
                                    </span>
                                    <span>PDF File</span>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className="bg-secondary h-full mt-2 rounded-md px-2 sm:px-4 pt-4">
                {/* <p className="py-2">{documentText}</p> */}
                <textarea
                    className="w-full rounded-md h-[80%] scrollbar-hide sm:pb-8 pb-16 border-0 outline-none focus:ring-0 resize-none"
                    value={documentText}
                    onChange={(e) => setdocumentText(e.target.value)}
                    disabled={!editable}
                ></textarea>
            </div>
        </div>
    );
}
