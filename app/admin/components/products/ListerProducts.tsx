import { useEffect, useState } from "react";

interface Maillot {
	id: string;
	nom: string;
	description: string;
	price: number;
}

const ListerProducts: React.FC = () => {
	const [maillots, setMaillots] = useState<Maillot[]>([]);
	const [selectedMaillot, setSelectedMaillot] = useState<Maillot | null>(null);

	// Récupération des maillots lors du chargement de la page
	useEffect(() => {
		fetch("http://localhost:3000/maillots")
			.then((res) => res.json())
			.then((data) => setMaillots(data))
			.catch((err) => {
				console.error("Erreur lors de la récupération des maillots", err);
				window.alert("Erreur lors du chargement des maillots.");
			});
	}, []);

	// Gère la sélection d'un maillot
	const handleMaillotClick = (maillot: Maillot) => {
		setSelectedMaillot(maillot);
	};

	// Retour à la liste des maillots
	const handleBackToList = () => {
		setSelectedMaillot(null);
	};

	// Gère la suppression d'un maillot
	const handleDelete = (id: string) => {
		if (window.confirm("Voulez-vous vraiment supprimer ce maillot ?")) {
			fetch(`http://localhost:3000/maillots/${id}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error("Erreur lors de la suppression du maillot");
					}
					// Si suppression réussie, on met à jour la liste et on revient à la liste des maillots
					setMaillots((prevMaillots) =>
						prevMaillots.filter((maillot) => maillot.id !== id)
					);
					window.alert("Maillot supprimé avec succès.");
					setSelectedMaillot(null); // Retour à la liste
				})
				.catch((err) => {
					console.error(err);
					window.alert("Erreur lors de la suppression du maillot.");
				});
		}
	};

	return (
		<div className="p-6">
			{selectedMaillot ? (
				<div>
					<button
						onClick={handleBackToList}
						className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
					>
						Retour à la liste
					</button>
					<h2 className="text-2xl font-bold mb-4">Détails du Maillot</h2>
					<p className="text-gray-700 mb-4">
						<strong>Nom:</strong> {selectedMaillot.nom}
					</p>
					<p className="text-gray-700 mb-4">
						<strong>Description:</strong> {selectedMaillot.description}
					</p>
					<p className="text-gray-900 mb-6">
						<strong>Prix :</strong> {Number(selectedMaillot.price).toFixed(2)} €
					</p>
					<div className="flex space-x-4">
						<button className="px-4 py-2 bg-blue-500 text-white rounded-md">
							Modifier
						</button>
						<button
							onClick={() => handleDelete(selectedMaillot.id)}
							className="px-4 py-2 bg-red-500 text-white rounded-md"
						>
							Supprimer
						</button>
					</div>
				</div>
			) : (
				<div>
					<h2 className="text-2xl font-bold mb-4">Liste des Maillots</h2>
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Nom
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{maillots.map((maillot) => (
								<tr key={maillot.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{maillot.nom}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button
											onClick={() => handleMaillotClick(maillot)}
											className="text-blue-500 hover:text-blue-700"
										>
											<span className="sr-only">Voir les détails</span>
											👁️
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ListerProducts;
