import styles from '../modal-overlay/modal-overlay.module.css'

const ModalOverlay = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.overlay}></div>
  )
}

export default ModalOverlay;
