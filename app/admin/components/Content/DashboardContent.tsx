export default function DashboardContent() {
	return (
		<div className=" h-5/6 w-11/12 mt-6 rounded-2xl shadow-lg z-100 bg-white">
			<div className="w-full flex justify-center ">
				<div className="flex space-x-16 mt-20">
					<div className="w-56 h-28 border border-black">
						<div className="text-center font-semibold">
							Maillots vendus ce mois
						</div>
						<div className="text-center font-semibold w-full h-full text-7xl text-green-700">
							1
						</div>
					</div>
					<div className="w-56 h-28 border border-black">
						<div className="text-center font-semibold">Commandes non livré</div>
						<div className="text-center font-semibold w-full h-full text-7xl text-red-700">
							9
						</div>
					</div>
					<div className="w-56 h-28 border border-black">
						<div className="text-center font-semibold">Utilisateurs</div>
						<div className="text-center font-semibold w-full h-full text-7xl">
							5
						</div>
					</div>
				</div>
			</div>
			<div className="m-14">
				<h2 className="font-bold text-xl">
					Maillots arrivant en rupture de stock
				</h2>
				<div></div>
			</div>
		</div>
	);
}
