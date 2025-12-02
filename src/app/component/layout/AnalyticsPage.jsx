"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AccountDashboard({ analytics }) {
  console.log(analytics)
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }
  return (
    <main className="max-w-2xl min-h-screen flex flex-col items-center mx-auto">
      <div className="w-full flex justify-between my-10">
        <h1 className="text-2xl font-bold">Analytics Page</h1>
      </div>
      <pre className="w-full bg-gray-200 p-4 rounded  break-words whitespace-pre-wrap">
        <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Nome
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Total gasto
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Data da última compra
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-neutral-primary border-b border-default">
                    <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {analytics.user_name}
                    </th>
                    <td class="px-6 py-4">
                        {analytics.email}
                    </td>
                    <td class="px-6 py-4">
                        R${analytics.total_spent}
                    </td>
                    <td class="px-6 py-4">
                      {new Date(analytics.last_order_date).toLocaleDateString()}
                    </td>
                </tr>
            </tbody>
        </table>
      </pre>
    </main>
  );
}
