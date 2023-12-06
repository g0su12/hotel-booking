const initialState = {
  isLoading: false,
};

export const selectLoading = (state) => state.loading.isLoading;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
