import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface JerseyCardProps {
	lastImageUrl: string;
	id: number;
}

interface JerseySize {
	id: number;
	size: string;
	stock: number;
}

const JerseyCard: React.FC<JerseyCardProps> = ({ lastImageUrl, id }) => {
	const router = useRouter();
	const [jerseyData, setJerseyData] = useState<{
		name: string;
		price: string;
		sizes: JerseySize[];
	}>({
		name: "",
		price: "",
		sizes: [],
	});
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [quantity, setQuantity] = useState<number>(1);
	const [isFlocage, setIsFlocage] = useState<boolean>(false);
	const [playerName, setPlayerName] = useState<string>("");
	const [playerNumber, setPlayerNumber] = useState<string>("");
	const [errors, setErrors] = useState<{
		nameError: string | null;
		numberError: string | null;
	}>({
		nameError: null,
		numberError: null,
	});

	useEffect(() => {
		const fetchJerseyData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/jersey-sizes?maillotId=${id}`
				);
				const data = await response.json();

				if (data.length > 0) {
					const firstJersey = data[0].maillot;
					setJerseyData({
						name: firstJersey.nom,
						price: firstJersey.price,
						sizes: data.filter((size: JerseySize) => size.stock > 0),
					});
				}
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			}
		};

		fetchJerseyData();
	}, [id]);

	const handleSizeClick = (size: string) => {
		setSelectedSize(size);
	};

	const handleAddToCart = () => {
		let hasErrors = false;

		// Validate playerName and playerNumber when "flocage" is selected
		if (isFlocage) {
			if (!/^[a-zA-Z]{1,10}$/.test(playerName)) {
				setErrors((prevErrors) => ({
					...prevErrors,
					nameError:
						"Le nom doit contenir uniquement des lettres (10 lettres max).",
				}));
				hasErrors = true;
			} else {
				setErrors((prevErrors) => ({ ...prevErrors, nameError: null }));
			}

			if (!/^\d{1,2}$/.test(playerNumber)) {
				setErrors((prevErrors) => ({
					...prevErrors,
					numberError:
						"Le numéro doit contenir uniquement des chiffres (2 chiffres max).",
				}));
				hasErrors = true;
			} else {
				setErrors((prevErrors) => ({ ...prevErrors, numberError: null }));
			}
		}

		// Proceed only if no errors and size is selected
		if (!hasErrors && selectedSize) {
			// Define the cart item structure
			const cartItem = {
				id, // Jersey ID
				name: jerseyData.name,
				price: parseInt(jerseyData.price),
				size: selectedSize,
				quantity,
				flocage: isFlocage ? { playerName, playerNumber } : null,
			};

			// Fetch the current cart from localStorage
			const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

			// Check if this item (same jersey, same size, same customization) already exists in the cart
			const existingItemIndex = currentCart.findIndex(
				(item: any) =>
					item.id === id &&
					item.size === selectedSize &&
					JSON.stringify(item.flocage) === JSON.stringify(cartItem.flocage)
			);

			if (existingItemIndex > -1) {
				// Update the quantity if the item exists
				currentCart[existingItemIndex].quantity += quantity;
			} else {
				// Add the new item to the cart
				currentCart.push(cartItem);
			}

			// Save the updated cart back to localStorage
			localStorage.setItem("cart", JSON.stringify(currentCart));

			alert(`Panier mis à jour :\n${localStorage.getItem("cart")}`);
		}
	};

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-auto">
			<div className="md:flex">
				<div className="md:flex-shrink-0 h-96">
					<img
						className="h-full w-48 object-cover md:w-96"
						src={lastImageUrl}
						alt="Jersey image"
					/>
				</div>
				<div className="p-8">
					<h1 className="text-lg font-semibold">
						{jerseyData.name || "Loading..."}
					</h1>
					<div className="mt-4">
						<span className="text-sm font-semibold">Taille:</span>
						<div className="mt-1 flex space-x-2 text-sm">
							{jerseyData.sizes.map((size) => (
								<button
									key={size.id}
									className={`px-3 py-1 rounded-full focus:outline-none ${
										selectedSize === size.size
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-800"
									}`}
									onClick={() => handleSizeClick(size.size)}
								>
									{size.size}
								</button>
							))}
						</div>
					</div>
					<div className="mt-4">
						<label className="text-sm font-semibold">Quantité:</label>
						<input
							type="number"
							min="1"
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
							className="ml-2 w-16 border rounded px-2"
						/>
					</div>

					{/* Checkbox Flocage */}
					<div className="mt-4">
						<label className="inline-flex items-center">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600"
								checked={isFlocage}
								onChange={() => setIsFlocage(!isFlocage)}
							/>
							<span className="ml-2 text-sm font-semibold">
								Flocage disponible
							</span>
						</label>
					</div>

					{/* Champs Flocage */}
					{isFlocage && (
						<div className="mt-4">
							<div className="mb-4">
								<label className="text-sm font-semibold">Nom du joueur:</label>
								<input
									type="text"
									value={playerName}
									onChange={(e) => setPlayerName(e.target.value)}
									className="ml-2 w-full border rounded px-3 py-1"
									maxLength={10}
									pattern="[A-Za-z]*"
									placeholder="Entrez le nom (10 lettres max)"
								/>
								{errors.nameError && (
									<p className="text-red-500 text-sm">{errors.nameError}</p>
								)}
							</div>
							<div className="mb-4">
								<label className="text-sm font-semibold">Numéro:</label>
								<input
									type="number"
									value={playerNumber}
									onChange={(e) => setPlayerNumber(e.target.value)}
									className="ml-2 w-full border rounded px-3 py-1"
									maxLength={2}
									placeholder="Entrez le numéro (2 chiffres max)"
								/>
								{errors.numberError && (
									<p className="text-red-500 text-sm">{errors.numberError}</p>
								)}
							</div>
						</div>
					)}

					<div className="mt-4">
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={handleAddToCart}
						>
							Ajouter au Panier
						</button>
					</div>
					<div className="flex justify-between items-center mt-4 bg-slate-400 p-2 rounded">
						<span className="text-lg font-semibold">
							{jerseyData.price || "0,00 FCFA"} FCFA
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JerseyCard;
