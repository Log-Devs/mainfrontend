import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, className }) => (
  <input
    type="text"
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;
