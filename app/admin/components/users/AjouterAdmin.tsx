import { useState, FormEvent } from "react";

export default function AjouterAdmin() {
	// Déclaration des états pour chaque champ de l'entité
	const [nomComplet, setNomComplet] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [telephone, setTelephone] = useState<string>("");
	const [naissance, setNaissance] = useState<string>(""); // Stocke la date sous forme de chaîne
	const [message, setMessage] = useState<string>("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		// Création de l'objet contenant les données de l'administrateur
		const adminData = {
			nomComplet,
			email,
			telephone,
			naissance,
			role: "admin", // Le rôle est défini sur "admin"
		};

		// Envoyer la requête POST pour ajouter un administrateur
		fetch("http://localhost:3000/admins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adminData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Erreur lors de l'ajout de l'administrateur.");
				}
				return response.json();
			})
			.then(() => {
				setMessage("Administrateur ajouté avec succès !");
				// Réinitialiser les champs après l'ajout
				setNomComplet("");
				setEmail("");
				setTelephone("");
				setNaissance("");
			})
			.catch((error) => {
				console.error(error);
				setMessage("Erreur lors de l'ajout de l'administrateur.");
			});
	};

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-6">Ajouter un Administrateur</h2>

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
						htmlFor="nomComplet"
					>
						Nom Complet
					</label>
					<input
						id="nomComplet"
						type="text"
						value={nomComplet}
						onChange={(e) => setNomComplet(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="telephone"
					>
						Téléphone
					</label>
					<input
						id="telephone"
						type="text"
						value={telephone}
						onChange={(e) => setTelephone(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="naissance"
					>
						Date de Naissance
					</label>
					<input
						id="naissance"
						type="date"
						value={naissance}
						onChange={(e) => setNaissance(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Ajouter Admin
				</button>
			</form>
		</div>
	);
}
