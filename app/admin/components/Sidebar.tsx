// app/admin/components/AdminNavBar.tsx
"use client"; // Client-side pour la navigation

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
	const pathname = usePathname();

	// Fonction pour vérifier si la route est active
	const isActive = (path: string) =>
		pathname === path ? "bg-slate-400 text-white" : "bg-slate-200";

	return (
		<nav className="flex flex-col items-center space-y-6 min-h-screen">
			<Link
				href="/admin"
				className={`p-4 rounded-lg w-52 mt-36 text-center ${isActive(
					"/admin"
				)}`}
			>
				Tableau de bord
			</Link>
			<Link
				href="/admin/comptes"
				className={`p-4 rounded-lg w-52 text-center ${isActive(
					"/admin/comptes"
				)}`}
			>
				Gestion des utilisateurs
			</Link>
			<Link
				href="/admin/products"
				className={`p-4 rounded-lg w-52 text-center ${isActive(
					"/admin/products"
				)}`}
			>
				Gestion des produits
			</Link>
			<Link
				href="/admin/commandes"
				className={`p-4 rounded-lg w-52 text-center ${isActive(
					"/admin/commandes"
				)}`}
			>
				Commandes
			</Link>
			<Link
				href="/admin/stats"
				className={`p-4 rounded-lg w-52 text-center ${isActive(
					"/admin/stats"
				)}`}
			>
				Statistiques
			</Link>
		</nav>
	);
}
