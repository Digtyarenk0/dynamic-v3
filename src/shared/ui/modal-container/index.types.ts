/* eslint-disable @typescript-eslint/ban-types */

export interface ModalContainerProps {
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
  header?: boolean;
  className?: string;
}
