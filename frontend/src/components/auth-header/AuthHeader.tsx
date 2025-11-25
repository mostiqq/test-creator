import Link from 'next/link'
import styles from './AuthHeader.module.scss'

function AuthHeader() {
	return (
		<header className={styles.main}>
			<Link className={styles.link} href='/signup'>
				Регистрация
			</Link>
			<Link className={styles.link} href='/login'>
				Войти
			</Link>
		</header>
	)
}
export default AuthHeader
