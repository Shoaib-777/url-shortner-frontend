import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi"; // Feather icons
import { TbExternalLink } from "react-icons/tb";
import { RedirectUrl } from "../axios/axiosInstance";


export default function CopyLink({CurrentLink}) {
    const [copied, setCopied] = useState(false);

    const link = `${RedirectUrl}/${CurrentLink}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            alert("Link Copied Sucessfully !")
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex items-center justify-center font-sans mt-3">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-2 sm:p-3 max-w-xl flex items-center gap-x-1 sm:gap-x-2">
                <div className="flex gap-x-1 w-fit mb-1 ">
                    <div className="">
                        {/* Link Text */}
                        <span className="relative text-gray-300 truncate text-sm sm:text-lg group cursor-pointer">
                            <span className="relative z-10">{link}</span>
                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-300 group-hover:bg-blue-600 z-0"></span>
                        </span>
                    </div>
                    <div className="mt-1">
                        <TbExternalLink className="size-6 text-gray-300 hover:text-white cursor-pointer" />
                    </div>
                </div>
                <div className="">
                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-xl transition-all duration-300 ease-in-out ${copied
                            ? "bg-green-600 hover:bg-green-500"
                            : "bg-yellow-500 hover:bg-yellow-400"
                            }`}
                    >
                        {/* Icon */}
                        {copied ? (
                            <FiCheck className="h-5 w-5 transition-transform duration-300 transform scale-110 text-white" />
                        ) : (
                            <FiCopy className="h-5 w-5 transition-transform duration-300" />
                        )}

                        <span className="text-black font-bold hidden sm:block">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
