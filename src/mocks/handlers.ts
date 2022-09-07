import { rest } from "msw";

// Mock Data
export const notes = [
  {
    id: "1",
    title: "Note 1",
    content: "This is note 1",
  },
  {
    id: "2",
    title: "Note 2",
    content: "This is note 2",
  },
];

const favourites = ["1"];

export const handlers = [
  rest.get("/api/notes", (req, res, ctx) => {
    if (req.url.searchParams.get("isFavourite") === "true") {
      return res(
        ctx.status(200),
        ctx.json(notes.filter((note) => favourites.includes(note.id)))
      );
    }

    return res(ctx.status(200), ctx.json(notes));
  }),
  rest.get("/api/notes/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(notes.find((note) => note.id === req.params.id))
    );
  }),
  rest.post("/api/notes", async (req, res, ctx) => {
    const note = await req.json();

    console.log(note);

    notes.push(note);

    return res(ctx.status(200), ctx.json(note));
  }),
  rest.put("/api/notes/:id", async (req, res, ctx) => {
    const note = await req.json();

    const index = notes.findIndex((note) => note.id === req.params.id);

    notes[index] = note;

    return res(ctx.status(200), ctx.json(note));
  }),
  rest.delete("/api/notes/:id", (req, res, ctx) => {
    const index = notes.findIndex((note) => note.id === req.params.id);

    notes.splice(index, 1);

    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post("/api/notes/:id/favourite", (req, res, ctx) => {
    favourites.push(req.params.id as string);

    return res(ctx.status(200), ctx.json({}));
  }),
  rest.delete("/api/notes/:id/favourite", (req, res, ctx) => {
    const index = favourites.findIndex((id) => id === req.params.id);

    favourites.splice(index, 1);

    return res(ctx.status(200), ctx.json({}));
  }),
];
