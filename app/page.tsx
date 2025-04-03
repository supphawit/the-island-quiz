import { Suspense } from "react";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import ClientQuizIsland from "@/components/ClientQuizIsland";

export const metadata = {
  title: "Quiz Island - Test Your Knowledge",
  description: "Challenge yourself with our interactive quiz game!",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <ClientQuizIsland />
      </Suspense>
    </main>
  );
}
