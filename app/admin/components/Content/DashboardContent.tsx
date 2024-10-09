import RuptureStock from "../StatsDashboard/RuptureStock";
import StatsDashboard from "../StatsDashboard/StatsDashboard";

export default function DashboardContent() {
	return (
		<div className=" h-5/6 w-11/12 mt-6 rounded-2xl shadow-lg z-100 bg-white">
			<div className="w-full flex justify-center ">
				<div className="flex space-x-16 mt-20">
					<StatsDashboard />
				</div>
			</div>
			<div className="m-14">
				<div className="m-14">
					<RuptureStock />
				</div>
				<div></div>
			</div>
		</div>
	);
}
