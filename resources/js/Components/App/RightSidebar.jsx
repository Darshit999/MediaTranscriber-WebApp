import React from "react";
import MediaPlayer from "../MediaPlayer";

export default function RightSidebar({ selectedMedia }) {
    return (
        <div className="bg-secondary sm:h-full min-w-64 lg:min-w-96 px-4 lg:px-6 py-4 sm:py-8 rounded-md">
            <MediaPlayer file={selectedMedia} />
        </div>
    );
}
