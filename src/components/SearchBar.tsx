import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, XIcon } from "lucide-react";

export interface SearchBarProps {
  fullWidth?: boolean;
  placeholderText?: string;
  value: string;
  setValue: (text: string) => void;
  setActive: (newActiveState: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setValue,
  value,
  fullWidth,
  placeholderText,
  setActive,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsActive(true);
    setActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
    setActive(false);
  };

  return (
    <div className={`relative flex items-center self-center ${fullWidth ? "w-full" : ""}`}>
      <div className=" inline-flex relative ">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholderText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-10 pr-3 py-2 border border-gray-300 rounded text-grey-dark bg-grey-lightest w-full focus:outline-none"
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400"
            aria-label="Clear"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      {isActive && (
        <Button
          onClick={() => setIsActive(false)}
          className="ml-2 text-white bg-blue-500 px-4 py-2 rounded focus:outline-none"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};
