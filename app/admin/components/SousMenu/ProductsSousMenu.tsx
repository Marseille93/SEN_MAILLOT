// Définition des types pour les props
interface ProductsSousMenuProps {
	onMenuChange: (
		menu: "Lister" | "Ajouter Maillot" | "Ajouter Equipe" | "Ajouter Catégorie"
	) => void;
}

const ProductsSousMenu: React.FC<ProductsSousMenuProps> = ({
	onMenuChange,
}) => {
	return (
		<div className="w-11/12 bg-white border border-black mt-6 h-16 rounded-2xl shadow-lg z-50">
			<header className="w-full">
				<div className="navbar h-16 font-bold flex items-center justify-between">
					<div>
						<h1 className="text-xl ml-7">Gestion des Produits</h1>
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
								onClick={() => onMenuChange("Ajouter Maillot")}
							>
								Ajouter Maillot
							</li>
							<li
								className="m-6 hover:underline cursor-pointer"
								onClick={() => onMenuChange("Ajouter Equipe")}
							>
								Ajouter Equipe
							</li>
							<li
								className="m-6 hover:underline cursor-pointer"
								onClick={() => onMenuChange("Ajouter Catégorie")}
							>
								Ajouter Catégorie
							</li>
						</ul>
					</div>
				</div>
			</header>
		</div>
	);
};

export default ProductsSousMenu;
