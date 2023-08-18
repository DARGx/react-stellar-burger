import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export type ModalPropsId = ModalProps & { id: string };

export type ModalOverlayProps = {
  onClick: () => void;
};