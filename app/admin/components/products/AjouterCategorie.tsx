import { useState, useEffect } from "react";

interface Category {
	id: string;
	nom: string;
}

export default function AjouterCategorie() {
	const [nom, setNom] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Charger les catégories au démarrage du composant
		fetch("http://localhost:3000/categories")
			.then((response) => response.json())
			.then((data) => setCategories(data))
			.catch((error) => {
				console.error("Erreur lors de la récupération des catégories:", error);
			});
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!nom.trim()) {
			setError("Le nom de la catégorie ne peut pas être vide.");
			return;
		}
		const category = { nom };
		fetch("http://localhost:3000/categories", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(category),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Erreur lors de l'ajout de la catégorie.");
			})
			.then((data) => {
				setCategories([...categories, data]);
				setMessage("Catégorie ajoutée avec succès !");
				setNom("");
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const handleDelete = (id: string) => {
		fetch(`http://localhost:3000/categories/${id}`, {
			method: "DELETE",
		})
			.then(() =>
				setCategories(categories.filter((category) => category.id !== id))
			)
			.catch((error) => {
				console.error("Erreur lors de la suppression de la catégorie:", error);
			});
	};

	const handleEdit = (id: string) => {
		// Vous pouvez implémenter la logique pour modifier la catégorie ici
		console.log("Modifier la catégorie avec ID:", id);
	};

	return (
		<div className="p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-6">Ajouter une Catégorie</h2>
			{message && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
					<strong className="font-bold">Succès !</strong>
					<span className="block sm:inline">{message}</span>
				</div>
			)}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
					<strong className="font-bold">Erreur !</strong>
					<span className="block sm:inline">{error}</span>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="nom"
					>
						Nom de la Catégorie
					</label>
					<input
						id="nom"
						type="text"
						value={nom}
						onChange={(e) => setNom(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Ajouter
				</button>
			</form>
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Liste des Catégories</h2>
				<table className="min-w-full divide-y divide-gray-200">
					<tbody className="bg-white divide-y divide-gray-200">
						{categories.map((category) => (
							<tr key={category.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{category.nom}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										onClick={() => handleEdit(category.id)}
										className="text-blue-600 hover:text-blue-900 mr-4"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 inline"
											viewBox="0 0 24 24"
											fill="currentColor"
											stroke="currentColor"
										>
											<path d="M3 17.25v3h3l10-10-3-3-10 10zM20.71 7.29a1 1 0 00-1.42 0l-2.29 2.29 3 3 2.29-2.29a1 1 0 000-1.42l-2.29-2.29z" />
										</svg>
									</button>
									<button
										onClick={() => handleDelete(category.id)}
										className="text-red-600 hover:text-red-900"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 inline"
											viewBox="0 0 24 24"
											fill="currentColor"
											stroke="currentColor"
										>
											<path d="M6 6v15a1 1 0 001 1h10a1 1 0 001-1V6M4 6h16M10 11v6M14 11v6" />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
