"use client";
import React, { useEffect, useState } from "react";

type JerseySize = {
	id: number;
	size: string;
	stock: number;
};

type Maillot = {
	id: number;
	nom: string;
	description: string;
	price: string;
	jerseySizes: JerseySize[];
};

const RuptureStock: React.FC = () => {
	const [maillots, setMaillots] = useState<Maillot[]>([]);

	useEffect(() => {
		const fetchMaillots = async () => {
			const response = await fetch("http://localhost:3000/maillots");
			const data: Maillot[] = await response.json();
			setMaillots(data);
		};

		fetchMaillots();
	}, []);

	const maillotsEnRupture = maillots.filter((maillot) =>
		maillot.jerseySizes.some((size) => size.stock < 7)
	);

	return (
		<div className="container mx-auto p-6 bg-gradient-to-r from-gray-400 to-slate-300 rounded-lg shadow-xl">
			<h2 className="text-3xl font-bold text-white mb-6 text-center">
				Maillots en Rupture de Stock
			</h2>
			<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="py-3 px-6 text-left">Nom</th>
						<th className="py-3 px-6 text-left">Prix</th>
						<th className="py-3 px-6 text-left">Tailles en Rupture</th>
					</tr>
				</thead>
				<tbody>
					{maillotsEnRupture.length > 0 ? (
						maillotsEnRupture.map((maillot) => (
							<tr
								key={maillot.id}
								className="hover:bg-gray-100 transition duration-300"
							>
								<td className="py-4 px-6 border-b border-gray-200 font-semibold text-gray-800">
									{maillot.nom}
								</td>
								<td className="py-4 px-6 border-b border-gray-200 text-gray-600">
									{maillot.price} FCFA
								</td>
								<td className="py-4 px-6 border-b border-gray-200">
									<ul className="list-disc pl-5">
										{maillot.jerseySizes
											.filter((size) => size.stock < 7)
											.map((size) => (
												<li key={size.id} className="text-gray-600">
													{size.size} (Stock: {size.stock})
												</li>
											))}
									</ul>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3} className="py-4 text-center text-gray-600">
								Aucun maillot en rupture de stock.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default RuptureStock;
