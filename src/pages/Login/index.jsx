import styles from './Login.module.css';
import { useUser } from '@hooks/UserHooks';

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useUser();
  return (
    <div className={styles.container}>
      <p className={styles.title}>로그인</p>
      <div className={styles.inputContainer}>
        <div className={styles.inputItem}>
          <p>아이디</p>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputItem}>
          <p>비밀번호</p>
          <input 
            type="password" 
            placeholder='비밀번호를 입력하세요.'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={!email || !password}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
