import React from "react";

interface StatusFilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange, options, className }) => (
  <select className={className} value={value} onChange={onChange}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export default StatusFilter;
