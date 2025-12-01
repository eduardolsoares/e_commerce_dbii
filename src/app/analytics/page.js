import Navbar from "../component/layout/Navbar";
import  LandingPageFooter from "../component/layout/LandingPageFooter";
import AnalyticsPage from "../component/layout/AnalyticsPage";
import { getServerSession } from "next-auth";
import prisma from "@/src/lib/prisma";

async function getAnalyticsFor(userEmail) {
  const analytics = await prisma.$queryRaw`SELECT * FROM "UserOrderSummary" WHERE email=${userEmail}`;
  return analytics
}
export default async function Cart() {
  const session = getServerSession()
  const analytics = await getAnalyticsFor(session.user.email)
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
          <Navbar />
          <AnalyticsPage analytics={analytics} />
          <footer>
            <LandingPageFooter />
          </footer>
        </div>
      )
}
