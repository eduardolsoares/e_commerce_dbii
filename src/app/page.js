import { HeaderAuth } from "./component/auth"
import ProductRow from "./component/layout/ProductRow";
import Navbar from "./component/layout/Navbar";
import Divider from "./component/ui/Divider";
import { useSession } from "next-auth/react";
import HeroSection from "./component/layout/HeroSection";
import LandingPageFooter from "./component/layout/LandingPageFooter";
import { Products } from "./component/layout/Products";

export default function LandingPage() {
  const mockProducts = Products
  const trendingProducts = Products
  const forYouProducts = Products

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <HeroSection />
      <main className={"flex-1 max-w-6xl mx-auto px-0 py-0"}>
        <section >
          <ProductRow products={mockProducts} label={"Novidades"}/>
          <Divider />
          <div className="-mt-24">
          <ProductRow products={trendingProducts} label = {"Itens mais vendidos"} />
          </div>
          <Divider />
          <div className="mb-30 -mt-24">
          <ProductRow products={forYouProducts} label = {"Itens para você"} />
          </div>
          <Divider />
        </section>
      </main>

      <footer>
        <LandingPageFooter />
      </footer>
    </div>
  )
}
