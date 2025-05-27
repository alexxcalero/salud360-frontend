import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUsuario } from "@/hooks/useUsuario";
import { useState } from "react";

const NotificationIcon = () => {
  const [newNotifications, setNewNotifications] = useState(true);
  const _dataExample = [
    { message: "Notificación 1", date: "2023-10-01", time: "10:00 AM" },
    { message: "Notificación 2", date: "2023-10-02", time: "11:00 AM" },
    { message: "Notificación 3", date: "2023-10-03", time: "12:00 PM" },
    { message: "Notificación 4", date: "2023-10-04", time: "01:00 PM" },
    { message: "Notificación 5", date: "2023-10-05", time: "02:00 PM" },
    { message: "Notificación 6", date: "2023-10-06", time: "03:00 PM" },
    { message: "Notificación 7", date: "2023-10-07", time: "04:00 PM" },
    { message: "Notificación 8", date: "2023-10-08", time: "05:00 PM" },
    { message: "Notificación 9", date: "2023-10-09", time: "06:00 PM" },
    { message: "Notificación 10", date: "2023-10-10", time: "07:00 PM" },
  ];
  return (
    <>
      <Popover>
        <PopoverTrigger onClick={() => setNewNotifications(false)}>
          <div
            data-new={newNotifications}
            className="relative cursor-pointer data-[new=false]:after:opacity-0 after:content-[''] after:absolute after:-top-1 after:-right-1 after:w-3 after:h-3 after:bg-red-500 after:rounded-full"
          >
            <Bell color="white" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="max-h-[400px] overflow-y-auto w-80">
          <div className="pt-4 flex flex-col gap-2">
            <h3>Notificaciones</h3>
            <hr className="border border-black"/>
          </div>
          {_dataExample.map((notification, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-b-2 border-neutral-200 py-2"
            >
              <span>{notification.message}</span>
              <span className="text-xs text-neutral-500">
                {notification.date} - {notification.time}
              </span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationIcon;
