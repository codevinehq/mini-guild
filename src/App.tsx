import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import {
  useAddFavouriteNote,
  useAddNote,
  useFavouriteNotes,
  useNotes,
  useRemoveFavouriteNote,
} from "./services/notes";
import Navigation from "./components/Navigation";
import useDebounce from "./hooks/useDebounce";
import Loader from "./components/Loader";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") ?? undefined;
  const searchText = useDebounce<typeof searchParam>(searchParam, 500);
  const notes = useNotes({
    search: searchText,
  });
  const addNote = useAddNote();
  const favoriteNotes = useFavouriteNotes();
  const addFavoriteNote = useAddFavouriteNote();
  const removeFavoriteNote = useRemoveFavouriteNote();

  return (
    <div>
      <Navigation />

      <form className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search"
          defaultValue={searchParam}
          onChange={(e) => {
            setSearchParams({ search: e.target.value });
          }}
        />
        {notes.isFetching && <Loader />}
      </form>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <p>
        You have {notes.data?.length ?? "_"} notes and{" "}
        {favoriteNotes.data?.length ?? "_"} favourites.
      </p>

      {notes.isLoading && <p className="my-6">Loading notes...</p>}

      {notes.data?.map((note) => {
        const isFaved = favoriteNotes.data?.find((n) => n.id === note.id);

        return (
          <div key={note.id}>
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <button
              onClick={() =>
                isFaved
                  ? removeFavoriteNote.mutateAsync(note.id)
                  : addFavoriteNote.mutateAsync(note.id)
              }
              disabled={
                addFavoriteNote.isLoading || removeFavoriteNote.isLoading
              }
            >
              {isFaved ? (
                <HeartIcon className="text-red-600 w-6 h-6" />
              ) : (
                <HeartOutline className="text-red-600 w-6 h-6" />
              )}
            </button>
          </div>
        );
      })}

      <form
        key={notes.dataUpdatedAt}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const title = formData.get("title") as string;
          const content = formData.get("content") as string;

          addNote.mutate({ title, content });
        }}
      >
        <input type="text" required placeholder="Title" name="title" />
        <input type="text" required placeholder="Content" name="content" />
        <button type="submit" disabled={addNote.isLoading}>
          Add note
        </button>
      </form>
    </div>
  );
}

export default App;
