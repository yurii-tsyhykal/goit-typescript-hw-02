import Modal from 'react-modal';
import { closeModal } from '../../App/App.types';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ImageModal {
  modalIsOpen: boolean;
  closeModal: closeModal;
  src: string | null;
  alt: string | null;
}

const ImageModal: React.FC<ImageModal> = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={src || 'We don’t have image'} alt={alt || 'Image here'} />
      </Modal>
    </>
  );
};

export default ImageModal;
