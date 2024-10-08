"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Typage du panier
interface CartItem {
	name: string;
	price: number;
	size: string;
	quantity: number;
	flocage: {
		playerName: string;
		playerNumber: string;
	} | null;
	id: number;
}

// Fonction principale du composant Panier
const Panier: React.FC = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [userId, setUserId] = useState<number | null>(null); // ID utilisateur
	const router = useRouter();

	// Récupérer le panier du localStorage à l'initialisation
	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		const storedUser = localStorage.getItem("userId"); // ID de l'utilisateur
		if (storedCart) {
			const cart = JSON.parse(storedCart);
			setCartItems(cart);
		}
		if (storedUser) {
			setUserId(JSON.parse(storedUser)); // Assume that user is stored as a JSON string
		}
	}, []);

	// Fonction pour supprimer un article du panier et du localStorage
	const removeFromCart = (index: number) => {
		const updatedCartItems = [...cartItems];
		updatedCartItems.splice(index, 1);
		setCartItems(updatedCartItems);
		localStorage.setItem("cart", JSON.stringify(updatedCartItems));
	};

	const handleCheckout = async () => {
		if (!userId) {
			// Rediriger vers la page de connexion avec un message
			router.push("/login?message=Veuillez vous connecter avant de commander.");
			return;
		}

		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0"); // Ajoute 1 car getMonth() retourne les mois de 0 à 11
		const day = String(today.getDate()).padStart(2, "0"); // S'assure d'avoir deux chiffres pour le jour

		const formattedDate = `${year}-${month}-${day}`;
		const totalPrice = cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		); // Calcul du prix total

		// Créer la commande
		const commande = {
			dateCom: formattedDate,
			etat: "En attente", // État par défaut
			price: totalPrice,
			userId: userId,
		};

		try {
			// Envoi de la commande à l'API
			const response = await fetch("http://localhost:3000/commandes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(commande),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la création de la commande.");
			}

			const createdCommande = await response.json(); // Récupérer la commande créée
			const commandeId = createdCommande.id; // Assurez-vous que l'ID est bien retourné

			// Maintenant, insérer chaque produit dans commande-produits
			for (const item of cartItems) {
				const commandeProduit = {
					commandeId: commandeId, // ID de la commande créée
					maillotId: item.id, // ID du maillot
					taille: item.size,
					quantite: item.quantity,
					playerName: item.flocage?.playerName || "",
					playerNumber: item.flocage?.playerNumber || "",
				};

				// Envoi de chaque produit à l'API
				const produitResponse = await fetch(
					"http://localhost:3000/commande-produits",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(commandeProduit),
					}
				);

				if (!produitResponse.ok) {
					throw new Error(`Erreur lors de l'ajout du produit ${item.name}.`);
				}
			}

			alert("Commande effectuée avec succès !");
			setCartItems([]); // Vider le panier après succès
			localStorage.removeItem("cart"); // Supprimer le panier du localStorage
		} catch (error) {
			console.error(error);
			alert("Une erreur est survenue lors de la commande. Veuillez réessayer.");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Votre Panier</h1>

			{cartItems.length === 0 ? (
				<p>Votre panier est vide.</p>
			) : (
				<div className="space-y-4">
					{cartItems.map((item, index) => (
						<div
							key={index}
							className="p-4 border border-gray-200 rounded-lg shadow-md"
						>
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-semibold">{item.name}</h2>
								<button
									className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
									onClick={() => removeFromCart(index)}
								>
									Supprimer
								</button>
							</div>
							<p>Taille : {item.size}</p>
							<p>Quantité : {item.quantity}</p>
							<p>Prix unitaire : {item.price.toFixed(2)} FCFA</p>

							{item.flocage && (
								<div className="mt-2">
									<p>
										<span className="font-semibold">Flocage</span> :{" "}
										{item.flocage.playerName} ({item.flocage.playerNumber})
									</p>
								</div>
							)}

							<p className="mt-2 font-bold">
								Total : {(item.price * item.quantity).toFixed(2)} FCFA
							</p>
						</div>
					))}

					<div className="mt-4">
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={handleCheckout}
						>
							Passer au paiement
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Panier;
