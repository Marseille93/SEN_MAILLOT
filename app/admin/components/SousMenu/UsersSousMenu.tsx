// Définition des types pour les props
interface UsersSousMenuProps {
	onMenuChange: (menu: "Lister" | "Ajouter Admin") => void;
}

const UsersSousMenu: React.FC<UsersSousMenuProps> = ({ onMenuChange }) => {
	return (
		<div className="w-11/12 bg-white border border-black mt-6 h-16 rounded-2xl shadow-lg z-50">
			<header className="w-full">
				<div className="navbar h-16 font-bold flex items-center justify-between">
					<div>
						<h1 className="text-xl ml-7">Gestion des Utilisateurs</h1>
					</div>

					<div>
						<ul className="flex">
							<li
								className="m-6 hover:underline cursor-pointer"
								onClick={() => onMenuChange("Lister")}
							>
								Lister
							</li>
							<li
								className="m-6 hover:underline cursor-pointer"
								onClick={() => onMenuChange("Ajouter Admin")}
							>
								Ajouter Admin
							</li>
						</ul>
					</div>
				</div>
			</header>
		</div>
	);
};

export default UsersSousMenu;
