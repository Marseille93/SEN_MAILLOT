import { useState, useEffect } from "react";

interface LoginModalProps {
	onClose: () => void;
	setAuthenticated: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
	onClose,
	setAuthenticated,
}) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	// Handle click outside the modal to close it
	const handleOutsideClick = (e: MouseEvent) => {
		const modalContent = document.getElementById("modal-content");
		if (modalContent && !modalContent.contains(e.target as Node)) {
			onClose();
		}
	};

	useEffect(() => {
		// Add event listener for outside clicks
		document.addEventListener("mousedown", handleOutsideClick);

		// Cleanup event listener on unmount
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Login logic here
		const response = await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("token", data.token);
			setAuthenticated(true);
			onClose();
		} else {
			setErrorMessage("Login failed");
		}
	};

	return (
		<div className="flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-50 cursor-default">
			<div
				id="modal-content"
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">Login</h2>
				</div>
				{errorMessage && (
					<p className="text-red-500 text-center mb-4">{errorMessage}</p>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Login
						</button>
					</div>
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<a href="#" className="text-indigo-600 hover:underline">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
