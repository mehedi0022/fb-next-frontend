import React from "react";

interface FieldProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: {
    message?: string;
  };
  required?: boolean;
  hint?: string;
  icon?: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, children, required, hint, icon }) => {

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium">
        {label}
        {required && <span className="text-rose-400">*</span>}
        {hint && (
          <span className="ml-1 text-[11px] font-normal ">{hint}</span>
        )}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
};
export default Field;