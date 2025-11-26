'use client'
import { useLoginMutation, useSignupMutation } from '@/store/auth.api'
import { Button, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthBlock.module.scss'

interface AuthBlockProps {
	title: 'Вход' | 'Регистрация'
}

interface FormValues {
	name: string
	password: string
}

function AuthBlock({ title }: AuthBlockProps) {
	const { control, handleSubmit, reset } = useForm<FormValues>({
		mode: 'onChange'
	})
	const router = useRouter()

	const [login, { isLoading: isLoginLoading, error: loginError }] =
		useLoginMutation()

	const [signup, { isLoading: isSignupLoading, error: signupError }] =
		useSignupMutation()

	const onSubmit: SubmitHandler<FormValues> = async data => {
		if (title === 'Вход') {
			try {
				await login(data).unwrap()

				reset({
					name: '',
					password: ''
				})
				router.replace('/')
			} catch {}
		} else {
			try {
				await signup(data).unwrap()

				reset({
					name: '',
					password: ''
				})
				router.replace('/')
			} catch {}
		}
	}

	return (
		<div className={styles.main}>
			<h2 className={styles.title}>{title}</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Имя обязательно' }}
					render={({ field, fieldState: { error } }) => (
						<div
							style={{
								position: 'relative'
							}}
						>
							<Input
								style={{ width: '300px' }}
								placeholder='Введите имя'
								{...field}
								status={error ? 'error' : ''}
							/>
							{error && (
								<div style={{ color: 'red' }} className={styles.inputError}>
									{error.message}
								</div>
							)}
						</div>
					)}
				/>
				<Controller
					name='password'
					control={control}
					rules={{
						required: 'Пароль обязателен',
						minLength: {
							value: 6,
							message: 'Пароль должен содержать минимум 6 символов'
						}
					}}
					render={({ field, fieldState: { error } }) => (
						<div
							style={{
								position: 'relative'
							}}
						>
							<Input
								style={{ width: '300px' }}
								{...field}
								status={error ? 'error' : ''}
								placeholder='Введите пароль'
								type='password'
							/>
							{error && (
								<div style={{ color: 'red' }} className={styles.inputError}>
									{error.message}
								</div>
							)}
						</div>
					)}
				/>
				<Button
					className={styles.submitBtn}
					variant='outlined'
					htmlType='submit'
					type='default'
					disabled={isLoginLoading || isSignupLoading}
				>
					Войти
				</Button>
				{(loginError || signupError) && <div>Неправильное имя или пароль</div>}
			</form>
		</div>
	)
}
export default AuthBlock
