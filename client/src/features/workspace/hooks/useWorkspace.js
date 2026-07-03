import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchWorkspaces,
    addWorkspace,
    removeWorkspace,
    fetchWorkspaceById,
} from "../store/workspaceSlice";

import {
    selectWorkspaces,
    selectWorkspaceLoading,
    selectWorkspaceError,
    selectWorkspace
} from "../store/workspaceSelectors";

const useWorkspace = () => {

    const dispatch = useDispatch();

    const workspaces = useSelector(selectWorkspaces);

    const isLoading = useSelector(selectWorkspaceLoading);

    const error = useSelector(selectWorkspaceError);

    const selectedWorkspace = useSelector(
    selectWorkspace
);
    useEffect(() => {

        dispatch(fetchWorkspaces());

    }, [dispatch]);

    const createWorkspace = async (data) => {

        return dispatch(addWorkspace(data)).unwrap();

    };

    const deleteWorkspace = async (id) => {

        return dispatch(removeWorkspace(id)).unwrap();

    };

    const getWorkspace = async (id) => {

    return dispatch(fetchWorkspaceById(id)).unwrap();

};

    return {

        workspaces,

        isLoading,

        error,

        createWorkspace,

        deleteWorkspace,
        getWorkspace,
        selectedWorkspace

    };

};

export default useWorkspace;