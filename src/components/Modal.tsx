import { Modal } from 'ebs-design';

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
  open: boolean;
  title: string;
}

const ModalComp = ({ children, closeModal, open, title }: Props) => {
  return (
    <Modal open={open} onClose={closeModal} title={title}>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};
export default ModalComp;
