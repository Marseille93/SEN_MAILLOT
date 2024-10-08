import { useState, useEffect } from "react";

// Typage de l'utilisateur
interface User {
	id: number;
	nomComplet: string;
	email: string;
	telephone: string;
	naissance: string;
	role: string;
}

export default function ListerUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Appel à l'API pour récupérer la liste des utilisateurs
		fetch("http://localhost:3000/users")
			.then((response) => response.json())
			.then((data) => {
				// Trier les utilisateurs pour afficher les admins en premier
				const sortedUsers = data.sort((a: User, b: User) => {
					// Admins en haut, tri alphabétique par nom ensuite
					if (a.role === "admin" && b.role !== "admin") {
						return -1; // A vient avant B
					} else if (a.role !== "admin" && b.role === "admin") {
						return 1; // B vient avant A
					}
					// Sinon, trier par nom complet
					return a.nomComplet.localeCompare(b.nomComplet);
				});
				setUsers(sortedUsers);
			})
			.catch((err) => {
				console.error("Erreur lors du chargement des utilisateurs:", err);
				setError("Erreur lors du chargement des utilisateurs.");
			});
	}, []);

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div className="p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-6">Liste des Utilisateurs</h2>

			{users.length === 0 ? (
				<p className="text-gray-500">Aucun utilisateur trouvé.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-200">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-3 px-6 text-left">Nom Complet</th>
								<th className="py-3 px-6 text-left">Email</th>
								<th className="py-3 px-6 text-left">Téléphone</th>
								<th className="py-3 px-6 text-left">Date de Naissance</th>
								<th className="py-3 px-6 text-left">Rôle</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id} className="border-t border-gray-200">
									<td className="py-3 px-6">{user.nomComplet}</td>
									<td className="py-3 px-6">{user.email}</td>
									<td className="py-3 px-6">{user.telephone}</td>
									<td className="py-3 px-6">
										{new Date(user.naissance).toLocaleDateString()}
									</td>
									<td className="py-3 px-6 capitalize">{user.role}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
