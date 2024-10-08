import { useState } from "react";
import ListerEquipes from "./ListerEquipes";

export default function AjouterEquipe() {
	const [nom, setNom] = useState("");
	const [logoUrl, setLogoUrl] = useState("");
	const [type, setType] = useState("club");
	const [message, setMessage] = useState(""); // Pour stocker le message de succès ou d'erreur

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const equipe = { nom, logoUrl, type };

		// Réinitialiser le message avant une nouvelle requête
		setMessage("");

		// Envoyer la requête POST à l'API pour ajouter une équipe
		fetch("http://localhost:3000/equipes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(equipe),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Erreur lors de l'ajout de l'équipe");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Équipe ajoutée:", data);
				// Afficher un message de succès et réinitialiser le formulaire
				setMessage("Équipe ajoutée avec succès !");
				setNom("");
				setLogoUrl("");
				setType("club");
			})
			.catch((error) => {
				console.error(error);
				// Afficher un message d'erreur
				setMessage("Erreur lors de l'ajout de l'équipe.");
			});
	};

	return (
		<div className="p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-6">Ajouter une Équipe</h2>

			{/* Affichage du message de succès ou d'erreur */}
			{message && (
				<div
					className={`mb-4 p-4 ${
						message.includes("succès")
							? "bg-green-200 text-green-800"
							: "bg-red-200 text-red-800"
					} rounded`}
				>
					{message}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="nom"
					>
						Nom de l'Équipe
					</label>
					<input
						id="nom"
						type="text"
						value={nom}
						onChange={(e) => setNom(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="logoUrl"
					>
						URL du Logo
					</label>
					<input
						id="logoUrl"
						type="text"
						value={logoUrl}
						onChange={(e) => setLogoUrl(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="type"
					>
						Type
					</label>
					<select
						id="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="club">Club</option>
						<option value="equipe-nationale">Équipe Nationale</option>
						<option value="locaux">Locaux</option>
						<option value="lifestyle">Lifestyle</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Ajouter
				</button>
			</form>

			{/* Liste des équipes */}
			<ListerEquipes />
		</div>
	);
}
