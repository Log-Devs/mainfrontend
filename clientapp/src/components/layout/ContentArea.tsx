import React from "react";

const ContentArea = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 p-4 bg-white dark:bg-[#10131a] overflow-x-hidden">
    {children}
  </main>
);

export default ContentArea;
