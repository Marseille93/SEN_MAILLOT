import { useEffect, useState } from "react";

interface Category {
	id: string;
	nom: string;
}

interface Team {
	id: string;
	nom: string;
}

const AjouterMaillot: React.FC = () => {
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [equipeId, setEquipeId] = useState("");
	const [stockS, setStockS] = useState<number>(0);
	const [stockM, setStockM] = useState<number>(0);
	const [stockXL, setStockXL] = useState<number>(0);
	const [categories, setCategories] = useState<Category[]>([]);
	const [equipes, setEquipes] = useState<Team[]>([]);
	const [imageUrls, setImageUrls] = useState<string[]>([""]);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// Récupérer les catégories depuis l'API
	useEffect(() => {
		fetch("http://localhost:3000/categories")
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) =>
				console.error("Erreur lors de la récupération des catégories", err)
			);
	}, []);

	// Récupérer les équipes depuis l'API
	useEffect(() => {
		fetch("http://localhost:3000/equipes")
			.then((res) => res.json())
			.then((data) => setEquipes(data))
			.catch((err) =>
				console.error("Erreur lors de la récupération des équipes", err)
			);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");
		setSuccessMessage("");
		// Vérification des champs obligatoires
		if (!nom || !description || !price || !categoryId || !equipeId) {
			setErrorMessage("Veuillez remplir tous les champs obligatoires.");
			setIsLoading(false);
			return;
		}
		// Appel API pour créer un maillot
		try {
			const response = await fetch("http://localhost:3000/maillots", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nom,
					description,
					price: parseFloat(price),
					categoryId,
					equipeId,
				}),
			});

			if (response.ok) {
				const maillot = await response.json();
				const maillotId = maillot.id;

				// Envoyer les URLs d'images
				for (const url of imageUrls) {
					if (url) {
						await fetch("http://localhost:3000/pictures", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								url,
								maillotId: maillotId,
							}),
						});
					}
				}

				// Envoyer les tailles de maillot une par une
				const sizes = [
					{ size: "S", stock: stockS },
					{ size: "M", stock: stockM },
					{ size: "XL", stock: stockXL },
				];

				for (const size of sizes) {
					if (size.stock >= 0) {
						// Envoyer seulement si le stock est supérieur à 0
						await fetch("http://localhost:3000/jersey-sizes", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								size: size.size,
								stock: size.stock,
								maillotId: maillotId,
							}),
						});
					}
				}
			}
			setNom("");
			setDescription("");
			setPrice("");
			setCategoryId("");
			setEquipeId("");
			setStockS(0);
			setStockM(0);
			setStockXL(0);
			setImageUrls([""]);
			setSuccessMessage("Le maillot a été ajouté avec succès !");
		} catch (error) {
			setErrorMessage("Une erreur est survenue lors de l'ajout du maillot.");
		} finally {
			setIsLoading(false); // Désactiver le loader après soumission
		}
	};

	// Gérer l'ajout d'un nouveau champ URL d'image
	const ajouterImageUrl = () => {
		setImageUrls([...imageUrls, ""]);
	};

	// Mettre à jour l'URL d'image dans le tableau
	const handleImageUrlChange = (index: number, value: string) => {
		const newImageUrls = [...imageUrls];
		newImageUrls[index] = value;
		setImageUrls(newImageUrls);
	};
	useEffect(() => {
		if (errorMessage) {
			// Définir un timer pour effacer le message d'erreur après 30 secondes
			const timer = setTimeout(() => {
				setErrorMessage("");
			}, 30000);

			// Nettoyer le timer si l'utilisateur change la page ou si le composant est démonté
			return () => clearTimeout(timer);
		}
	}, [errorMessage]);
	useEffect(() => {
		if (successMessage) {
			// Définir un timer pour effacer le message de succès après 30 secondes
			const timer = setTimeout(() => {
				setSuccessMessage("");
			}, 30000);

			// Nettoyer le timer si l'utilisateur change la page ou si le composant est démonté
			return () => clearTimeout(timer);
		}
	}, [successMessage]);
	const Loader = () => (
		<div className="absolute min-h-screen inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
		</div>
	);

	return (
		<div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md overflow-auto max-h-[calc(100vh-20px)]">
			{isLoading && <Loader />}
			<div className="max-w-2xl mx-auto pt-6">
				{" "}
				{/* Ajout de l'espace en haut avec pt-6 */}
				<h1 className="text-2xl font-bold mb-6 text-center">
					Ajouter un nouveau Maillot
				</h1>
				{/* Affichage du message d'erreur */}
				{errorMessage && (
					<div className="mb-4 p-4 bg-red-500 text-white rounded-md">
						{errorMessage}
					</div>
				)}
				{/* Affichage du message de succès */}
				{successMessage && (
					<div className="mb-4 p-4 bg-green-500 text-white rounded-md">
						{successMessage}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					{/* Champ Nom */}
					<div className="mb-4">
						<label className="block text-gray-700">Nom:</label>
						<input
							type="text"
							value={nom}
							onChange={(e) => setNom(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
						/>
					</div>

					{/* Champ Description */}
					<div className="mb-4">
						<label className="block text-gray-700">Description:</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
							rows={3}
						></textarea>
					</div>

					{/* Champ Prix */}
					<div className="mb-4">
						<label className="block text-gray-700">Prix:</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
						/>
					</div>

					{/* Sélecteur de Catégorie */}
					<div className="mb-4">
						<label className="block text-gray-700">Catégorie:</label>
						<select
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
						>
							<option value="">Sélectionner une catégorie</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.nom}
								</option>
							))}
						</select>
					</div>

					{/* Sélecteur d'Équipe */}
					<div className="mb-4">
						<label className="block text-gray-700">Équipe:</label>
						<select
							value={equipeId}
							onChange={(e) => setEquipeId(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
						>
							<option value="">Sélectionner une équipe</option>
							{equipes.map((equipe) => (
								<option key={equipe.id} value={equipe.id}>
									{equipe.nom}
								</option>
							))}
						</select>
					</div>

					{/* Quantités en Stock */}
					<div className="mb-4 grid grid-cols-3 gap-4">
						<div>
							<label className="block text-gray-700">Stock Taille S:</label>
							<input
								type="number"
								value={stockS}
								onChange={(e) => setStockS(Number(e.target.value))}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700">Stock Taille M:</label>
							<input
								type="number"
								value={stockM}
								onChange={(e) => setStockM(Number(e.target.value))}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700">Stock Taille XL:</label>
							<input
								type="number"
								value={stockXL}
								onChange={(e) => setStockXL(Number(e.target.value))}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
							/>
						</div>
					</div>

					{/* Champ pour les Images */}
					<div>
						<label>Images (URLs):</label>
						{imageUrls.map((url, index) => (
							<div key={index} className="flex space-x-2">
								<input
									value={url}
									onChange={(e) => handleImageUrlChange(index, e.target.value)}
									className="w-full px-4 py-2 border rounded-md"
								/>
							</div>
						))}
						<button
							type="button"
							onClick={ajouterImageUrl}
							className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
						>
							Ajouter un autre URL d'image
						</button>
					</div>

					{/* Bouton de Soumission */}
					<button
						type="submit"
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
					>
						Ajouter le Maillot
					</button>
				</form>
			</div>
		</div>
	);
};

export default AjouterMaillot;
