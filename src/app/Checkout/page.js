import Navbar from "../component/layout/Navbar";
import  LandingPageFooter from "../component/layout/LandingPageFooter";
import CheckoutPage from "../component/layout/CheckoutPage";

export default function Checkout(){

    return (
            <div className="min-h-screen bg-white text-gray-900 flex flex-col">
              <Navbar />
              <CheckoutPage />
              <footer>
                <LandingPageFooter />
              </footer>
            </div>
          )
}