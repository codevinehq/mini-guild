import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import http from "../http";

export interface Note {
  id: string;
  title: string;
  content: string;
}

const useNotes = () => {
  return useQuery<Note[]>(["notes"], () => http.get("/api/notes"));
};

const useNote = (id: Note["id"]) => {
  return useQuery<Note>(["note", id], () => http.get(`/api/notes/${id}`));
};

const useAddNote = () => {
  return useMutation<Note, Error, Omit<Note, "id">>(
    (note) => http.post("/api/notes", note),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        queryClient.setQueryData(["note", data.id], data);
      },
    }
  );
};

const useUpdateNote = () => {
  return useMutation<Note, Error, Note>(
    (note) => http.put(`/api/notes/${note.id}`, note),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        queryClient.setQueryData(["note", data.id], data);
      },
    }
  );
};

const useDeleteNote = () => {
  return useMutation<Note, Error, Note["id"]>(
    (id) => http.delete(`/api/notes/${id}`),
    {
      onSuccess: (id) => {
        queryClient.invalidateQueries(["notes"]);
        queryClient.removeQueries(["note", id]);
      },
    }
  );
};

const useFavouriteNotes = () => {
  return useQuery<Note[]>(["notes", "favourite"], () =>
    http.get("/api/notes?isFavourite=true")
  );
};

const useAddFavouriteNote = () => {
  return useMutation<Note["id"], Error, Note["id"]>(
    (id) => http.post(`/api/notes/${id}/favourite`),
    {
      onSuccess: (id) => {
        queryClient.invalidateQueries(["notes", "favourite"]);
      },
    }
  );
};

const useRemoveFavouriteNote = () => {
  return useMutation<Note["id"], Error, Note["id"]>(
    (id) => http.delete(`/api/notes/${id}/favourite`),
    {
      onSuccess: (id) => {
        queryClient.invalidateQueries(["notes", "favourite"]);
      },
    }
  );
};

export {
  useNotes,
  useNote,
  useAddNote,
  useUpdateNote,
  useDeleteNote,
  useFavouriteNotes,
  useAddFavouriteNote,
  useRemoveFavouriteNote,
};
