import Products from "../components/Products/page";

export default function Nation() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mt-4">Maillots de Club</h1>
			<Products filterTeamType="equipe-nationale" />
		</div>
	);
}
