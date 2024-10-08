import Products from "../components/Products/page";

export default function Lifestyle() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mt-4">Maillots de Club</h1>
			<Products filterTeamType="lifestyle" />
		</div>
	);
}
