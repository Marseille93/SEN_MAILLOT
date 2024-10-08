"use client"; // Assure que ce composant est un composant client

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	id: number;
	email: string;
	role: string;
	iat: number;
	exp: number;
}

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [flashMessage, setFlashMessage] = useState<string | null>(null); // Stocke le message flash
	const router = useRouter();

	// Récupérer le message depuis l'URL et le définir comme un flash message
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const message = urlParams.get("message");
		if (message) {
			setFlashMessage(message);

			// Effacer le message après 3 secondes
			const timer = setTimeout(() => {
				setFlashMessage(null);
				// Remplacer l'URL sans le paramètre 'message'
			}, 60000);

			return () => clearTimeout(timer);
		}
	}, [router]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			console.log("API Response:", data);

			const token = data.accessToken;

			if (typeof token === "string") {
				localStorage.setItem("token", token);
				try {
					const decodedToken: DecodedToken = jwtDecode(token);
					console.log("Decoded Token:", decodedToken);
					// Stocke l'ID de l'utilisateur dans localStorage

					if (decodedToken.role === "admin") {
						router.push("/admin");
					} else {
						localStorage.setItem("userId", decodedToken.id.toString());
						const redirectUrl =
							new URLSearchParams(window.location.search).get("redirect") ||
							"/";
						router.push(redirectUrl);
					}
				} catch (error) {
					console.error("Failed to decode token", error);
					setErrorMessage("Token invalide");
				}
			} else {
				setErrorMessage("Token invalide");
			}
		} else {
			const data = await response.json();
			setErrorMessage(data.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
				<h1 className="text-3xl font-bold mb-6 text-gray-900">Connexion</h1>

				{/* Affichage du message flash */}
				{flashMessage && (
					<div className="bg-green-200 text-green-700 p-4 rounded mb-4">
						{flashMessage}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-700"
							htmlFor="email"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="example@example.com"
							required
						/>
					</div>
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-700"
							htmlFor="password"
						>
							Mot de passe
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="••••••••"
							required
						/>
					</div>
					{errorMessage && (
						<p className="text-red-600 text-sm">{errorMessage}</p>
					)}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Se connecter
					</button>
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Pas encore de compte ?{" "}
						<a
							href="/register"
							className="font-medium text-blue-600 hover:underline"
						>
							S'inscrire
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
