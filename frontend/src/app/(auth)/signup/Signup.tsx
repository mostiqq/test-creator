import AuthBlock from '@/components/auth-block/AuthBlock'
import styles from './Signup.module.scss'

function Signup() {
	return (
		<div className={styles.main}>
			<AuthBlock title='Регистрация' />
		</div>
	)
}
export default Signup
