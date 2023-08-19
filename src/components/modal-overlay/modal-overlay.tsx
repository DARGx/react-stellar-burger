import { FC } from 'react';
import { ModalOverlayProps } from '../../types/modal';
import styles from '../modal-overlay/modal-overlay.module.css'


const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div id='overlay' onClick={onClick} className={styles.overlay}></div>
  )
}

export default ModalOverlay;
