'use client'

import dynamic from 'next/dynamic'
import { LoadingOverlay } from "./common/LoadingOverlay"

const QuizIsland = dynamic(
  () => import('./QuizIsland'),
  { 
    loading: () => <LoadingOverlay isLoading={true} />
  }
)

export default function ClientQuizIsland() {
  return <QuizIsland />
}