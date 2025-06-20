import { cn } from "@/lib/utils";
import React from "react";

const Progression = ({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: number;
}) => {
  return (
    <div className="w-full flex items-center">
      <div className="rounded-full border-blue-500 border-1 bg-white flex justify-center items-center w-8 h-8">
        <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
      </div>

      {Array.from({ length: steps - 1 }, (_, i) => (
        <React.Fragment key={i}>
          <div
            className={cn(
              "h-[2px] bg-neutral-500 grow-1",
              currentStep >= i + 1 && "bg-blue-500"
            )}
          ></div>
          <div
            className={cn(
              "rounded-full border-neutral-500 border-1 bg-white flex justify-center items-center w-8 h-8",
              currentStep >= i + 1 && "border-blue-500"
            )}
          >
            <div
              className={cn(
                "bg-neutral-500 w-4 h-4 rounded-full",
                currentStep >= i + 1 && "bg-blue-500"
              )}
            ></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Progression;
