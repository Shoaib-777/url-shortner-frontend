import React, { useState } from 'react'
import { FaLink } from "react-icons/fa6";
import { TiArrowRight } from "react-icons/ti";
import { nanoid } from 'nanoid';
import CopyLink from './CopyLink';
import { useUrlShortnerStore } from '../store/UseUrlShortnerStore';
import Loading from './Loading';
import { RedirectUrl } from '../axios/axiosInstance';



const LinkInput = () => {
    const [rangeValue, setRangeValue] = useState(6);
    const [link, setLink] = useState("");

    
    const {createNewShortUrl,CurrentLink,IsLoadingInput} = useUrlShortnerStore()
    const backend = `${RedirectUrl}/${CurrentLink}`

    function generateCustomId(length) {
        return nanoid(length);
    }

    const updateRange = (val) => {
        setRangeValue(Number(val));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate link
        if (!link.trim()) {
            alert("Please enter a link");
            return;
        }
        if (!/^https?:\/\//i.test(link)) {
            alert("Please enter a valid URL starting with http or https");
            return;
        }

        // Generate ID
        const customId = generateCustomId(rangeValue);
        try {
            await createNewShortUrl(link,customId)
            setLink("")
        } catch (err) {
            console.error(err);
            alert("Error creating short link");
        }
    };

    const rangePercent = ((rangeValue - 6) / (12 - 6)) * 100;


    return (
        <div className='container  mt-10 mx-auto flex flex-col justify-center items-center gap-y-6 px-4 sm:px-0 py-4 flex-grow max-h-[500px]'>
            <div>
                <h1 className='text-center font-bold text-4xl text-white text-balance custom-gradient-heading '>Shorten Your Loooong Links :) </h1>
            </div>
            <div className='max-w-xl mx-auto'>
                <h2 className='text-center font-light text-base text-[#C9CED6] text-balance '>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</h2>
            </div>
            <div className='w-full flex flex-col gap-y-3'>
                <form onSubmit={handleSubmit}>
                <div className='flex justify-center items-center rounded-full border border-white w-full max-w-2xl mx-auto px-2 sm:pl-4 sm:pr-2 py-2 gap-x-2 sm:gap-x-4 bg-[#353C4A] ring-1 ring-[#8f9196]'>
                    <div>
                        <FaLink className='size-6 text-[#C9CED6]' />
                    </div>
                        <div className='flex-1'>
                            <input type="text" placeholder='Enter Your Long URL Link Here ...' className='w-full px-2 py-1 outline-none placeholder:text-[#C9CED6] text-[#bfc2c6]' value={link} onChange={(e) => setLink(e.target.value)} />
                        </div>
                        <div>
                            <button className='hidden sm:flex bg-[#144EE3] hover:bg-[#134ad5] shadow-sky-500 shadow-[4px_5px_6px_-2px] text-lg  text-white min-w-[140px] h-[44px] rounded-3xl font-semibold  justify-center items-center'>
                                Shorten Now
                            </button>
                            <button className='flex sm:hidden bg-[#144EE3] hover:bg-[#134ad5] shadow-sky-500 shadow-[1px_1px_7px_-0px] text-lg  text-white  font-semibold  justify-center items-center rounded-full'><TiArrowRight className='size-8 text-white' /></button>
                        </div>
                </div>
                    </form>
                <div className='w-full max-w-2xl mx-auto  rounded-2xl'>
                    <div className="flex flex-col relative items-center  justify-center min-w-full max-w-xl pt-5 pb-3  px-2  bg-gray-700 rounded-full shadow-lg border border-white">
                        <label htmlFor="rangeInput" className="block absolute top-0 text-white text-lg font-medium">
                            Select Range (6–12)
                        </label>
                        <div className='flex justify-between items-center gap-x-3 min-w-full'>
                            {/* Display Value */}
                            <div id="rangeValue" className=" text-sky-500 text-xl font-bold text-center w-10 mb-1 flex justify-center items-center">
                                {rangeValue}
                            </div>
                            <div className="relative flex-1">
                                {/* Track */}
                                <div className="absolute top-1/2 left-0 w-full h-2 bg-[#C9CED6] rounded transform -translate-y-1/2"></div>
                                {/* Filled Track */}
                                <div
                                    id="rangeTrack"
                                    className="absolute top-1/2 left-0 h-2 bg-sky-600 rounded transform -translate-y-1/2 transition-all duration-200"
                                    style={{ width: `${rangePercent}%` }}
                                ></div>
                                {/* Range Input */}
                                <input
                                    id="rangeInput"
                                    type="range"
                                    min="6"
                                    max="12"
                                    value={rangeValue}
                                    step="1"
                                    className="w-full appearance-none bg-transparent relative z-10"
                                    onChange={(e) => updateRange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {IsLoadingInput && <Loading/>}
                    {CurrentLink && (
                        <div>
                            <CopyLink CurrentLink={CurrentLink} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default LinkInput