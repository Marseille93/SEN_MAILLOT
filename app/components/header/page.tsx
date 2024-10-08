"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [showMenu, setShowMenu] = useState<boolean>(false); // Pour gérer l'affichage du sous-menu
	const router = useRouter();
	const pathname = usePathname(); // Obtenir le chemin actuel
	const menuRef = useRef<HTMLDivElement>(null); // Référence au sous-menu

	// Vérifie si l'utilisateur est connecté
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	// Gérer les clics à l'extérieur pour fermer le menu
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleAccountClick = () => {
		if (!isAuthenticated) {
			// Rediriger vers /login si l'utilisateur n'est pas connecté
			router.push(`/login?redirect=${pathname}`);
		} else {
			// Afficher ou masquer le sous-menu si l'utilisateur est connecté
			setShowMenu(!showMenu);
		}
	};

	const handleLogout = () => {
		// Déconnexion : suppression du token et mise à jour de l'état
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		setIsAuthenticated(false);
		setShowMenu(false);
		alert("Vous êtes bien déconnecté.");
		router.push("/"); // Rediriger vers la page d'accueil après déconnexion
	};

	return (
		<header className="fixed top-0 w-full text-white bg-gray-800 shadow-lg z-50">
			<div className="navbar h-16 flex items-center justify-between px-6">
				<button className="btn btn-ghost text-xl font-bold">
					<a href="https://github.com/Marseille93/mon-repo-developpement">
						Melentaan
					</a>
				</button>
				<div className="flex w-full justify-center space-x-8 text-lg font-bold">
					<Link href="/">Accueil</Link>
					<Link href="/NosProduits">Nos Produits</Link>
					<Link href="/Contacts">Locaux</Link>
					<Link href="/Contacts">Nationnaux</Link>
					<Link href="/Contacts">Europe</Link>
					<Link href="/Contacts">lifestyle</Link>
				</div>

				<div className="relative">
					<div
						className="btn btn-ghost text-xl flex items-center cursor-pointer"
						onClick={handleAccountClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
						<img src="../../../panier.png" alt="" />
					</div>

					{/* Sous-menu si l'utilisateur est connecté */}
					{isAuthenticated && showMenu && (
						<div
							ref={menuRef}
							className="absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg transition-opacity duration-300 opacity-100"
						>
							<ul className="py-2">
								<li className="px-4 py-2 hover:bg-gray-700 rounded-t-md">
									<Link href="/profile">Profil</Link>
								</li>
								<li
									className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-b-md"
									onClick={handleLogout}
								>
									Déconnexion
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
