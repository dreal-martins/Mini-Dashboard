import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

export default function Mainbody({ children }: Props) {
  return (
    <main className="h-dvh w-full">{children ? children : <Outlet />}</main>
  );
}
