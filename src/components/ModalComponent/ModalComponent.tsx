import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-bootstrap';

interface IModalProps {
  children: React.ReactNode;
  show: boolean;
  title: string;
  onHide: () => void;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalComponent = ({ children, title, show, onHide }: IModalProps) => {
  return (
    <Modal show={show} onHide={onHide}>
      <div className="" />

      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      {children}
    </Modal>
  );
};
