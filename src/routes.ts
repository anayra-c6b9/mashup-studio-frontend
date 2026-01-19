import {
  createBrowserRouter,
  Navigate,
  NavigateFunction,
  redirect,
} from "react-router-dom";
import App from "./App";
import Page404 from "./Pages/page404/page404";
import Home from "./Pages/Home/Home";
import Room from "./Pages/Room/Room";
import RoomID from "./Pages/Room/RoomID/RoomID";
import About from "./Pages/About/About";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: () => redirect("home"),
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "room",
        Component: Room,

        children: [
          {
            path: ":roomId",
            Component: RoomID,
          },
        ],
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "*",
        Component: Page404,
      },
    ],
  },
]);

export default router;
