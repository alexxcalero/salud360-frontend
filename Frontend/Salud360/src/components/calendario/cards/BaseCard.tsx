import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { DateTime } from "luxon";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: "blue" | "pink" | "green";
  active?: boolean;
  estado?: string;
  date?: DateTime;
}

const BaseCard = forwardRef<HTMLDivElement, Props>(
  ({ children, active = true, date, estado, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          styles["card"],
          styles[color],
          estado === "Reservada" && styles["green"],
          date !== undefined && date < DateTime.now() && styles["neutral"],
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
