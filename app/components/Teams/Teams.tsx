// components/Teams.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

interface Team {
	id: number;
	nom: string;
	logoUrl: string;
	type: string;
}

export default function Teams() {
	const [teams, setTeams] = useState<Team[]>([]);

	useEffect(() => {
		const fetchTeams = async () => {
			const response = await fetch("http://localhost:3000/equipes");
			if (response.ok) {
				const data = await response.json();
				setTeams(data);
			}
		};

		fetchTeams();
	}, []);

	return (
		<div className="flex flex-wrap justify-center w-full ">
			{teams.map((team) => (
				<Link key={team.id} href={`/maillots/${team.id}`} className="h-60">
					<div className="relative m-4 w-58 h-60 bg-white shadow-md rounded-lg overflow-hidden group cursor-pointer">
						<img
							src={team.logoUrl}
							alt={team.nom}
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<h3 className="text-white text-center text-lg font-bold">
								{team.nom}
							</h3>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
