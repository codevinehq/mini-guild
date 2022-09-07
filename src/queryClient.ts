import { QueryClient } from "@tanstack/react-query";
import useNotificationsStore from "./stores/notifications";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
      onError: () => {
        useNotificationsStore.getState().addNotification({
          message: "Request failed",
          type: "error",
        });
      },
    },
    mutations: {
      onError: () => {
        useNotificationsStore.getState().addNotification({
          message: "Request failed",
          type: "error",
        });
      },
      onSuccess: () => {
        useNotificationsStore.getState().addNotification({
          message: "Request successful",
          type: "success",
        });
      },
    },
  },
});
