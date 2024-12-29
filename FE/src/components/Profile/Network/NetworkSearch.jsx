import {Input} from "@nextui-org/react";

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function Search() {
  return (
    <div className="w-[300px] h-[44px]   flex justify-center items-center  rounded-full shadow-xl">
      <Input
        isClearable
       
        className="rounded-full bg-white  text-gray-500"
        placeholder="Type to search..."
        radius="lg"
        startContent={
          <SearchIcon className="text-black/50 mb-0.5  text-slate-400 pointer-events-none flex-shrink-0 shadow-xl" />
        }
      />
    </div>
  );
}
