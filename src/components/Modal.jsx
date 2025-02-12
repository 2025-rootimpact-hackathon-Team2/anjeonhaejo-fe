import styles from './Modal.module.css';
import { DangerTriangleBig } from '@assets/icons';

const Modal = ({ onClose }) => {
  return (
    <div className={styles.dim}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <DangerTriangleBig />
        <p className={styles.modalTitle}>Warning!</p>
        <p className={styles.modalContent}>
          A구역에서 120dB 이상의 충돌음을 감지했습니다. <br />
          대처 및 확인이 필요합니다.
        </p>
        <button 
          className={styles.modalButton} 
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default Modal;