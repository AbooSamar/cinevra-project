import { useState, useRef, useEffect } from "react";

const Dropdown = ({ title, options, func }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    func({ target: { value } });
    setIsOpen(false);
  };

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <div
        className="select flex items-center justify-between cursor-pointer px-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedValue === "0" ? title : selectedValue.toUpperCase()}
        </span>
        <span className="ml-2">▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#27272a] rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-[#6556cd] cursor-pointer truncate"
              onClick={() => handleSelect(option)}
            >
              {option.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
