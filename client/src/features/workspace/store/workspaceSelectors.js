export const selectWorkspaces = (state) =>
    state.workspace.workspaces;

export const selectWorkspace = (state) =>
    state.workspace.selectedWorkspace;

export const selectWorkspaceLoading = (state) =>
    state.workspace.isLoading;

export const selectWorkspaceError = (state) =>
    state.workspace.error;