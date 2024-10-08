import { ReactNode } from "react";

interface ProductsContentProps {
	children: ReactNode;
}
export default function ProductsContent({ children }: ProductsContentProps) {
	return (
		<div className=" h-5/6 w-11/12 mt-6 rounded-1xl shadow-lg z-50 bg-white">
			<div>{children}</div>
		</div>
	);
}
