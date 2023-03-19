import React from "react";

interface ResponsiveHorizontalProps {
  children: React.ReactNode;
}

export default function ResponsiveHorizontal({
  children,
}: ResponsiveHorizontalProps) {
  return (
    <div className="w-full h-full text-xs sm:w-9/12 sm:text-sm md:w-6/12 md:text-md lg:w-5/12 lg:text-lg p-10 flex flex-col items-center gap-5">
      {children}
    </div>
  );
}
