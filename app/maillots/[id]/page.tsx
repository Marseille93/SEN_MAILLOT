// app/maillots/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Modifié
import Link from "next/link";

interface Maillot {
	id: number;
	nom: string;
	description: string;
	price: string;
	pictures: { id: number; url: string }[];
}

export default function TeamMaillots() {
	const { id } = useParams(); // Récupérez l'ID de l'équipe depuis les paramètres de l'URL
	const [maillots, setMaillots] = useState<Maillot[]>([]);

	useEffect(() => {
		if (id) {
			const fetchMaillots = async () => {
				const response = await fetch(
					`http://localhost:3000/maillots/team/${id}`
				);
				if (response.ok) {
					const data: Maillot[] = await response.json();
					setMaillots(data);
				}
			};

			fetchMaillots();
		}
	}, [id]);

	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-4">Maillots de l'équipe {id}</h1>
			<div className="flex justify-around flex-wrap gap-6">
				{maillots.map((maillot) => (
					<div
						key={maillot.id}
						className="relative card bg-white w-96 h-1/2 shadow-lg rounded-lg overflow-hidden"
					>
						{/* Image avec animation */}
						<figure className="rounded-t-lg overflow-hidden h-full">
							<img
								src={
									maillot.pictures && maillot.pictures.length > 0
										? maillot.pictures[0].url
										: "/default-image.jpg"
								}
								alt={maillot.nom}
								className="w-full h-full object-cover transition duration-300 hover:brightness-50"
							/>
						</figure>
						{/* Contenu affiché au survol */}
						<div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
							<h2 className="text-xl font-bold text-white mb-2">
								{maillot.nom}
							</h2>
							<span className="text-lg font-semibold text-white mb-4">
								{maillot.price} FCFA
							</span>
							<Link
								href={`../../DetailMaillot/${maillot.id}`}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
							>
								Voir Détail
							</Link>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
