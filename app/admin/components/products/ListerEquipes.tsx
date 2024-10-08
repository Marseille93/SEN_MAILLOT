import { useEffect, useState } from "react";

interface Equipe {
	id: string;
	nom: string;
	logoUrl: string;
	type: string;
}

const ListerEquipes: React.FC = () => {
	const [equipes, setEquipes] = useState<Equipe[]>([]);
	const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(null);

	useEffect(() => {
		fetch("http://localhost:3000/equipes")
			.then((res) => res.json())
			.then((data) => setEquipes(data))
			.catch((err) =>
				console.error("Erreur lors de la récupération des équipes", err)
			);
	}, []);

	const handleEdit = (id: string) => {
		console.log("Éditer l'équipe avec ID:", id);
	};

	const handleDelete = (id: string) => {
		fetch(`http://localhost:3000/equipes/${id}`, {
			method: "DELETE",
		})
			.then(() => setEquipes(equipes.filter((equipe) => equipe.id !== id)))
			.catch((err) =>
				console.error("Erreur lors de la suppression de l'équipe", err)
			);
	};

	const handleEquipeClick = (equipe: Equipe) => {
		setSelectedEquipe(equipe);
	};

	return (
		<div className="p-6 mt-12">
			{selectedEquipe ? (
				<div>
					<h2 className="text-2xl font-bold mb-4">{selectedEquipe.nom}</h2>
					<img
						src={selectedEquipe.logoUrl}
						alt={selectedEquipe.nom}
						className="mb-4 w-24 h-24 object-cover"
					/>
					<p className="text-gray-700 mb-4">
						Type: {selectedEquipe.type === "club" ? "Club" : "Équipe Nationale"}
					</p>
					<div className="flex space-x-4">
						<button
							onClick={() => handleEdit(selectedEquipe.id)}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Modifier
						</button>
						<button
							onClick={() => handleDelete(selectedEquipe.id)}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Supprimer
						</button>
					</div>
					<button
						onClick={() => setSelectedEquipe(null)}
						className="mt-4 text-gray-600 hover:text-gray-900"
					>
						Retour à la liste
					</button>
				</div>
			) : (
				<div>
					<h2 className="text-2xl font-bold mb-6">Liste des Équipes</h2>
					<table className="min-w-full divide-y divide-gray-200">
						<tbody className="bg-white divide-y divide-gray-200">
							{equipes.map((equipe) => (
								<tr key={equipe.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										<button
											onClick={() => handleEquipeClick(equipe)}
											className="text-blue-600 hover:text-blue-900"
										>
											{equipe.nom}
										</button>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button
											onClick={() => handleEdit(equipe.id)}
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
											onClick={() => handleDelete(equipe.id)}
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
			)}
		</div>
	);
};

export default ListerEquipes;
