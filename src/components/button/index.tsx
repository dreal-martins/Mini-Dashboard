import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 font-medium rounded-lg focus:outline-none transition";

  const variantStyles = {
    primary: "bg-[#ec1d26] text-white hover:bg-[#B72B36]",
    secondary:
      "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100",
  };

  const sizeStyles = {
    small: "p-[8px_16px] text-sm",
    medium: "p-[10px_18px] text-base",
    large: "px-6 py-3 w-full text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const iconPositionStyle =
    iconPosition === "left" ? "flex-row" : "flex-row-reverse";

  const disabledStyles =
    "bg-gray-400 text-white cursor-not-allowed opacity-100";

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variantStyles[variant]
      } ${sizeStyles[size]} ${widthStyle} ${iconPositionStyle}`}
      disabled={disabled}
      {...props}
    >
      {icon}

      {label}
    </button>
  );
};

export default Button;
