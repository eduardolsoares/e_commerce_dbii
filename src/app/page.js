import ProductRow from "./component/layout/ProductRow";
import Navbar from "./component/layout/Navbar";
import Divider from "./component/ui/Divider";
import HeroSection from "./component/layout/HeroSection";
import LandingPageFooter from "./component/layout/LandingPageFooter";
import prisma from "../lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany()
  return products;
}
export default async function LandingPage() {
  const products = getProducts()

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <HeroSection />
      <main className={"flex-1 max-w-6xl mx-auto px-0 py-0"}>
        <section >
          <ProductRow products={products} label={"Novidades"}/>
          <Divider />
          <div className="-mt-24">
          <ProductRow products={products} label = {"Itens mais vendidos"} />
          </div>
          <Divider />
          <div className="mb-30 -mt-24">
          <ProductRow products={products} label = {"Itens para você"} />
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
