import Navbar from "../../component/layout/Navbar";
import LandingPageFooter from "../../component/layout/LandingPageFooter";
import ProductDetails from "../../component/layout/ProductDetails";
import prisma from "@/src/lib/prisma";

async function getProduct(productId) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    },
  });
  return product;
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProduct(productId)
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <ProductDetails product={product}/>
      <LandingPageFooter />
    </div>
  )
}
