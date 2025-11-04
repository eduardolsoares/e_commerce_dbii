"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AccountDashboard() {
  const { data, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  return (
    <main className="max-w-2xl min-h-screen flex flex-col items-center mx-auto">
      <div className="w-full flex justify-between my-10">
        <h1 className="text-2xl font-bold">Protected Page</h1>
      </div>
      <pre className="w-full bg-gray-200 p-4 rounded break-words whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
