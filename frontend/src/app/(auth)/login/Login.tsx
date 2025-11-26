import AuthBlock from '@/components/auth-block/AuthBlock'
import styles from './Login.module.scss'

function Login() {
	return (
		<div className={styles.main}>
			<AuthBlock title='Вход' />
		</div>
	)
}
export default Login
