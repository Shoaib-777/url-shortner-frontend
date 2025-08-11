import React, { useEffect, useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import { UseAuthStore } from "../store/UseAuthStore";
import { useUrlShortnerStore } from "../store/UseUrlShortnerStore";
import Loading from "./Loading";
import { Datefromatter } from "../lib/DateFormatter";
import { Link } from "react-router-dom";
import { RedirectUrl } from "../axios/axiosInstance";


const ShortLinksTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const {userId} = UseAuthStore()
  const {IsLoadingGroup,getUserData,UserData} = useUrlShortnerStore()

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth <= 640); // sm = 640px in Tailwind
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);


  useEffect(()=>{
    getData()
  },[userId])


  const getData = async()=>{
    await getUserData(userId)
  }

  

  // const data = [
  //   {
  //     id: 1,
  //     short_code: "https://youtube.com/123456",
  //     visits: 400,
  //     original_url: "https://abcd.com/sfljfjafsfa",
  //     created: "12-16-2023 12:40 PM",
  //   },
  //   {
  //     id: 2,
  //     short_code: "https://google.com/abcdef",
  //     visits: 250,
  //     original_url: "https://example.com/original-link-here",
  //     created: "01-05-2024 09:20 AM",
  //   },
  // ];

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id, text) => {
    const url = `${RedirectUrl}/${text}`
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
    alert("Copy To Clipboard")
  };

  if(IsLoadingGroup) return <Loading/>

  return (
    <div className="w-full px-4 py-5">
      <div>
        <table className="w-full border-collapse shadow-sm shadow-gray-600">
          <thead className="bg-[#353C4A]">
            <tr>
              <th className="text-white font-bold text-lg px-2 py-4 rounded-tl-2xl">
                Shorten Links
              </th>
              <th className="hidden sm:block text-white font-bold text-lg px-2 py-4">
                Created At
              </th>
              <th className="text-white font-bold text-lg px-2 py-4 rounded-tr-2xl min-w-[80px] text-center">
                Clicks
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#0E131E]">
            {UserData.length>0?(
              UserData.map((link) => (
              <React.Fragment key={link._id}>
                {/* main row */}
                <tr className="border-b border-[#182135]">
                  <td className="px-2 py-1">
                    <div className="flex items-center w-full">
                      <div className="w-full">
                        <Link to={`${RedirectUrl}/${link.short_code}`}><span className="text-[#C9CED6] sm:hidden hover:underline underline-offset-4">{link.short_code.slice(0,22)}</span></Link>
                        <Link to={`${RedirectUrl}/${link.short_code}`}><span className="text-[#C9CED6] hidden sm:block hover:underline underline-offset-4">{link.short_code}</span></Link>
                      </div>
                      <div className="flex justify-between items-center gap-x-[2px] sm:gap-x-1">
                        <button
                          aria-label="Copy link"
                          onClick={() => handleCopy(link._id, link.short_code)}
                          className="flex justify-center items-center bg-[#182135] rounded-full p-2 ml-2"
                        >
                          {copiedId === link._id ? (
                            <LuCopyCheck className="size-5 text-green-500" />
                          ) : (
                            <LuCopy className="size-5 text-[#c9ced6]" />
                          )}
                        </button>
                        <Link to={`${RedirectUrl}/${link.short_code}`} target="_blank"><button className="flex justify-center items-center bg-[#182135] rounded-full p-2 ml-2">
                          <TbExternalLink className="size-5 text-[#c9ced6]"/>
                        </button></Link>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:block px-2 py-1 ">
                    <span className="text-nowrap text-sky-600 font-semibold flex justify-center items-center text-lg sm:mt-1">{Datefromatter(link.createdAt)}</span>
                  </td>
                  <td className="px-2 py-1 min-w-[80px]">
                    <div className="flex items-center justify-center">
                      <span className="text-sky-600 font-bold text-sm sm:text-lg">
                        {link.visits}
                      </span>
                      <button
                        aria-label="Show details"
                        onClick={() => toggleExpand(link._id)}
                        className="bg-[#182135] rounded-full p-2 flex justify-center items-center ml-2"
                      >
                        {expandedRows[link._id] ? (
                          <MdOutlineKeyboardArrowUp className="size-4 text-[#c9ced6]" />
                        ) : (
                          <MdOutlineKeyboardArrowDown className="size-4 text-[#c9ced6]" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* expanded section */}
                {expandedRows[link._id] && (
                  <tr>
                    <td colSpan={isSmallScreen? 2:3} className="bg-[#111827] ">
                      <table className="w-full">
                        <thead className="bg-[#353C4A]">
                          <tr className="text-white font-bold text-sm">
                            <td className="px-2 py-1">Original Link</td>
                            <td className="sm:hidden px-2 py-1 text-center">Created</td>
                          </tr>
                        </thead>
                        <tbody className="text-[#c9ced6]">
                          <tr>
                            <td className="px-2 py-1 break-all"><Link to={`${link.original_url}`} target="_blank"><span>{link.original_url}</span></Link></td>
                            <td className="sm:hidden px-2 py-1 text-center">{Datefromatter(link.createdAt)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
            ):(
              <tr>
                <td colSpan={isSmallScreen? 2:3} className=" text-white text-center py-2">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShortLinksTable;
