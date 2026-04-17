import React from 'react';

interface FieldProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: {
    message: string;
  };
}

const Field: React.FC<FieldProps> = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildId(children);
  
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-lg font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`${error ? 'border-red-500 border-2 rounded-lg' : ''}  `}>
        {children}
      </div>
      {error && (
        <div role="alert" className="text-red-500 text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children: React.ReactNode): string | undefined => {
  const child = React.Children.only(children as React.ReactElement);

  if (child && typeof child === 'object' && 'props' in child && 'id' in child.props) {
    return child.props.id;
  }
  return undefined;
};

export default Field;