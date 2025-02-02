import React from "react";

interface CustomIconProps {
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  SvgIcon,
  size = 12,
  color,
}) => {
  return (
    <div style={{ width: size, height: size, color }}>
      <SvgIcon width="100%" height="100%" />
    </div>
  );
};

export default CustomIcon;
