// components/Products.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Définition des types
interface Picture {
	id: number;
	url: string;
}

interface Category {
	id: number;
	nom: string;
}

interface Team {
	id: number;
	nom: string;
	logoUrl: string;
	type: string;
}

interface Maillot {
	id: number;
	nom: string;
	description: string;
	price: string;
	categories: Category;
	equipes: Team;
	avis: any[];
	pictures: Picture[];
}

interface ProductsProps {
	filterTeamType?: string; // Prop pour filtrer par type d'équipe
}

export default function Products({ filterTeamType }: ProductsProps) {
	const [maillots, setMaillots] = useState<Maillot[]>([]);

	useEffect(() => {
		const fetchMaillots = async () => {
			try {
				const response = await fetch("http://localhost:3000/maillots");
				if (!response.ok) {
					throw new Error("Erreur lors de la récupération des maillots");
				}
				const data: Maillot[] = await response.json();
				setMaillots(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des maillots:", error);
			}
		};
		fetchMaillots();
	}, []);

	// Filtrer les maillots par type d'équipe si un filtre est fourni
	const filteredMaillots = filterTeamType
		? maillots.filter((maillot) => maillot.equipes.type === filterTeamType)
		: maillots;

	return (
		<div className="flex justify-around flex-wrap gap-6 p-8">
			{filteredMaillots.map((maillot) => (
				<div
					key={maillot.id}
					className="relative card bg-white w-72 h-96 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
				>
					<figure className="rounded-t-lg overflow-hidden">
						<img
							src={
								maillot.pictures && maillot.pictures.length > 0
									? maillot.pictures[maillot.pictures.length - 1].url
									: "/default-image.jpg"
							}
							alt={maillot.nom}
							className="w-full h-full object-cover"
						/>
					</figure>
					<div className="bg-slate-300 h-60">
						<h2 className="font-bold text-lg mx-2 text-zinc-900">
							{maillot.nom}
						</h2>
						<p className="text-lg font-medium mx-2">
							Prix: {maillot.price} FCFA
						</p>
						<div className="flex justify-center">
							<Link
								href={`../../DetailMaillot/${maillot.id}`}
								className="w-1/2 py-2 font-extrabold text-lg cursor-pointer bg-blue-600 text-white text-center rounded-lg shadow-lg hover:bg-blue-700 transition"
							>
								{`Détail`}
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
