"use client"; // Assure que ce composant est un composant client

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const [nomComplet, setNomComplet] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [telephone, setTelephone] = useState("");
	const [naissance, setNaissance] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter(); // Utilisez `useRouter` pour la navigation

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nomComplet,
				email,
				password,
				telephone,
				naissance,
			}),
		});

		if (response.ok) {
			// Redirection vers la page de connexion après une inscription réussie
			router.push("/login");
		} else {
			const data = await response.json();
			setErrorMessage(data.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
				<h1 className="text-3xl font-bold mb-6 text-gray-900">Inscription</h1>
				<form onSubmit={handleRegister} className="space-y-6">
					{/* Champs pour le nom complet */}
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-700"
							htmlFor="nomComplet"
						>
							Nom Complet
						</label>
						<input
							id="nomComplet"
							type="text"
							value={nomComplet}
							onChange={(e) => setNomComplet(e.target.value)}
							className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Votre nom complet"
							required
						/>
					</div>
					{/* Champs pour l'email */}
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
					{/* Champs pour le mot de passe */}
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
					{/* Champs pour le téléphone */}
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-700"
							htmlFor="telephone"
						>
							Téléphone
						</label>
						<input
							id="telephone"
							type="text"
							value={telephone}
							onChange={(e) => setTelephone(e.target.value)}
							className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Votre numéro de téléphone"
							required
						/>
					</div>
					{/* Champs pour la date de naissance */}
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-700"
							htmlFor="naissance"
						>
							Date de naissance
						</label>
						<input
							id="naissance"
							type="date"
							value={naissance}
							onChange={(e) => setNaissance(e.target.value)}
							className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
						S'inscrire
					</button>
				</form>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Vous avez déjà un compte ?{" "}
						<a
							href="/login"
							className="font-medium text-blue-600 hover:underline"
						>
							Se connecter
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
