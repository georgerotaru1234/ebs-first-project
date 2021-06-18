import { RemoveIcon } from 'icons/index';
interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}
const Modal = ({ children, closeModal }: Props) => {
  return (
    <div className="modal">
      <div className="modal--wrapper">
        <span className="close-modal" onClick={() => closeModal()}>
          <RemoveIcon />
        </span>
        <div className="modal--content">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
