import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { DateTime } from "luxon";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: "blue" | "pink" | "green" | "red";
  active?: boolean;
  date?: DateTime;
  collapsed?: boolean;
}

const BaseCard = forwardRef<HTMLDivElement, Props>(
  (
    { children, active = true, date, color, collapsed = false, ...props },
    ref
  ) => {
    if (collapsed)
      return (
        <div
          ref={ref}
          {...props}
          className={cn(
            styles["collapsed-card"],
            styles[color],
            date !== undefined && date < DateTime.now() && styles["gray"],
            !active && styles["neutral"],
            props.className
          )}
        ></div>
      );

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          styles["card"],
          styles[color],
          date !== undefined && date < DateTime.now() && styles["gray"],
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
