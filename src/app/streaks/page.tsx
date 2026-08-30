import type { Metadata } from "next"
import Header from "@/components/header"
import Banner from "@/components/banner"
import Container from "@/components/container"
import Footer from "@/components/footer"
import TodayPlan from "@/components/today-plan"
import PasswordGate from "@/components/password-gate"

export const metadata: Metadata = {
  title: "Today's Plan",
  description:
    "The 8-hour daily plan: IELTS skills and DevOps, shown dynamically based on the actual day of the week.",
}

export default function StreaksPage() {
  return (
    <>
      <Header />
      <Banner />
      <Container>
        <PasswordGate>
          <TodayPlan />
        </PasswordGate>
      </Container>
      <Footer />
    </>
  )
}