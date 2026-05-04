"use client";

import { Modal } from "antd";
import { ReactNode } from "react";

interface AppModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

export const AppModal = ({
  open,
  title,
  onClose,
  children,
  width = 600,
}: AppModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      }
      width={width}
      centered
      destroyOnClose
      // closeIcon={
      //   <span className="text-xl hover:text-red-500 transition">×</span>
      // }
    >
      <div className="mt-4">{children}</div>
    </Modal>
  );
};