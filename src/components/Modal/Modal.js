import React from "react";
import { Modal as ModalAntd } from "antd";

export default function Modal(props) {
  const { isVisibleModal, setIsVisibleModal, modalTitle, children } = props;

  return (
    <ModalAntd
      visible={isVisibleModal}
      centered
      closable
      title={modalTitle}
      onCancel={() => setIsVisibleModal(false)}
      footer={false}
    >
      {children}
    </ModalAntd>
  );
}
