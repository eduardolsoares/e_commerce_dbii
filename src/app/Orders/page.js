import NavBar from "../component/layout/Navbar";
import LandingPageFooter from "../component/layout/LandingPageFooter";
import OrdersPage from "../component/layout/OrdersPage";
import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";

async function getCurrentOrders(userEmail) {
  const result = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      Order: {
        include: {
          products: true,
        },
      },
    },
  });

  const orders = result?.Order || [];
  return orders;
}

export default async function Orders() {
  const session = await getServerSession(authConfig);
  const orders = await getCurrentOrders(session.user.email)

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
    <NavBar />
    <OrdersPage orders={orders} />
    <footer>
        <LandingPageFooter />
    </footer>
    </div>
)
}
