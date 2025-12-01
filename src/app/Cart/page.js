import Navbar from "../component/layout/Navbar";
import LandingPageFooter from "../component/layout/LandingPageFooter";
import YourCart from "../component/layout/YourCart";

export default function Cart() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <YourCart />
      <footer>
        <LandingPageFooter />
      </footer>
    </div>
  );
}
