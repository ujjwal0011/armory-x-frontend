import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/snippet`;

const snippetSlice = createSlice({
  name: "snippet",
  initialState: {
    loading: false,
    snippets: [],
    trashedSnippets: [],
    currentSnippet: null,
    error: null,
    message: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalSnippets: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    isMovedToTrash: false,
    isRestoredFromTrash: false,
    isTrashEmptied: false,
    favoriteSnippets: [],
    searchResults: [],
    taggedSnippets: [],

    snippetVersions: [],
    isVersionRestored: false,
  },
  reducers: {
    getAllSnippetsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllSnippetsSuccess(state, action) {
      state.loading = false;
      state.snippets = action.payload.snippets;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    getAllSnippetsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getSnippetByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSnippetByIdSuccess(state, action) {
      state.loading = false;
      state.currentSnippet = action.payload.snippet;
      state.error = null;
    },
    getSnippetByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createSnippetRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isCreated = false;
    },
    createSnippetSuccess(state, action) {
      state.loading = false;
      state.snippets.push(action.payload.snippet);
      state.message = action.payload.message;
      state.isCreated = true;
      state.error = null;
    },
    createSnippetFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isCreated = false;
    },
    createSnippetReset(state) {
      state.isCreated = false;
    },

    updateSnippetRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isUpdated = false;
    },
    updateSnippetSuccess(state, action) {
      state.loading = false;
      state.snippets = state.snippets.map((snippet) =>
        snippet._id === action.payload.snippet._id
          ? action.payload.snippet
          : snippet
      );
      state.currentSnippet = action.payload.snippet;
      state.message = action.payload.message;
      state.isUpdated = true;
      state.error = null;
    },
    updateSnippetFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isUpdated = false;
    },
    updateSnippetReset(state) {
      state.isUpdated = false;
    },

    moveToTrashRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isMovedToTrash = false;
    },
    moveToTrashSuccess(state, action) {
      state.loading = false;

      state.snippets = state.snippets.filter(
        (snippet) => snippet._id !== action.payload.id
      );

      if (
        state.currentSnippet &&
        state.currentSnippet._id === action.payload.id
      ) {
        state.currentSnippet = null;
      }
      state.message = action.payload.message;
      state.isMovedToTrash = true;
      state.error = null;
    },
    moveToTrashFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isMovedToTrash = false;
    },
    moveToTrashReset(state) {
      state.isMovedToTrash = false;
    },

    getTrashSnippetsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getTrashSnippetsSuccess(state, action) {
      state.loading = false;
      state.trashedSnippets = action.payload.snippets;
      state.error = null;
    },
    getTrashSnippetsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    restoreFromTrashRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isRestoredFromTrash = false;
    },
    restoreFromTrashSuccess(state, action) {
      state.loading = false;

      state.snippets.push(action.payload.snippet);

      state.trashedSnippets = state.trashedSnippets.filter(
        (snippet) => snippet._id !== action.payload.snippet._id
      );
      state.message = action.payload.message;
      state.isRestoredFromTrash = true;
      state.error = null;
    },
    restoreFromTrashFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isRestoredFromTrash = false;
    },
    restoreFromTrashReset(state) {
      state.isRestoredFromTrash = false;
    },

    emptyTrashRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isTrashEmptied = false;
    },
    emptyTrashSuccess(state, action) {
      state.loading = false;
      state.trashedSnippets = [];
      state.message = action.payload.message;
      state.isTrashEmptied = true;
      state.error = null;
    },
    emptyTrashFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isTrashEmptied = false;
    },
    emptyTrashReset(state) {
      state.isTrashEmptied = false;
    },

    deleteSnippetRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isDeleted = false;
    },
    deleteSnippetSuccess(state, action) {
      state.loading = false;

      state.trashedSnippets = state.trashedSnippets.filter(
        (snippet) => snippet._id !== action.payload.id
      );
      state.message = action.payload.message;
      state.isDeleted = true;
      state.error = null;
    },
    deleteSnippetFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isDeleted = false;
    },
    deleteSnippetReset(state) {
      state.isDeleted = false;
    },

    toggleFavoriteRequest(state) {
      state.loading = true;
      state.error = null;
    },
    toggleFavoriteSuccess(state, action) {
      state.loading = false;

      state.snippets = state.snippets.map((snippet) =>
        snippet._id === action.payload.snippet._id
          ? action.payload.snippet
          : snippet
      );

      if (action.payload.snippet.isFavorite === false) {
        state.favoriteSnippets = state.favoriteSnippets.filter(
          (snippet) => snippet._id !== action.payload.snippet._id
        );
      } else {
        const exists = state.favoriteSnippets.some(
          (snippet) => snippet._id === action.payload.snippet._id
        );
        if (!exists) {
          state.favoriteSnippets.push(action.payload.snippet);
        } else {
          state.favoriteSnippets = state.favoriteSnippets.map((snippet) =>
            snippet._id === action.payload.snippet._id
              ? action.payload.snippet
              : snippet
          );
        }
      }

      if (
        state.currentSnippet &&
        state.currentSnippet._id === action.payload.snippet._id
      ) {
        state.currentSnippet = action.payload.snippet;
      }

      state.message = action.payload.message;
      state.error = null;
    },
    toggleFavoriteLocal: (state, action) => {
      const id = action.payload;
      const snippet = state.snippets.find((snippet) => snippet._id === id);
      if (snippet) {
        snippet.isFavorite = !snippet.isFavorite;
      }
    },
    toggleFavoriteFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    searchSnippetsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    searchSnippetsSuccess(state, action) {
      state.loading = false;
      state.searchResults = action.payload.snippets;
      state.error = null;
    },
    searchSnippetsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },

    getFavoriteSnippetsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getFavoriteSnippetsSuccess(state, action) {
      state.loading = false;
      state.favoriteSnippets = action.payload.snippets;
      state.error = null;
    },
    getFavoriteSnippetsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getSnippetsByTagRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSnippetsByTagSuccess(state, action) {
      state.loading = false;
      state.taggedSnippets = action.payload.snippets;
      state.error = null;
    },
    getSnippetsByTagFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearTaggedSnippets(state) {
      state.taggedSnippets = [];
    },

    getSnippetVersionsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSnippetVersionsSuccess(state, action) {
      state.loading = false;
      state.snippetVersions = action.payload.versions;
      state.error = null;
    },
    getSnippetVersionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    restoreSnippetVersionRequest(state) {
      state.loading = true;
      state.error = null;
      state.isVersionRestored = false;
    },
    restoreSnippetVersionSuccess(state, action) {
      state.loading = false;

      state.snippets = state.snippets.map((snippet) =>
        snippet._id === action.payload.snippet._id
          ? action.payload.snippet
          : snippet
      );

      if (
        state.currentSnippet &&
        state.currentSnippet._id === action.payload.snippet._id
      ) {
        state.currentSnippet = action.payload.snippet;
      }
      state.message = action.payload.message;
      state.isVersionRestored = true;
      state.error = null;
    },
    restoreSnippetVersionFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isVersionRestored = false;
    },
    restoreSnippetVersionReset(state) {
      state.isVersionRestored = false;
    },
    clearSnippetVersions: (state) => {
      state.snippetVersions = [];
    },

    clearErrors(state) {
      state.error = null;
    },

    clearMessages(state) {
      state.message = null;
    },
  },
});

export const {
  getAllSnippetsRequest,
  getAllSnippetsSuccess,
  getAllSnippetsFailed,
  getSnippetByIdRequest,
  getSnippetByIdSuccess,
  getSnippetByIdFailed,
  createSnippetRequest,
  createSnippetSuccess,
  createSnippetFailed,
  createSnippetReset,
  updateSnippetRequest,
  updateSnippetSuccess,
  updateSnippetFailed,
  updateSnippetReset,

  moveToTrashRequest,
  moveToTrashSuccess,
  moveToTrashFailed,
  moveToTrashReset,
  getTrashSnippetsRequest,
  getTrashSnippetsSuccess,
  getTrashSnippetsFailed,
  restoreFromTrashRequest,
  restoreFromTrashSuccess,
  restoreFromTrashFailed,
  restoreFromTrashReset,
  emptyTrashRequest,
  emptyTrashSuccess,
  emptyTrashFailed,
  emptyTrashReset,

  deleteSnippetRequest,
  deleteSnippetSuccess,
  deleteSnippetFailed,
  deleteSnippetReset,

  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteFailed,
  searchSnippetsRequest,
  searchSnippetsSuccess,
  searchSnippetsFailed,
  clearSearchResults,
  getFavoriteSnippetsRequest,
  getFavoriteSnippetsSuccess,
  getFavoriteSnippetsFailed,
  getSnippetsByTagRequest,
  getSnippetsByTagSuccess,
  getSnippetsByTagFailed,
  clearTaggedSnippets,

  getSnippetVersionsRequest,
  getSnippetVersionsSuccess,
  getSnippetVersionsFailed,
  restoreSnippetVersionRequest,
  restoreSnippetVersionSuccess,
  restoreSnippetVersionFailed,
  restoreSnippetVersionReset,
  clearSnippetVersions,
  clearErrors,
  clearMessages,
} = snippetSlice.actions;

export const getAllSnippets =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(getAllSnippetsRequest());
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllSnippetsSuccess(response.data));
    } catch (error) {
      dispatch(getAllSnippetsFailed(error.response.data.message));
    }
  };

export const getSnippetById = (id) => async (dispatch) => {
  dispatch(getSnippetByIdRequest());
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    dispatch(getSnippetByIdSuccess(response.data));
  } catch (error) {
    dispatch(getSnippetByIdFailed(error.response.data.message));
  }
};

export const createSnippet = (snippetData) => async (dispatch) => {
  dispatch(createSnippetRequest());
  try {
    const response = await axios.post(`${API_URL}`, snippetData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(createSnippetSuccess(response.data));
  } catch (error) {
    dispatch(createSnippetFailed(error.response.data.message));
  }
};

export const updateSnippet = (id, snippetData) => async (dispatch) => {
  dispatch(updateSnippetRequest());
  try {
    const response = await axios.put(`${API_URL}/${id}`, snippetData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updateSnippetSuccess(response.data));
  } catch (error) {
    dispatch(updateSnippetFailed(error.response.data.message));
  }
};

export const getSnippetVersions = (id) => async (dispatch) => {
  dispatch(getSnippetVersionsRequest());
  try {
    const response = await axios.get(`${API_URL}/${id}/versions`, {
      withCredentials: true,
    });
    dispatch(getSnippetVersionsSuccess(response.data));
  } catch (error) {
    dispatch(
      getSnippetVersionsFailed(
        error.response?.data?.message || "Failed to fetch version history"
      )
    );
  }
};

export const restoreSnippetVersion =
  (snippetId, versionIndex) => async (dispatch, getState) => {
    dispatch(restoreSnippetVersionRequest());

    try {
      const { snippetVersions } = getState().snippet;

      if (!snippetVersions || !snippetVersions[versionIndex]) {
        throw new Error("Version not found");
      }

      if (
        snippetVersions[versionIndex].snippetId &&
        snippetVersions[versionIndex].snippetId !== snippetId
      ) {
        throw new Error("Version does not belong to this snippet");
      }

      const response = await axios.post(
        `${API_URL}/${snippetId}/restore/${versionIndex}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(restoreSnippetVersionSuccess(response.data));
    } catch (error) {
      dispatch(
        restoreSnippetVersionFailed(
          error.response?.data?.message ||
            error.message ||
            "Failed to restore version"
        )
      );
    }
  };

