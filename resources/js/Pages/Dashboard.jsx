import LeftSidebar from "@/Components/App/LeftSidebar";
import Result from "@/Components/App/Result";
import ResultError from "@/Components/App/ResultError";
import RightSidebar from "@/Components/App/RightSidebar";
import TranscriptionPage from "@/Components/App/TranscriptionPage";
import WarningPage from "@/Components/App/WarningPage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, files, selectedMedia }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            className="h-screen overflow-hidden"
        >
            <Head title="Dashboard" />

            <div className="flex relative h-full">
                <LeftSidebar files={files} />

                <div className="flex sm:flex-row flex-col w-full m-2 gap-2">
                    <div className="order-2 sm:order-1 w-full h-full">
                        {selectedMedia ? (
                            selectedMedia.file.transcription_text ? (
                                <Result selectedMedia={selectedMedia} />
                            ) : (
                                <TranscriptionPage
                                    selectedMedia={selectedMedia}
                                />
                            )
                        ) : (
                            <WarningPage />
                        )}
                    </div>

                    <div className="order-1 sm:h-full h-fit sm:order-2">
                        <RightSidebar selectedMedia={selectedMedia} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
