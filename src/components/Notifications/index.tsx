import useNotificationsStore from "../../stores/notifications";
import cn from "classnames";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";

type NotificationStoreState = ReturnType<typeof useNotificationsStore.getState>;
type NotificationProps = NotificationStoreState["notifications"][number] & {
  onRemove: NotificationStoreState["removeNotification"];
};

const Notification = ({ id, message, type, onRemove }: NotificationProps) => {
  const Icon = type === "success" ? CheckCircleIcon : XCircleIcon;

  useEffect(() => {
    const timeout = setTimeout(() => onRemove(id), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        "rounded-md p-4 w-fit ml-auto mx-4 mb-2 last-of-type:mb-4 border",
        {
          "bg-green-50 border-green-400": type === "success",
          "bg-red-50 border-red-400": type === "error",
        }
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={cn("h-5 w-5 ", {
              "text-green-400": type === "success",
              "text-red-400": type === "error",
            })}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={cn("text-sm font-medium ", {
              "text-green-900": type === "success",
              "text-red-900": type === "error",
            })}
          >
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => onRemove(id)}
              className={cn(
                "inline-flex rounded-md  p-1.5  focus:outline-none focus:ring-2 focus:ring-offset-2 ",
                {
                  "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50":
                    type === "success",
                  "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50":
                    type === "error",
                }
              )}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications, removeNotification } = useNotificationsStore();

  return (
    <div className="fixed bottom-0 right-0  max-h-screen h-full overflow-y-auto flex justify-end flex-col">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default Notifications;
