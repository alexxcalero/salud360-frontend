import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: "blue" | "pink";
  active?: boolean;
}

const BaseCard = forwardRef<HTMLDivElement, Props>(
  ({ children, active = true, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          styles["card"],
          styles[color],
          !active && styles["neutral"],
          props.className
        )}
      >
        <div>{children}</div>
      </div>
    );
  }
);

BaseCard.displayName = "BaseCard";

export default BaseCard;
