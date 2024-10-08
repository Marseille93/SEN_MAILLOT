"use client";
// Importer Swiper et ses styles
import Link from "next/link";
import Header from "./components/header/page";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Products from "./components/Products/page";
import Teams from "./components/Teams/Teams";
export default function Home() {
	const image = [
		{
			id: 2,
			photo:
				"https://cdn.media.amplience.net/i/ArsenalDirect/Sterling_EU_2000x1150_V2?$webp-image__100-width--desktop$",
		},
		{
			id: 3,
			photo:
				"https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2Fgenerico.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=750&q=75",
		},
		{
			id: 4,
			photo: "https://imagizer.imageshack.com/img924/9458/MTKT3U.png",
		},
	];
	return (
		<main className="bg-slate-50 ">
			<Header />
			{/* <div
				className="hero h-lvh"
				style={{
					backgroundImage:
						"url(https://www.om.fr/sites/default/files/2024-06/UNE%20PRIO%20ABO%202425.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold text-slate-100">
							MARSEILLAIS
						</h1>
						<p className="mb-5 text-slate-100">
							Ici le site de vente de maillot de l'OM basé au SENEGAL <br />A
							JAMAIS LES PREMIERS
						</p>
						<Link className="btn btn-primary" href="./NosProduits">
							Voir Nos Produits
						</Link>
					</div>
				</div>
			</div> */}
			<div className="h-screen ">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: false,
					}}
					navigation={false}
					modules={[Autoplay, Pagination, Navigation]}
					className="mySwiper w-full h-5/6 mt-16"
				>
					{image.map((img) => (
						<SwiperSlide key={img.id}>
							<a href="https://example.com">
								<div
									className="relative bg-cover bg-center h-full"
									style={{ backgroundImage: `url(${img.photo})` }}
								>
									<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-start">
										<h2 className="text-white text-2xl font-bold ml-36">
											Texte {img.id}
										</h2>
									</div>
								</div>
							</a>
						</SwiperSlide>
					))}
				</Swiper>
				{/* Texte centré avec des traits à gauche et à droite */}
				<div className="flex items-center justify-center mt-10">
					<div className="hidden md:block h-1 w-60 bg-gray-500"></div>
					<h2 className="text-6xl font-semibold font-serif mx-4">
						Nos Produits
					</h2>
					<div className="hidden md:block h-1 w-60 bg-gray-500"></div>
				</div>
			</div>
			<div>
				{/* Appel du composant Produits */}
				<div className="flex w-100 justify-center ">
					<div className="flex w-3/4 flex-wrap justify-around">
						<Products />
					</div>
				</div>
			</div>

			{/* Nouvelle section Par Sélection */}
			<div className="flex items-center justify-center ">
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
				<h2 className="text-6xl font-semibold font-serif mx-4">
					Par Sélection
				</h2>
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
			</div>

			{/* Appel du composant Teams */}
			<div className="flex w-100 justify-center mt-12">
				<div className="flex w-3/4 flex-wrap justify-around">
					<Teams />
				</div>
			</div>

			<div className="flex items-center justify-center mt-20">
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
				<h2 className="text-6xl font-semibold font-serif mx-4">Nationnaux</h2>
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
			</div>
			<div className="flex w-100 justify-center mt-12">
				<div className="flex w-3/4 flex-wrap justify-around">
					<Products filterTeamType="equipe-nationale" />
				</div>
			</div>
			<div className="flex items-center justify-center mt-20">
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
				<h2 className="text-6xl font-semibold font-serif mx-4">Locaux</h2>
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
			</div>
			<div className="flex w-100 justify-center mt-12">
				<div className="flex w-3/4 flex-wrap justify-around">
					<Products filterTeamType="locaux" />
				</div>
			</div>
			<div className="flex items-center justify-center mt-20">
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
				<h2 className="text-6xl font-semibold font-serif mx-4">Lifestyle</h2>
				<div className="hidden md:block h-1 w-32 bg-gray-500"></div>
			</div>
			<div className="flex w-100 justify-center mt-12">
				<div className="flex w-3/4 flex-wrap justify-around">
					<Products filterTeamType="lifestyle" />
				</div>
			</div>
		</main>
	);
}
