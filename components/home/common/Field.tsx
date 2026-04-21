import React from "react";

interface FieldProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: {
    message?: string;
  };
}

const Field: React.FC<FieldProps> = ({ label, children, htmlFor, error }) => {
  const id = htmlFor;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-lg font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`${error && error.message ? "border-red-500 border-2 rounded-lg" : ""}  `}
      >
        {children}
      </div>
      {error && error.message && (
        <div role="alert" className="text-red-500 text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
