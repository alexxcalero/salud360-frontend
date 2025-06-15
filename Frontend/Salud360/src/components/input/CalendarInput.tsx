"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTime } from "luxon";
import { InputProps } from "./Input";

interface CalendarInputProps
  extends Omit<Omit<Omit<InputProps, "setValue">, "value">, "defaultValue"> {
  defaultValue?: DateTime;
  value?: DateTime;
  setValue?: (_: DateTime) => void;
  format?: string;
}

export function CalendarInput({
  placeholder = "Pick a date",
  format,
  label,
  defaultValue,
  className,
  disabled,
  required,
  value,
  setValue,
}: CalendarInputProps) {
  const [date, setDate] =
    value !== undefined && setValue !== undefined
      ? [value, setValue]
      : React.useState<DateTime>(defaultValue ?? DateTime.now());

  return (
    <div>
      {label && (
        <label className="block text-sm text-left font-medium text-gray-700 mb-2 w-max">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`relative flex border-[#6A6262] border-2 rounded-[5px] py-0 px-2 gap-2 items-center focus-within:border-blue-500 group ${
              disabled && "border-neutral-300 bg-neutral-50"
            } ${className}`}
          >
            <CalendarIcon />
            {date ? (
              date.toFormat(format ?? "D", { locale: "es" })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date?.toJSDate()}
            onSelect={(e) => {
              if (e !== undefined) setDate(DateTime.fromJSDate(e));
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
