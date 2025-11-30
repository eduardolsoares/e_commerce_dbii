import NavBar from "../component/layout/Navbar";
import LandingPageFooter from "../component/layout/LandingPageFooter";
import OrdersPage from "../component/layout/OrdersPage";

export default function Orders() {
return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
    <NavBar />
    <OrdersPage />
    <footer>
        <LandingPageFooter />
    </footer>
    </div>
)
}