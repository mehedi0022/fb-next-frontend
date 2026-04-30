import { ReactNode } from "react";

const Title = ({
  children,
  className,
  subtitle,
}: {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}) => {
  return (
    <div>
      {/* title */}
      <h1 className={`text-3xl font-bold text-center mb-2 ${className || ""}`}>
        {children}
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-xl sm:text-lg text-center font-tiro-bangla mb-5">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
