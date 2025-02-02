import { IRoutes } from "../interfaces/routes";
import { LiaComment } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";

export const routes: IRoutes[] = [
  {
    label: "Comments",
    path: "/",
    icon: <LiaComment />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <FaRegUser />,
  },
];
