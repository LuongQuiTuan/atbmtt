import {
  createNoteAPI,
  getNotesFromFolderAPI,
  noteDeleteApi,
  noteDisplayApi,
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
  const title = "new title";

  const content = "new content";

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

export { getNotesFromFolder, createNote, getNoteDisplay };
