import React, { useState, useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import clsx from "clsx";

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
    inputRef.current?.focus();
    setIsActive(true);
    setActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
    setActive(false);
  };

  return (
    <div
      className={clsx(
        "relative flex items-center self-center justify-self-start",
        fullWidth && "w-full",
      )}
    >
      <div className={clsx("inline-flex relative", fullWidth && "w-full")}>
        <SearchIcon
          onClick={handleFocus}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-secondary-light  hover:text-brand-secondary-lightest"
        />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholderText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-10 pr-3 py-2 border border-brand-secondary  hover:border-brand-secondary-light rounded-full bg-transparent  bg-grey-lightest w-full focus:outline-none"
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400"
            aria-label="Clear"
          >
            <XIcon className="w-5 h-5 text-brand-secondary-light hover:text-brand-secondary-lightest" />
          </button>
        )}
      </div>
      {isActive && (
        <button
          onClick={() => setIsActive(false)}
          className={
            "ml-2 text-white  bg-brand-secondary hover:bg-brand-secondary-light px-4 py-2 rounded focus:outline-none"
          }
        >
          Cancel
        </button>
      )}
    </div>
  );
};
