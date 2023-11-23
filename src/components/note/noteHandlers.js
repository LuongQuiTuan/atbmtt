import {
  createNoteAPI,
  getNotesFromFolderAPI,
  noteDeleteApi,
  noteDisplayApi,
  noteUpdateApi,
} from "../../api/UserServices";

const getNotesFromFolder = async (bearerToken, folderId, setNotes) => {
  try {
    const response = await getNotesFromFolderAPI(bearerToken, folderId);
    if (response?.status === 200) {
      setNotes(response.data);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const createNote = async (bearerToken, folderId, setNotes, notes) => {
  const title = "New Note";

  const content = "The content of the note.";

  try {
    const response = await createNoteAPI(folderId, bearerToken, title, content);

    if (response?.status === 200) {
      const newNote = response.data;
      setNotes([...notes, newNote]);
    }
  } catch (error) {
    console.error("Error creating note", error);
  }
};
const getNoteDisplay = async (noteId, bearerToken) => {
  try {
    const response = await noteDisplayApi(noteId, bearerToken);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error displaying note");
    return null;
  }
};

const deleteNote = async (noteId, bearerToken, notes, setNotes) => {
  try {
    const response = await noteDeleteApi(noteId, bearerToken);
    if (response && response?.status === 200) {
      setNotes(notes.filter((note) => note._id !== noteId));
    }
  } catch (error) {
    console.log("Error deleting the note:", error);
  }
};

const updateNote = async (
  noteId,
  bearerToken,
  newTitle,
  newContent,
  notes,
  setNotes
) => {
  try {
    const response = await noteUpdateApi(
      noteId,
      bearerToken,
      newTitle,
      newContent
    );
    if (response && response?.status === 200) {
      setNotes(
        notes.map((note) => {
          return note._id === noteId
            ? { ...note, title: newTitle, content: newContent }
            : note;
        })
      );
    }
  } catch (error) {
    console.log("Error updating the note: ", error);
  }
};

export {
  getNotesFromFolder,
  createNote,
  getNoteDisplay,
  deleteNote,
  updateNote,
};
