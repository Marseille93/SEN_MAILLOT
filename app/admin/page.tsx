import DashboardContent from "./components/Content/DashboardContent";
import Sidebar from "./components/Sidebar";
import DashboardSousMenu from "./components/SousMenu/DashboardSousMenu";

export default function Dashboard() {
	return (
		<div className="bg-gray-50 flex">
			<div className="w-1/6">
				<Sidebar />
			</div>
			<div className="w-4/5">
				<DashboardSousMenu />
				<DashboardContent />
			</div>
		</div>
	);
}
