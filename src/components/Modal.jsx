import styles from './Modal.module.css';
import { DangerTriangleBig } from '@assets/icons';

const Modal = ({ onClose, handleConfirm, handleCancel }) => {
  return (
    <div className={styles.dim}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <DangerTriangleBig />
        <p className={styles.modalTitle}>위험!</p>
        <p className={styles.modalContent}>
          A구역에서 95dB 이상의 음을 감지했습니다. <br />
          분석을 시작합니다.
        </p>
        <div>
          {/* <button 
            className={`${styles.modalButton} ${styles.cancelButton}`} 
            onClick={handleCancel}
          >
            취소
          </button> */}
          <button 
            className={styles.modalButton} 
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;