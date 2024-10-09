"use client";
import { useEffect, useState } from "react";

const StatsDashboard = () => {
	const [commandesNonLivrees, setCommandesNonLivrees] = useState<number>(0);
	const [commandesLivrees, setCommandesLivrees] = useState<number>(0);
	const [utilisateurs, setUtilisateurs] = useState<number>(0);

	const fetchData = async () => {
		try {
			const [commandesResponse, utilisateursResponse] = await Promise.all([
				fetch("http://localhost:3000/commandes"),
				fetch("http://localhost:3000/users"),
			]);

			const commandesData = await commandesResponse.json();
			const currentMonth = new Date().getMonth();
			const currentYear = new Date().getFullYear();

			// Compte des commandes livrées et non livrées
			let livreesCount = 0;
			let nonLivreesCount = 0;

			commandesData.forEach((commande) => {
				const commandeDate = new Date(commande.dateCom);
				const isCurrentMonth =
					commandeDate.getMonth() === currentMonth &&
					commandeDate.getFullYear() === currentYear;

				if (isCurrentMonth) {
					if (commande.etat === "livré") {
						livreesCount++;
					} else if (commande.etat === "En attente") {
						nonLivreesCount++;
					}
				}
			});

			setCommandesLivrees(livreesCount);
			setCommandesNonLivrees(nonLivreesCount);

			const utilisateursData = await utilisateursResponse.json();
			setUtilisateurs(utilisateursData.length); // Supposant que vous recevez un tableau d'utilisateurs
		} catch (error) {
			console.error("Erreur lors de la récupération des données :", error);
		}
	};

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(fetchData, 5000); // Mise à jour toutes les 5 secondes

		return () => clearInterval(intervalId); // Nettoyage de l'intervalle
	}, []);

	return (
		<div className="flex space-x-16 mt-20">
			<div className="w-56 h-28 border border-black">
				<div className="text-center font-semibold">Maillot vendus ce mois</div>
				<div className="text-center font-semibold w-full h-full text-7xl text-green-700">
					{commandesLivrees}
				</div>
			</div>
			<div className="w-56 h-28 border border-black">
				<div className="text-center font-semibold">Commandes en cours</div>
				<div className="text-center font-semibold w-full h-full text-7xl text-red-700">
					{commandesNonLivrees}
				</div>
			</div>
			<div className="w-56 h-28 border border-black">
				<div className="text-center font-semibold">Utilisateurs</div>
				<div className="text-center font-semibold w-full h-full text-7xl">
					{utilisateurs}
				</div>
			</div>
		</div>
	);
};

export default StatsDashboard;
