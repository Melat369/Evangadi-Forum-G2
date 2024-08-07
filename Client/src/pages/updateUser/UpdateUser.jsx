import React, { useEffect, useRef } from 'react';
import styles from './UpdateProfileForm.module.css';
import axios from '../../axiosConfig';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import { Eye, FaEyeSlash } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function UpdateUser() {
	const [username, SetUsername] = useState('');
	const [firstname, SetFirstname] = useState('');
	const [lastname, SetLastname] = useState('');
	const [email, SetEmail] = useState('');
	const [currentPassword, SetCurrentPassword] = useState('');
	const [newPassword, SetNewPassword] = useState('');
	const [retypeNewPassword, SetRetypeNewPassword] = useState('');
	const [message, Setmessage] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

	// const changeColorRef = useRef(null);
	// const headerReftext = useRef(null);
	// const ErrorEmailplaceholderRef = useRef(null);
	// const ErrorFirstNameplaceholderRef = useRef(null);
	// const ErrorLastNameplaceholderRef = useRef(null);
	// const ErrorUsernameplaceholderRef = useRef(null);
	// const ErrorNewPasswordplaceholderRef = useRef(null);
	// const ErrorHeaderPasswordText = useRef();

	const FormSubmitHandler = async (e) => {
		e.preventDefault();

		const profiledata = {
			username,
			firstname,
			lastname,
			email,
			currentPassword,
			newPassword,
			retypeNewPassword,
		};

		try {
			const response = await axios.put('/users/profile', profiledata);
			console.log('Profile updated successfully', response.data);
			// Setmessage(response.data.msg);
			if (response.data.msg === 'Profile updated successfully') {
				toast.success('Profile updated successfully');
				// changeColorRef.current.style.backgroundColor = 'green';
				// headerReftext.current.style.display = 'block';
				// headerReftext.current.textContent = 'Profile updated sucesfully.';
				// headerReftext.current.style.color = 'green';
				// ErrorEmailplaceholderRef.current.classList.remove(styles.Error);
				// ErrorFirstNameplaceholderRef.current.classList.remove(styles.Error);
				// ErrorLastNameplaceholderRef.current.classList.remove(styles.Error);
				// ErrorUsernameplaceholderRef.current.classList.remove(styles.Error);
			}
			if (response.data.msg === 'Password changed sucesfully') {
				toast.success('Password changed sucesfully');
				// ErrorHeaderPasswordText.current.textContent =
				// 	'You have sucesfully changed your password!';
				// ErrorHeaderPasswordText.current.style.display = 'block';
				// ErrorHeaderPasswordText.current.style.color = 'green';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
				// ErrorHeaderPasswordText.current.style.display = 'block';
			}
		} catch (error) {
			Setmessage(error.response.data.msg);
			console.error(
				'Error updating profile:',
				error.response ? error.response.data : error.message
			);
			if (
				error.response.data.msg ===
				'Please make sure you have entered all required fields.'
			) {
				toast.error('Please make sure you have entered all required fields.');
				// changeColorRef.current.style.backgroundColor = '#0056b3';
				// headerReftext.current.textContent =
				// 	'Please make sure you have entered all required fields.';
				// headerReftext.current.style.display = 'block';
				// headerReftext.current.style.color = 'red';
				// ErrorEmailplaceholderRef.current.classList.add(styles.Error);
				// ErrorFirstNameplaceholderRef.current.classList.add(styles.Error);
				// ErrorLastNameplaceholderRef.current.classList.add(styles.Error);
				// ErrorUsernameplaceholderRef.current.classList.add(styles.Error);
			}

			if (
				error.response.data.msg ===
				'Please make sure you have entered all required fields.'
			) {
				toast.error(
					'To change the password, provide current password, new password, and retype your new password.'
				);
				// ErrorHeaderPasswordText.current.textContent =
				// 	'To change the password, provide current password, new password, and retype your new password.';
				// ErrorHeaderPasswordText.style.display = 'block';
				// ErrorHeaderPasswordText.style.color = 'red';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
			}

			if (
				error.response.data.msg ===
				'To change your password, please provide your new password.'
			) {
				toast.error(
					'To change your current password, please provide your new password.'
				);
				// ErrorHeaderPasswordText.current.textContent =
				// 	'To change your current password, please provide your new password.';
				// ErrorHeaderPasswordText.current.style.display = 'block';
				// ErrorHeaderPasswordText.current.style.color = 'red';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
			}

			if (
				error.response.data.msg ===
				'New password must be longer than 8 characters'
			) {
				toast.error('New password must be longer than 8 characters.');
				// ErrorHeaderPasswordText.current.textContent =
				// 	'New password must be longer than 8 characters.';
				// ErrorHeaderPasswordText.current.style.display = 'block';
				// ErrorHeaderPasswordText.current.style.color = 'red';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
			}

			if (
				error.response.data.msg ===
				'New password and retype new password do not match'
			) {
				toast.error('Your new password and retyped password does not match.');
				// ErrorHeaderPasswordText.current.textContent =
				// 	'Your new password and retyped password does not match.';
				// ErrorHeaderPasswordText.current.style.display = 'block';
				// ErrorHeaderPasswordText.current.style.color = 'red';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
			}

			if (error.response.data.msg === 'Current password is incorrect') {
				toast.error('Your current password is incorrect');
				// ErrorHeaderPasswordText.current.textContent =
				// 	'Your current password is incorrect';
				// ErrorHeaderPasswordText.current.style.display = 'block';
				// ErrorHeaderPasswordText.current.style.color = 'red';
				// ErrorNewPasswordplaceholderRef.current.classList.add(styles.Error);
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.profileUpdate}>
				<h2 className={styles.profileText}>Update Profile</h2>
				{/* <h5 className={styles.reftext} ref={headerReftext}>
					Profile Sucesfully updated
				</h5> */}
				<form className={styles.form} onSubmit={FormSubmitHandler}>
					<div className={styles.formGroup}>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => SetEmail(e.target.value)}
							className={styles.input}
							// ref={ErrorEmailplaceholderRef}
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							type="text"
							placeholder="First Name"
							value={firstname}
							onChange={(e) => SetFirstname(e.target.value)}
							className={styles.input}
							// ref={ErrorFirstNameplaceholderRef}
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={lastname}
							onChange={(e) => SetLastname(e.target.value)}
							className={styles.input}
							// ref={ErrorLastNameplaceholderRef}
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => SetUsername(e.target.value)}
							className={styles.input}
							// ref={ErrorUsernameplaceholderRef}
						/>
					</div>
					<button
						type="submit"
						className={styles.button}
						// ref={changeColorRef}
					>
						Update
					</button>
				</form>
			</div>
			<div className={styles.passwordChange}>
				<h2 className={styles.passwrodText}>
					Use this field if you would like to change your password
				</h2>
				<form className={styles.form} onSubmit={FormSubmitHandler}>
					<div className="relative">
						<input
							type={showCurrentPassword ? 'text' : 'password'}
							placeholder="Current Password"
							value={currentPassword}
							onChange={(e) => SetCurrentPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							{showCurrentPassword ? (
								<FaEyeSlash size={20} />
							) : (
								<FaEye size={20} />
							)}
						</button>
					</div>
					<div className="relative mt-4">
						<input
							type={showNewPassword ? 'text' : 'password'}
							placeholder="New Password"
							value={newPassword}
							onChange={(e) => SetNewPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowNewPassword(!showNewPassword)}
						>
							{showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
						</button>
					</div>
					<div className="relative mt-4">
						<input
							type={showRetypeNewPassword ? 'text' : 'password'}
							placeholder="Retype New Password"
							value={retypeNewPassword}
							onChange={(e) => SetRetypeNewPassword(e.target.value)}
							className="w-full px-4 py-2 pr-12 border rounded-md"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center px-3"
							onClick={() => setShowRetypeNewPassword(!showRetypeNewPassword)}
						>
							{showRetypeNewPassword ? (
								<FaEyeSlash size={20} />
							) : (
								<FaEye size={20} />
							)}
						</button>
					</div>
					<button type="submit" className={styles.button}>
						Change Password
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default UpdateUser;