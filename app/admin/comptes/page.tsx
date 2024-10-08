"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import UsersSousMenu from "../components/SousMenu/UsersSousMenu";
import ListerUsers from "../components/users/ListerUsers";
import AjouterAdmin from "../components/users/AjouterAdmin";

// Typage des valeurs possibles pour le menu
type MenuOption = "Lister" | "Ajouter Admin";

export default function Users() {
	const [selectedMenu, setSelectedMenu] = useState<MenuOption>("Lister");

	// Fonction de rendu conditionnel en fonction du menu sélectionné
	const renderContent = () => {
		switch (selectedMenu) {
			case "Lister":
				return <ListerUsers />;
			case "Ajouter Admin":
				return <AjouterAdmin />;
			default:
				return <ListerUsers />;
		}
	};

	return (
		<div className="bg-gray-50 flex min-h-screen">
			<div className="w-1/6 min-h-screen">
				<Sidebar />
			</div>

			<div className="w-5/6 min-h-screen flex flex-col">
				<UsersSousMenu onMenuChange={setSelectedMenu} />

				{/* Conteneur du contenu */}
				<div className="flex-1 overflow-auto mt-6 mx-4 rounded-xl shadow-lg bg-white">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}
