"use client";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Header from "@/app/components/header/page";
import Products from "@/app/components/Products/page";
import JerseyCard from "@/app/components/JerseyCard/JerseyCard";

type Picture = {
	id: number;
	url: string;
};

type Article = {
	id: number;
	nom: string;
	description: string;
	price: string;
	categories: { id: number; nom: string };
	equipes: { id: number; nom: string; logoUrl: string; type: string };
	avis: any[];
	pictures: Picture[];
};

type Props = {
	params: { id: number };
};

export default function DetailMaillot({ params }: Props) {
	const [article, setArticle] = useState<Article | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/maillots/${params.id}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data: Article = await response.json();
				setArticle(data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};
		fetchArticle();
	}, [params.id]);

	if (!article) {
		return <p>Loading...</p>; // Display loading message
	}

	// Extract the last image URL
	const firstImage = article.pictures[0].url;

	return (
		<div className="bg-white h-screen">
			<Header />
			<main className="flex items-center w-full justify-start flex-col lg:flex-row lg:mt-16">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{ delay: 2500, disableOnInteraction: false }}
					pagination={{ clickable: true }}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation]}
					className="mySwiper w-1/2 mt-56 lg:w-2/6 lg:mt-8 lg:ml-20"
				>
					{article.pictures.map((picture) => (
						<SwiperSlide key={picture.id}>
							<img className="w-full" src={picture.url} alt={article.nom} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className="ml-28 w-full lg:w-1/2">
					<h1 className="text-6xl font-bold text-sky-950">{article.nom}</h1>
					<p className="w-3/4">{article.description}</p>
				</div>
			</main>
			<div className="my-14">
				<JerseyCard lastImageUrl={firstImage} id={params.id} />
			</div>
			<main className="bg-white">
				<h3 className="text-center font-bold text-3xl text-black mb-40 underline">
					Autres Produits
				</h3>
				<div className="w-full flex justify-center">
					<div className="w-3/4">
						<Products />
					</div>
				</div>
			</main>
		</div>
	);
}
