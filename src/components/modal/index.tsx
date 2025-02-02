import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  disabled,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
    >
      <div className="w-full max-w-lg max-h-[60dvh] md:max-h-[80vh] p-6 bg-white rounded-3xl shadow-lg overflow-y-scroll">
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <div className="mt-4 h-full">{children}</div>
        <div className="mt-6">
          <Button
            label="Add Entry"
            fullWidth
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
