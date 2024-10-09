import { FC, useEffect, useState } from "react";

// Typage des commandes
type Commande = {
	id: number;
	dateCom: string;
	etat: string;
	price: number;
	user: {
		id: number;
		nomComplet: string;
		email: string;
		telephone: string;
	};
	commandeProduits: {
		id: number;
		quantite: number;
		taille: string;
		playerName?: string;
		playerNumber?: string;
		maillot: {
			id: number;
			nom: string;
			description: string;
			price: string;
		};
	}[];
};

const ListerCommandes: FC = () => {
	const [commandes, setCommandes] = useState<Commande[]>([]);
	const [detailsCommandeId, setDetailsCommandeId] = useState<number | null>(
		null
	);
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		const fetchCommandes = async () => {
			const response = await fetch("http://localhost:3000/commandes");
			const data: Commande[] = await response.json();
			setCommandes(data);
		};

		fetchCommandes();
	}, []);

	const toggleDetails = (id: number) => {
		setDetailsCommandeId(detailsCommandeId === id ? null : id);
	};

	const handleUpdateEtat = async (id: number, etat: string) => {
		try {
			const response = await fetch(
				`http://localhost:3000/commandes/${id}/etat`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ etat }),
				}
			);

			if (!response.ok) {
				throw new Error("Échec de la mise à jour de l'état.");
			}

			const updatedCommande = await response.json();
			setCommandes((prev) =>
				prev.map((commande) =>
					commande.id === id ? updatedCommande : commande
				)
			);
			setMessage(`Commande #${id} : Livraison bien enrégistré`);
			setTimeout(() => {
				setMessage("");
			}, 5000);
		} catch (error) {
			setMessage(`Erreur livraison non enrégistré`);
			setTimeout(() => {
				setMessage("");
			}, 5000);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Commandes</h2>

			{message && (
				<div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
					{message}
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{commandes.length > 0 ? (
					commandes.map((commande) => (
						<div
							key={commande.id}
							className="bg-gray-100 p-4 rounded shadow-md"
						>
							<h3 className="font-bold text-lg">Commande #{commande.id}</h3>
							<p>Date: {new Date(commande.dateCom).toLocaleDateString()}</p>
							<p>Prix total: {commande.price} FCFA</p>
							<p>Client: {commande.user.nomComplet}</p>

							<button
								onClick={() => handleUpdateEtat(commande.id, "livré")}
								className="mt-2 bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
							>
								Livré
							</button>

							<button
								onClick={() => toggleDetails(commande.id)}
								className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
							>
								Détails
							</button>

							{detailsCommandeId === commande.id && (
								<div className="mt-2 p-2 border border-gray-300 rounded">
									<h4 className="font-bold">Détails de la commande :</h4>
									<ul>
										{commande.commandeProduits.map((produit) => (
											<li key={produit.id}>
												{produit.quantite}x {produit.maillot.nom} (
												{produit.taille}) - {produit.maillot.price} FCFA
												{produit.playerName &&
													` - Joueur: ${produit.playerName} (#${produit.playerNumber})`}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))
				) : (
					<p>Aucune commande pour l'instant.</p>
				)}
			</div>
		</div>
	);
};

export default ListerCommandes;
