import { useFavouriteNotes, useNotes } from "../../services/notes";

const Navigation = () => {
  const favoriteNotes = useFavouriteNotes();
  const notes = useNotes();

  const noteCount = notes.data?.length ?? "_";
  const favoriteNoteCount = favoriteNotes.data?.length ?? "_";

  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Notes ({noteCount})</a>
        </li>
        <li>
          <a href="#">Favourites ({favoriteNoteCount})</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
