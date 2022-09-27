import { HeartIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  const searchText = useDebounce(searchParam, 500);
  const notes = useNotes({
    search: searchText,
  });
  const addNote = useAddNote();
  const favoriteNotes = useFavouriteNotes();
  const addFavoriteNote = useAddFavouriteNote();
  const removeFavoriteNote = useRemoveFavouriteNote();

  return (
    <div className="p-8 space-y-4 max-w-screen-sm mx-auto">
      <Navigation />

      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-slate-500 sm:text-sm">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          defaultValue={searchParam}
          onChange={(e) => {
            setSearchParams({ search: e.target.value });
          }}
          className="block w-full rounded-md border-slate-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-slate-500 sm:text-sm" id="price-currency">
            {notes.isFetching && <Loader />}
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-bold underline">My Notebook</h1>

      {notes.isLoading ? (
        <p className="my-6">Loading notes...</p>
      ) : (
        <p>Found {notes.data?.length ?? "_"} notes.</p>
      )}

      <div className="space-y-4">
        {notes.data?.map((note) => {
          const isFaved = favoriteNotes.data?.find((n) => n.id === note.id);

          return (
            <div
              key={note.id}
              className="overflow-hidden rounded-lg bg-white  border-slate-300 border"
            >
              <div className="px-4 py-3 sm:p-4">
                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-bold">{note.title}</h2>
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
                <p>{note.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <hr />

      <form
        className="flex flex-col gap-2 "
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const formData = new FormData(target);
          const title = formData.get("title") as string;
          const content = formData.get("content") as string;

          await addNote.mutateAsync({ title, content });
          target.reset();
        }}
      >
        <h2 className="text-lg font-medium leading-6 text-slate-900 mb-2">
          Create new note
        </h2>
        <input
          type="text"
          className="form-input block w-full rounded-md border-slate-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          placeholder="Title"
          name="title"
        />
        <textarea
          className="form-textarea block w-full rounded-md border-slate-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          placeholder="Content"
          name="content"
        />
        <button
          type="submit"
          disabled={addNote.isLoading}
          className="flex text-center items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 justify-center"
        >
          Add note
        </button>
      </form>
    </div>
  );
}

export default App;
