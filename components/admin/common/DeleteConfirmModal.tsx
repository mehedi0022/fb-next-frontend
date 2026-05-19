// components/common/DeleteConfirmModal.tsx
import { Modal } from "antd";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
  okText?: string;
  confirmLoading?: boolean;
}

export const DeleteConfirmModal = ({
  open,
  onConfirm,
  onCancel,
  title = "Delete",
  content,
  okText = "Delete",
  confirmLoading = false,
}: Props) => (
  <Modal
    title={title}
    open={open}
    onOk={onConfirm}
    onCancel={onCancel}
    okText={okText}
    okButtonProps={{ danger: true, loading: confirmLoading }}
  >
    <p>{content || "Are you sure?"}</p>
  </Modal>
);
