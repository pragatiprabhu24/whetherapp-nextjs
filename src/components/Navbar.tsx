import React from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-gray-800">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-white text-3xl font-semibold">Whether</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>

        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-white hover:opacity-80 cursor-pointer" />
          <IoLocationOutline className="text-2xl text-gray-200" />
          <p className="text-gray-300 text-sm">India</p>

          <div>
            <SearchBox value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </section>
      </div>
    </nav>
  );
}
