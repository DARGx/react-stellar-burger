import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalProps } from '../../types/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import cn from 'classnames';
import styles from './modal.module.css';

export const modalRoot = document.querySelector('#modals') as HTMLElement;

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    function closeEsc(evt: KeyboardEvent) {
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
          <CloseIcon type={'primary'} onClick={onClose} />
        </div>
        {children}
      </section>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

export default modalRoot;
