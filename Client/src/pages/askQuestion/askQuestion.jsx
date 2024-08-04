import React, { useState } from 'react';
import axiosBase from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from './askQuestion.module.css';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AskQuestionPage = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [postedQuestionId, setPostedQuestionId] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axiosBase.post('/questions/askquestion', {
				title,
				description,
				tag,
			});
			toast.success('Your question is posted successfully!!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});

			// Delay the navigation to the questions page
			setTimeout(() => {
				setTitle('');
				setDescription('');
				setTag('');
				setError(null);
				navigate('/questions');
			}, 2000); // 2 seconds delay
		} catch (error) {
			setError(
				error.response?.data?.msg || 'An error occurred. Please try again.'
			);
			setSuccess(null);
		}
	};

	return (
		<div className={styles.container}>
			<h1>Ask a Question</h1>

			{error && <p className="text-red-500 mb-4">{error}</p>}
			<div className={styles.general_desc}>
				<p className={styles.title}>Steps to write a good question</p>
				<div className={styles.Summarize}>
					<ul>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Summarize your problem in a one-line title.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Describe your problem in more detail.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Describe what you tried and what you expected to happen.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Review your question and post it to the site.
						</li>
					</ul>
				</div>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4 justify-center">
				<h2 style={{ textAlign: 'center', fontSize: '35px' }}>
					Post Your Question
				</h2>
				<div>
					<label htmlFor="title" className="text-[20px]">
						Title
					</label>
					<input
						type="text"
						id="title"
						placeholder="Question Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
					/>
				</div>
				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 text-[20px]"
					>
						Description
					</label>
					<textarea
						id="description"
						placeholder="Question Description. . ."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="tag"
						placeholder="tag"
						className="block text-sm font-medium text-gray-700 text-[20px]"
					>
						Tag
					</label>
					<input
						type="text"
						id="tag"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
						required
					/>
				</div>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-orange-700 text-white rounded-md flex justify-center items-center hover:bg-orange-800 mx-auto text-[20px]"
				>
					<span className="mr-2">Send To Community</span>
					<SendOutlinedIcon style={{ fontSize: 40 }} />
				</button>
			</form>
			{success && (
				<button
					onClick={() => navigate(`/questions/${postedQuestionId}`)}
					className="mt-2 px-4 py-1 bg-green-600 text-white rounded-md flex justify-center items-center hover:bg-green-800 mx-auto text-[20px]"
				>
					See Your Question Details
				</button>
			)}

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
};

export default AskQuestionPage;
