import CustomIcon from "../custom-icon";
import MenuIcon from "../../assets/menu.svg?react";
import { getCurrentDateTime } from "../../utils";
import { useEffect, useState } from "react";
import MobileSidebar from "../sidebar/mobile";
import { useSidebar } from "../../context";
const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4 flex justify-between items-center border-b border-[#DFDFDF] ">
      <img
        src="https://images.primeagile.com/ibcscorp_com/image/32401/logo-1200.svg"
        alt="logo"
        className="w-28 md:w-36"
      />

      <div onClick={toggleSidebar} className="md:hidden">
        <CustomIcon SvgIcon={MenuIcon} size={25} />

        <MobileSidebar />
      </div>

      <div className="hidden md:flex items-center">
        <h1 className="text-[#667185] text-base pr-5">
          {currentDateTime}
          <span className="text-lg pl-3">|</span>
        </h1>
        <div className="cursor-pointer">
          <img
            src="https://i.pinimg.com/474x/f0/4b/c7/f04bc7f4b16a2fc94078139ad03e6f88.jpg"
            width={45}
            height={45}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
