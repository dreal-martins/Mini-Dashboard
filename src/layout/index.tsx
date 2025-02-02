import { useScreenSize } from "../hooks";
import Desktop from "./desktop";
import { default as Mobile, default as MobileLayout } from "./mobile";

export default function Layout() {
  const { isMobile, isDesktop } = useScreenSize();

  let layoutContent;

  switch (true) {
    case isMobile:
      layoutContent = <MobileLayout />;

      break;
    case isDesktop:
      layoutContent = <Desktop />;
      break;

    default:
      layoutContent = <Mobile />;
      break;
  }

  return layoutContent;
}
