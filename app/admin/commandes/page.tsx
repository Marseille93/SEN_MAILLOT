"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CommandesSousMenu from "../components/SousMenu/CommandesSousMenu";
import ListerCommandes from "../components/commandes/ListerCommandes";

// Typage des valeurs possibles pour le menu des commandes
type MenuOption = "En cours" | "Livré";

export default function Commandes() {
	// État pour suivre le menu sélectionné (En cours ou Livré)
	const [selectedMenu, setSelectedMenu] = useState<MenuOption>("En cours");

	// Fonction de rendu conditionnel pour afficher les commandes en fonction de leur état
	const renderContent = () => {
		switch (selectedMenu) {
			case "En cours":
				return <ListerCommandes etat="En cours" />;
			case "Livré":
				return <ListerCommandes etat="Livré" />;
			default:
				return <ListerCommandes etat="En cours" />;
		}
	};

	return (
		<div className="bg-gray-50 flex min-h-screen">
			{/* Barre latérale pour la navigation */}
			<div className="w-1/6 min-h-screen">
				<Sidebar />
			</div>

			{/* Conteneur principal */}
			<div className="w-5/6 min-h-screen flex flex-col">
				{/* Sous-menu pour choisir l'état des commandes */}
				<CommandesSousMenu onMenuChange={setSelectedMenu} />

				{/* Conteneur du contenu, qui change en fonction du menu sélectionné */}
				<div className="flex-1 overflow-auto mt-6 mx-4 rounded-xl shadow-lg bg-white p-4">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}
