import { Link } from "@inertiajs/react";
import React from "react";

export default function ListItem({ file, active }) {
    return (
        <Link
            className={
                "flex items-center text-nowrap hover:bg-primary/10 rounded-md py-2 px-3 space-x-4 " +
                (active ? "bg-primary/15" : "")
            }
            href={route("media.select", file.id)}
        >
            <div
                className={
                    "text-3xl " +
                    (file.file.type == "audio"
                        ? "text-teal-400"
                        : "text-violet-400")
                }
            >
                {file.file.type == "audio" ? (
                    <i className="fa-solid fa-file-audio"></i>
                ) : (
                    <i className="fa-solid fa-file-video"></i>
                )}
            </div>
            <div className="text-gray-600 text-sm text-ellipsis truncate">
                {file.name.substring(10)}
            </div>
        </Link>
    );
}
