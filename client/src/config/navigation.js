import {
    LayoutDashboard,
    FolderOpen,
    LogOut
} from "lucide-react";

const navigation = [
    {
        id: 1,
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        id: 2,
        label: "Workspaces",
        path: "/workspaces",
        icon: FolderOpen
    },
    {
        id: 3,
        label: "Logout",
        path: "/logout",
        icon: LogOut
    }
];

export default navigation;