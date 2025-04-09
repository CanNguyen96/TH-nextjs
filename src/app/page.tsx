import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.centeredContainer}>
          <h1 className={styles.title}>Chào mừng bạn đến với ANIMEHAY</h1>
          <p className={styles.description}>Trang web xem phim online miễn phí</p>
          <div className={styles.authButtons}>
            <Link href="/register" className={styles.register}>Đăng ký</Link>
            <Link href="/login" className={styles.login}>Đăng nhập</Link>
          </div>
        </div>
      </main>
    </div>
  );
}