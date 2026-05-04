// components/common/DeleteConfirmModal.tsx
import { Modal } from "antd";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
}

export const DeleteConfirmModal = ({
  open,
  onConfirm,
  onCancel,
  title = "Delete",
  content,
}: Props) => (
  <Modal
    title={title}
    open={open}
    onOk={onConfirm}
    onCancel={onCancel}
    okText="Delete"
    okButtonProps={{ danger: true }}
  >
    <p>{content || "Are you sure?"}</p>
  </Modal>
);
