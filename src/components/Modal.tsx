import { RemoveIcon } from 'icons/index';
interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}
const Modal = ({ children, closeModal }: Props) => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <span className="close-modal" onClick={() => closeModal()}>
          <RemoveIcon />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
