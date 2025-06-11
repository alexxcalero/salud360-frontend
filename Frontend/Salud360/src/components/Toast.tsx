"use client";

import { Check, X } from "lucide-react";
import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  id?: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */

export const successToast = (toast: Omit<ToastProps, "id">) => {
  return sonnerToast.custom(
    (id) => (
      <SuccessToast
        id={id}
        title={toast.title}
        description={toast.description ?? ""}
        button={toast.button}
      />
    ),
    {
      position: "top-center",
      duration: 3000,
    }
  );
};
export const errorToast = (toast: Omit<ToastProps, "id">) => {
  return sonnerToast.custom(
    (id) => (
      <ErrorToast
        id={id}
        title={toast.title}
        description={toast.description ?? ""}
        button={toast.button}
      />
    ),
    {
      position: "top-center",
      duration: 3000,
    }
  );
};

/** A fully custom toast that still maintains the animations and interactions. */
function SuccessToast(props: ToastProps) {
  const { id, title, description, button } = props;

  return (
    <div className="flex rounded-lg bg-green-200 shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <div className="p-1 rounded-full bg-green-700 self-start">
          <Check size={12} strokeWidth={4} color="white" />
        </div>
        <div className="w-full">
          <p className="text-sm text-green-900 font-semibold text-left w-full line-clamp-1">
            {title}
          </p>
          <p className="mt-1 text-sm text-green-700 text-left line-clamp-4 w-full">
            {description}
          </p>
        </div>
      </div>
      {button && (
        <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-green-600 hover:text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden">
          <button
            className="rounded bg-green-600 px-3 py-1 text-sm font-semibold text-green-50 hover:bg-green-500 transition-colors duration-150 ease-out"
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
}
function ErrorToast(props: ToastProps) {
  const { id, title, description, button } = props;

  return (
    <div className="flex rounded-lg bg-red-200 shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <div className="p-1 rounded-full bg-red-700 self-start">
          <X size={12} strokeWidth={4} color="white" />
        </div>
        <div className="w-full">
          <p className="text-sm text-red-900 font-semibold text-left w-full line-clamp-1">
            {title}
          </p>
          <p className="mt-1 text-sm text-red-700 text-left w-full line-clamp-4">
            {description}
          </p>
        </div>
      </div>
      {button && (
        <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-red-600 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-hidden">
          <button
            className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-red-50 hover:bg-red-500 transition-colors duration-150 ease-out"
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
}
