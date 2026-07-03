export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) =>
    state.auth.isAuthenticated;

export const selectLoading = (state) =>
    state.auth.isLoading;

export const selectError = (state) =>
    state.auth.error;