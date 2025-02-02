import { useState, useCallback } from "react";

interface ModalConfig {
  title: string;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const openModal = useCallback((config: ModalConfig) => {
    setModalConfig(config);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalConfig(null);
  }, []);

  return { isOpen, modalConfig, openModal, closeModal };
};
