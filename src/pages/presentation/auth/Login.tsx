import React, { FC, useCallback, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import axios from 'axios';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [signUpStatus, setSignUpStatus] = useState<boolean>(!!isSignUp);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const usernameCheck = (username: string) => {
		//return !!getUserDataWithUsername(username);
		return true;
	};


	const loginformik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: USERS.JOHN.username,
			loginPassword: USERS.JOHN.password,
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => { 
			// if (usernameCheck(values.loginUsername)) {
			// 	if (setUser) {
			// 			setUser(values.loginUsername);
			// 		}
			// 		handleOnClick();
			// 	} else {
			// 		loginformik.setFieldError('loginPassword', 'Username and password do not match.');
			// 	}
			// 
			if (usernameCheck(values.loginUsername)) {
				axios.post('https://api.heynova.work/login',{
					email: values.loginUsername,
					password: values.loginPassword
				}).
					then(response => {
					if(response.status == 200)
					   {
						if (setUser) {
							setUser(values.loginUsername);
						}
						handleOnClick();
					   }
					})
					.catch(error => {console.log(error); 
						loginformik.setFieldError('loginPassword', 'Username and password do not match.');
					}); 
			}
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			if (
				!Object.keys(USERS).find(
					(f) => USERS[f].username.toString() === loginformik.values.loginUsername,
				)
			) {
				setSignInPassword(true);
				console.log();
				//formik.setFieldError('loginUsername', 'No such user found in the system.');
			} else {
				setSignInPassword(true);
			}
			setIsLoading(false);
		}, 1000);
	};

	const signUpformik = useFormik({
		enableReinitialize: true,
		initialValues: {
			signUpEmail: '',
			signUpPassword: '',
			signUpName: '',
			signUpSurname: ''
		},
		validate: (values) => {
			const errors: { signUpEmail?: string; signUpPassword?: string, signUpName ?: string, signUpSurname ?:string } = {};

			if (!values.signUpName) {
				errors.signUpName = 'Required';
			}

			if (!values.signUpSurname) {
				errors.signUpSurname = 'Required';
			}

			if (!values.signUpEmail) {
				errors.signUpEmail = 'Required';
			}

			if (!values.signUpPassword) {
				errors.signUpPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			axios.post('https://api.heynova.work/signup',{
			name: values.signUpName + ' ' + values.signUpSurname,
			email: values.signUpEmail,
			password: values.signUpPassword
		  }).
			then(response => {
				console.log(response);
			}).catch(error => {console.log(error);});
			//return getUserDataWithUsername(username).password === password;
		},
	});

	return (
		<PageWrapper
			isProtected={false}
			title={signUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !signUpStatus, 'bg-info': signUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={signUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSignUpStatus(!signUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!signUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSignUpStatus(!signUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={signUpStatus} />

								{/* <Alert isLight icon='Lock' isDismissible>
									<div className='row'>
										<div className='col-12'>
											<strong>Username:</strong> {USERS.JOHN.username}
										</div>
										<div className='col-12'>
											<strong>Password:</strong> {USERS.JOHN.password}
										</div>
									</div>
								</Alert> */}
								<form className='row g-4'>
									{signUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your email'>
													<Input
														autoComplete='email'
														value={signUpformik.values.signUpEmail}
														isTouched={signUpformik.touched.signUpEmail}
														invalidFeedback={
															signUpformik.errors.signUpEmail
														}
														validFeedback='Looks good!'
														isValid={signUpformik.isValid}
														onBlur={signUpformik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your name'>
												    <Input
														autoComplete='current-password'
														value={signUpformik.values.signUpName}
														isTouched={signUpformik.touched.signUpName}
														invalidFeedback={
															signUpformik.errors.signUpName
														}
														validFeedback='Looks good!'
														isValid={signUpformik.isValid}
														onBlur={signUpformik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input
														autoComplete='current-password'
														value={signUpformik.values.signUpSurname}
														isTouched={signUpformik.touched.signUpSurname}
														invalidFeedback={
															signUpformik.errors.signUpSurname
														}
														validFeedback='Looks good!'
														isValid={signUpformik.isValid}
														onBlur={signUpformik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='current-password'
														value={signUpformik.values.signUpPassword}
														isTouched={signUpformik.touched.signUpPassword}
														invalidFeedback={
															signUpformik.errors.signUpPassword
														}
														validFeedback='Looks good!'
														isValid={signUpformik.isValid}
														onBlur={signUpformik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={signUpformik.handleSubmit}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='Your email or username'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={loginformik.values.loginUsername}
														isTouched={loginformik.touched.loginUsername}
														invalidFeedback={
															loginformik.errors.loginUsername
														}
														isValid={loginformik.isValid}
														onChange={loginformik.handleChange}
														onBlur={loginformik.handleBlur}
														onFocus={() => {
															loginformik.setErrors({});
														}}
													/>
												</FormGroup>
												{signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {loginformik.values.loginUsername}.
													</div>
												)}
												<FormGroup
													id='loginPassword'
													isFloating
													label='Password'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={loginformik.values.loginPassword}
														isTouched={loginformik.touched.loginPassword}
														invalidFeedback={
															loginformik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={loginformik.isValid}
														onChange={loginformik.handleChange}
														onBlur={loginformik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!loginformik.values.loginUsername}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={loginformik.handleSubmit}>
														Login
													</Button>
												)}
											</div>
										</>
									)}

									{/* BEGIN :: Social Login */}
									{!signInPassword && (
										<>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											<div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomApple'
													onClick={handleOnClick}>
													Sign in with Apple
												</Button>
											</div>
											<div className='col-12'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomGoogle'
													onClick={handleOnClick}>
													Continue with Google
												</Button>
											</div>
										</>
									)}
									{/* END :: Social Login */}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': signUpStatus,
									'link-dark': !signUpStatus,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': signUpStatus,
									'link-dark': !signUpStatus,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
