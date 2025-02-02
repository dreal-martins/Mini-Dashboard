import { useScreenSize } from "../../hooks";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Sidebar() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  if (isMobile) {
    return <Mobile />;
  }

  if (isTablet) {
    return <Desktop />;
  }

  if (isDesktop) {
    return <Desktop />;
  }
}
