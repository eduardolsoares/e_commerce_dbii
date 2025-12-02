import Navbar from "../component/layout/Navbar";
import LandingPageFooter from "../component/layout/LandingPageFooter";
import YourCart from "../component/layout/YourCart";
import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { redirect } from "next/navigation";


async function createOrder(userId, items) {
  "use server";
  if (!items || items.length === 0) {
    throw new Error("O pedido não pode estar vazio.");
  }
  const newOrder = await prisma.$transaction(async (tx) => {
    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        status: "WAITING_FOR_PAYMENT",
        products: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            color: item.color || null,
            size: item.size || null,
          })),
        },
      },
    });
    return newOrder;
  });
  redirect(`/checkout/${newOrder.id}`)
}

export default async function Cart() {
  const session = await getServerSession(authConfig)
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <YourCart createOrder={createOrder} userId={Number(session.user.id)} />
      <LandingPageFooter />
    </div>
  );
}
