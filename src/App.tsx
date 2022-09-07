import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {notes?.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
