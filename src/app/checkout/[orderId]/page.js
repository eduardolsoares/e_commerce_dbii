import Navbar from "../../component/layout/Navbar";
import LandingPageFooter from "../../component/layout/LandingPageFooter";
import CheckoutPage from "../../component/layout/CheckoutPage";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function finalizeOrder(orderId) {
  "use server";
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "PAID",
    },
  });
  redirect("/Orders")
}

export default async function Checkout({ params }) {
  const { orderId } = await params;
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <CheckoutPage finalizeOrder={finalizeOrder} orderId={Number(orderId)} />
      <LandingPageFooter />
    </div>
  );
}
