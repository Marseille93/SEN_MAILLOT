// import { useEffect, useState } from "react";

// export default function ListeCommandes() {
// 	const [commandes, setCommandes] = useState<any[]>([]); // Typage simplifié
// 	const [message, setMessage] = useState<string>("");

// 	useEffect(() => {
// 		// Récupérer toutes les commandes
// 		fetch("http://localhost:3000/commandes")
// 			.then((res) => res.json())
// 			.then((data) => setCommandes(data))
// 			.catch((error) => console.error(error));
// 	}, []);

// 	// Mettre à jour l'état de la commande (Livré, Annulé, Remboursé)
// 	const handleUpdateEtat = (id: number, etat: string) => {
// 		fetch(`http://localhost:3000/commandes/${id}/etat`, {
// 			method: "PATCH",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ etat }),
// 		})
// 			.then(() => {
// 				setCommandes((prev) =>
// 					prev.map((commande) =>
// 						commande.id === id ? { ...commande, etat } : commande
// 					)
// 				);
// 				setMessage(`Commande ${id} mise à jour en ${etat}`);
// 			})
// 			.catch((error) => console.error(error));
// 	};

// 	// Supprimer une commande
// 	const handleDelete = (id: number) => {
// 		fetch(`http://localhost:3000/commandes/${id}`, {
// 			method: "DELETE",
// 		})
// 			.then(() => {
// 				setCommandes((prev) => prev.filter((com) => com.id !== id));
// 				setMessage(`Commande ${id} supprimée`);
// 			})
// 			.catch((error) => console.error(error));
// 	};

// 	return (
// 		<div className="p-6">
// 			<h2 className="text-2xl font-bold mb-6">Liste des Commandes</h2>

// 			{message && (
// 				<div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
// 					{message}
// 				</div>
// 			)}

// 			<table className="min-w-full bg-white border border-gray-300">
// 				<thead>
// 					<tr>
// 						<th className="py-2 px-4 border-b">Numéro</th>
// 						<th className="py-2 px-4 border-b">Client</th>
// 						<th className="py-2 px-4 border-b">Statut</th>
// 						<th className="py-2 px-4 border-b">Date</th>
// 						<th className="py-2 px-4 border-b">Montant</th>
// 						<th className="py-2 px-4 border-b">Actions</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{commandes.map((commande) => (
// 						<tr key={commande.id}>
// 							<td className="py-2 px-4 border-b">{commande.id}</td>
// 							<td className="py-2 px-4 border-b">
// 								{commande.users.nomComplet}
// 							</td>
// 							<td className="py-2 px-4 border-b">{commande.etat}</td>
// 							<td className="py-2 px-4 border-b">
// 								{new Date(commande.dateCom).toLocaleDateString()}
// 							</td>
// 							<td className="py-2 px-4 border-b">{commande.price}€</td>
// 							<td className="py-2 px-4 border-b">
// 								<button
// 									onClick={() => handleUpdateEtat(commande.id, "livré")}
// 									className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
// 								>
// 									Livré
// 								</button>
// 								<button
// 									onClick={() => handleUpdateEtat(commande.id, "annulé")}
// 									className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded ml-2"
// 								>
// 									Annulé
// 								</button>
// 								<button
// 									onClick={() => handleUpdateEtat(commande.id, "remboursé")}
// 									className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded ml-2"
// 								>
// 									Remboursé
// 								</button>
// 								<button
// 									onClick={() => handleDelete(commande.id)}
// 									className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded ml-2"
// 								>
// 									Supprimer
// 								</button>
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }

import { FC, useEffect, useState } from "react";

// Typage des commandes
type Commande = {
	id: number;
	dateCom: string;
	etat: string;
	price: number;
	quantite: number;
	prixUnitaire: number;
	playerName?: string;
	playerNumber?: string;
	taille: string;
	user: {
		id: number;
		nomComplet: string;
		email: string;
		telephone: string;
		naissance: string;
		role: string;
	};
	maillot: {
		id: number;
		nom: string;
		description: string;
		price: string;
	};
};

type ListerCommandesProps = {
	etat: "En cours" | "Livré";
};

const ListerCommandes: FC<ListerCommandesProps> = ({ etat }) => {
	const [commandes, setCommandes] = useState<Commande[]>([]);

	useEffect(() => {
		const fetchCommandes = async () => {
			const response = await fetch("http://localhost:3000/commandes");
			const data: Commande[] = await response.json();
			setCommandes(data.filter((commande) => commande.etat === etat));
		};

		fetchCommandes();
	}, [etat]);
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Commandes {etat}</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{commandes.length > 0 ? (
					commandes.map((commande) => (
						<div
							key={commande.id}
							className="bg-gray-100 p-4 rounded shadow-md"
						>
							<h3 className="font-bold text-lg">Commande #{commande.id}</h3>
							<p>Date: {new Date(commande.dateCom).toLocaleDateString()}</p>
							<p>Quantité: {commande.quantite}</p>
							<p>Prix total: {commande.price} FCFA</p>
							<p>Taille: {commande.taille}</p>
							<p>Client: {commande.user.nomComplet}</p>
							<p>Email: {commande.user.email}</p>
							<p>Téléphone: {commande.user.telephone}</p>
							<p>Maillot: {commande.maillot.nom}</p>
							<div className="btn"></div>
						</div>
					))
				) : (
					<p>Aucune commande {etat.toLowerCase()} pour l'instant.</p>
				)}
			</div>
		</div>
	);
};

export default ListerCommandes;
