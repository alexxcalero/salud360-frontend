import React from "react";

function BlueBullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-blue-500 font-bold">›</span>
      <span>{children}</span>
    </div>
  );
}

export default BlueBullet;
