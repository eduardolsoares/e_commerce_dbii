import Navbar from "../../component/layout/Navbar";
import LandingPageFooter from "../../component/layout/LandingPageFooter";
import ProductDetails from "../../component/layout/ProductDetails";

export default async function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <ProductDetails />
      <footer>
        <LandingPageFooter />
      </footer>
    </div>
  )

}