export const moveToTrash = (id) => async (dispatch) => {
  dispatch(moveToTrashRequest());
  try {
    const response = await axios.patch(
      `${API_URL}/${id}/trash`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(
      moveToTrashSuccess({
        id,
        message: response.data.message,
      })
    );
  } catch (error) {
    dispatch(
      moveToTrashFailed(
        error.response?.data?.message || "Failed to move to trash"
      )
    );
  }
};

export const getTrashSnippets = () => async (dispatch) => {
  dispatch(getTrashSnippetsRequest());
  try {
    const response = await axios.get(`${API_URL}/trash`, {
      withCredentials: true,
    });
    dispatch(getTrashSnippetsSuccess(response.data));
  } catch (error) {
    dispatch(
      getTrashSnippetsFailed(
        error.response?.data?.message || "Failed to get trash snippets"
      )
    );
  }
};

export const restoreFromTrash = (id) => async (dispatch) => {
  dispatch(restoreFromTrashRequest());
  try {
    const response = await axios.patch(
      `${API_URL}/${id}/restore`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(restoreFromTrashSuccess(response.data));
  } catch (error) {
    dispatch(
      restoreFromTrashFailed(
        error.response?.data?.message || "Failed to restore from trash"
      )
    );
  }
};

export const emptyTrash = () => async (dispatch) => {
  dispatch(emptyTrashRequest());
  try {
    const response = await axios.delete(`${API_URL}/trash`, {
      withCredentials: true,
    });
    dispatch(emptyTrashSuccess(response.data));
  } catch (error) {
    dispatch(
      emptyTrashFailed(error.response?.data?.message || "Failed to empty trash")
    );
  }
};

export const deleteSnippet = (id) => async (dispatch) => {
  dispatch(deleteSnippetRequest());
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    dispatch(
      deleteSnippetSuccess({
        id,
        message: response.data.message,
      })
    );
  } catch (error) {
    dispatch(
      deleteSnippetFailed(
        error.response?.data?.message || "Failed to delete snippet"
      )
    );
  }
};

export const toggleFavorite = (id) => async (dispatch) => {
  dispatch(toggleFavoriteRequest());
  try {
    const response = await axios.patch(
      `${API_URL}/${id}/favorite`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("Toggle Favorite API Response:", response.data);
    dispatch(toggleFavoriteSuccess(response.data));
  } catch (error) {
    console.error("Toggle Favorite API Error:", error);
    dispatch(
      toggleFavoriteFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const searchSnippets = (query) => async (dispatch) => {
  dispatch(searchSnippetsRequest());
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`, {
      withCredentials: true,
    });
    dispatch(searchSnippetsSuccess(response.data));
  } catch (error) {
    dispatch(
      searchSnippetsFailed(error.response?.data?.message || "Search failed")
    );
  }
};

export const getFavoriteSnippets = () => async (dispatch) => {
  dispatch(getFavoriteSnippetsRequest());
  try {
    const response = await axios.get(`${API_URL}/favorites`, {
      withCredentials: true,
    });
    dispatch(getFavoriteSnippetsSuccess(response.data));
  } catch (error) {
    dispatch(
      getFavoriteSnippetsFailed(
        error.response?.data?.message || "Failed to get favorites"
      )
    );
  }
};

export const getSnippetsByTag = (tag) => async (dispatch) => {
  dispatch(getSnippetsByTagRequest());
  try {
    const response = await axios.get(`${API_URL}/tag/${tag}`, {
      withCredentials: true,
    });
    dispatch(getSnippetsByTagSuccess(response.data));
  } catch (error) {
    dispatch(
      getSnippetsByTagFailed(
        error.response?.data?.message || "Failed to get snippets by tag"
      )
    );
  }
};

export const snippetReducer = snippetSlice.reducer;
