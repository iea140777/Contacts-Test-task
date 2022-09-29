import { Modal } from 'antd';
import { ModalVariants } from '../../utils/constants';

interface ModalProps {
  variant?: ModalVariants;
  isModalOpen: boolean;
  contactName: string;
  handleModalOk: () => void;
  handleModalCancel: () => void;
}

function ContactsModal ({ variant, isModalOpen, contactName, handleModalOk, handleModalCancel }:ModalProps) {

const renderModalVariants = () => {
  switch (variant) {
    case ModalVariants.DELETE_CONTACT:
      return (
        <span>Are you sure you want to delete contact "{contactName}"?</span>
      )
    case ModalVariants.SAVE_EMPTY_CONTACT:
      return (
        <span>If you save contact without data it will be deleted. Are you sure you want to proceed?</span>
      )
    default: {
      return null;
    }
  }
}

  return (
    <Modal 
      title=""
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      destroyOnClose
    >
      {renderModalVariants()}
    </Modal>
  )
}

export { ContactsModal };