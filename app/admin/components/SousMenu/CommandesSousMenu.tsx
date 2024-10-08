import { FC } from "react";

// Typage pour la fonction de changement de menu
type CommandesSousMenuProps = {
	onMenuChange: (menu: "En cours" | "Livré") => void;
};

const CommandesSousMenu: FC<CommandesSousMenuProps> = ({ onMenuChange }) => {
	return (
		<div className="flex justify-center space-x-4 bg-white p-4 shadow-md">
			{/* Bouton pour afficher les commandes "En cours" */}
			<button
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				onClick={() => onMenuChange("En cours")}
			>
				Commandes en cours
			</button>

			{/* Bouton pour afficher les commandes "Livré" */}
			<button
				className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
				onClick={() => onMenuChange("Livré")}
			>
				Commandes livrées
			</button>
		</div>
	);
};

export default CommandesSousMenu;
