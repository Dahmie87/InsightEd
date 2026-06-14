export type RiskLevel = 'high' | 'medium' | 'low'

export type AppPage = 'overview' | 'learn' | 'science' | 'reports'

export type ExerciseType = 'reading' | 'letters' | 'numbers' | 'patterns'

export type ChildId = 'james' | 'amara' | 'chidi' | 'fatima'

export interface Signal {
  name: string
  value: number
  display: string
  color: string
}

export interface ChildProfile {
  id: ChildId
  name: string
  fullName: string
  age: number
  sessions: number
  stars: number
  streak: number
  condition: string
  confidence: number
  riskLevel: RiskLevel
  hesitation: string
  reversals: number
  rereads: number
  signals: Signal[]
  alertHeadline: string
  alertDetail: string
  tags: string[]
  arcColor: string
  summary: string
  recommendations: string[]
}

export interface ActivityCard {
  type: ExerciseType
  title: string
  description: string
  icon: string
  progress: number
  active?: boolean
  locked?: boolean
  unlockText?: string
}

export interface ScienceStep {
  title: string
  description: string
}

export interface ConditionCard {
  name: string
  icon: string
  tint: string
  description: string
  signals: string[]
}

export interface PrincipleItem {
  title: string
  description: string
}
