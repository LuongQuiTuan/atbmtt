import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Take Note",
    icon: <EditNoteIcon />,
    link: "/dashboard",
  },
  {
    title: "Bookmark",
    icon: <BookmarksIcon />,
    link: "/dashboard",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];
