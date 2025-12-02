import NavBar from "../component/layout/Navbar";
import LandingPageFooter from "../component/layout/LandingPageFooter";
import OrdersPage from "../component/layout/OrdersPage";
import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";

async function getCurrentOrders(userId) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      Order: {
        select: {
          id: true,
          createdAt: true,
          status: true,
          products: {
            select: {
              quantity: true,
              size: true,
              color: true,
              product: {
                select: {
                  name: true,
                  image: true,
                  price: true,
                  id: true
                }
              }
            }
          }
        },
      },
    },
  });

  const orders = result?.Order || [];
  return orders;
}

export default async function Orders() {
  const session = await getServerSession(authConfig);
  const orders = await getCurrentOrders(Number(session.user.id))
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
