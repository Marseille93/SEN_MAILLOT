import Header from "../components/header/page";
import Products from "../components/Products/page";

export default function NosProduits() {
  return (
    <div className="bg-slate-50 h-screen overflow-auto">
      <Header></Header>
      <div className="min-h-screen ">
        <h1 className="text-center text-black mt-20">Nos Produits</h1>
        <div className="flex justify-around w-full flex-wrap p-2">
          <div className="flex w-3/4 flex-wrap justify-around  min-h-screen">
            <Products></Products>
          </div>
        </div>
      </div>
    </div>
  );
}
