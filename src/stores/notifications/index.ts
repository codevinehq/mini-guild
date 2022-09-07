import { nanoid } from "nanoid";
import create from "zustand";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error";
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: Notification["id"]) => void;
};

const useNotificationsStore = create<NotificationsStore>()((set) => ({
  notifications: [] as Notification[],
  addNotification: (notification) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: nanoid() },
      ],
    }));
  },
  removeNotification: (id: Notification["id"]) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

export default useNotificationsStore;
