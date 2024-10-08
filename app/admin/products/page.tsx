"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductsSousMenu from "../components/SousMenu/ProductsSousMenu";
import ListerProducts from "../components/products/ListerProducts";
import AjouterMaillot from "../components/products/AjouterMaillot";
import AjouterEquipe from "../components/products/AjouterEquipe";
import AjouterCategorie from "../components/products/AjouterCategorie";

// Typage des valeurs possibles pour le menu
type MenuOption =
	| "Lister"
	| "Ajouter Maillot"
	| "Ajouter Equipe"
	| "Ajouter Catégorie";

export default function Products() {
	const [selectedMenu, setSelectedMenu] = useState<MenuOption>("Lister");

	// Fonction de rendu conditionnel en fonction du menu sélectionné
	const renderContent = () => {
		switch (selectedMenu) {
			case "Lister":
				return <ListerProducts />;
			case "Ajouter Maillot":
				return <AjouterMaillot />;
			case "Ajouter Equipe":
				return <AjouterEquipe />;
			case "Ajouter Catégorie":
				return <AjouterCategorie />;
			default:
				return <ListerProducts />;
		}
	};

	return (
		<div className="bg-gray-50 flex min-h-screen">
			<div className="w-1/6 min-h-screen">
				<Sidebar />
			</div>

			<div className="w-5/6 min-h-screen flex flex-col">
				<ProductsSousMenu onMenuChange={setSelectedMenu} />

				{/* Conteneur du contenu */}
				<div className="flex-1 overflow-auto mt-6 mx-4 rounded-xl shadow-lg bg-white">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}
