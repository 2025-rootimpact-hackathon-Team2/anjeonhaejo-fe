import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      {/* TODO: 로고 이미지 추가 */}
      <div className={styles.logo}>LOGO</div>
      {/* TODO: 날짜 시간 추가 */}
      <div className={styles.dateTime}>
        <div className={styles.date}>2025.02.08 AM 12:00</div>
        <div className={styles.day}>목요일</div>
      </div>
    </div>
  )
}

export default Header;