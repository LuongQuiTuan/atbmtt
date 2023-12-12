import axios from "./axios";

const loginApi = (username, password) => {
  return axios.post(
    "/auth/login-jwt",
    { username, password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
};

const logoutApi = () => {
  return axios.post(
    "/auth/logout-jwt",
    {},
    {
      withCredentials: true,
    }
  );
};

const registerApi = (username, password, email) => {
  return axios.post(
    "/auth/register-jwt",
    {
      username,
      password,
      email,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
const refreshApi = () => {
  return axios.post("/auth/refresh-jwt", {
    withCredentials: true,
  });
};
const createFolderApi = (title, password, bearerToken) => {
  return axios.post(
    "/noteFolder/",
    {
      title,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
};
const getAllFoldersApi = (bearerToken, folderPassword) => {
  return axios.get("/noteFolder/", {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${bearerToken}`,
    },
    params: {
      password: folderPassword,
    },
  });
};

const deleteFolderApi = (folderId, bearerToken) => {
  return axios.delete(`/noteFolder/${folderId}`, {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

const updateFolderApi = (folderId, title, bearerToken) => {
  return axios.put(
    `/noteFolder/${folderId}`,
    {
      title,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
};
const getNotesFromFolderAPI = (folderId, bearerToken) => {
  return axios.get(`/note/getNoteInFolder/${folderId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

const createNoteAPI = (folderId, bearerToken, title, content) => {
  return axios.post(
    `/note/`,

    {
      folder: folderId,

      title,

      content,
    },

    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
};

const noteDisplayApi = (noteId, bearerToken) => {
  return axios.get(`/note/${noteId}`, {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

const noteDeleteApi = (noteId, bearerToken) => {
  return axios.delete(`/note/${noteId}`, {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

const noteUpdateApi = (noteId, bearerToken, title, content) => {
  return axios.put(
    `/note/${noteId}`,
    {
      title,
      content,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
};

export {
  loginApi,
  logoutApi,
  registerApi,
  refreshApi,
  createFolderApi,
  getAllFoldersApi,
  deleteFolderApi,
  updateFolderApi,
  getNotesFromFolderAPI,
  createNoteAPI,
  noteDisplayApi,
  noteDeleteApi,
  noteUpdateApi,
};
