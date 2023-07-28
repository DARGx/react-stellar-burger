import React from "react"
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import cn from 'classnames';



export const modalRoot = document.querySelector('#modals')
export const Modal = ({ title, onClose, children }) => {
  React.useEffect(() => {
    function closeEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeEsc);
    return () => {
      document.removeEventListener('keydown', closeEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <section className={styles.modal}>
        <div className={cn(styles.header, 'ml-10 mt-10 mr-10')}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon onClick={onClose} />
        </div>
        {children}
      </section>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  )
}

modalRoot.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default modalRoot;