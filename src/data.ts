import type {
  ActivityCard,
  ChildProfile,
  ConditionCard,
  PrincipleItem,
  ScienceStep,
} from './types'

export const children: Record<string, ChildProfile> = {
  james: {
    id: 'james',
    name: 'James',
    fullName: 'James Mwangi',
    age: 9,
    sessions: 14,
    stars: 32,
    streak: 5,
    condition: 'Dyslexia',
    confidence: 84,
    riskLevel: 'high',
    hesitation: '3.8s',
    reversals: 7,
    rereads: 4,
    signals: [
      { name: 'Letter Reversal Rate', value: 88, color: 'var(--color-red)', display: '88%' },
      { name: 'Phonics Hesitation', value: 76, color: 'var(--color-amber)', display: '4.2s' },
      { name: 'Re-read Frequency', value: 70, color: 'var(--color-orange)', display: '70%' },
      { name: 'Word Skip Rate', value: 55, color: 'var(--color-amber)', display: '55%' },
      { name: 'Oral Comprehension', value: 82, color: 'var(--color-green)', display: '82%' },
    ],
    alertHeadline:
      'James struggles with phonics and letter sequencing — this is not a learning deficiency, it is a processing difference that responds well to the right approach.',
    alertDetail:
      'Consistent reversal of b/d and p/q observed across 14 sessions. Phonics hesitation averaging 4.2 seconds — nearly 3× the class baseline. Recommend oral-first instruction, extended reading time, and multisensory letter tracing. InsightED has already begun adapting James\'s exercises to match his learning profile.',
    tags: ['Dyslexia Markers', 'High Confidence', 'Action Required'],
    arcColor: 'var(--color-red)',
    summary:
      'James is showing strong dyslexia markers in reading and symbol sequencing tasks.',
    recommendations: [
      'Use oral-first instruction before written output.',
      'Add letter tracing and multi-sensory reading practice.',
      'Give extra reading time and avoid public correction.',
    ],
  },
  amara: {
    id: 'amara',
    name: 'Amara',
    fullName: 'Amara Kamara',
    age: 8,
    sessions: 9,
    stars: 21,
    streak: 3,
    condition: 'Monitoring',
    confidence: 44,
    riskLevel: 'medium',
    hesitation: '2.1s',
    reversals: 1,
    rereads: 2,
    signals: [
      { name: 'Phonics Hesitation', value: 44, color: 'var(--color-amber)', display: '2.1s' },
      { name: 'Letter Reversal Rate', value: 12, color: 'var(--color-green)', display: '12%' },
      { name: 'Re-read Frequency', value: 30, color: 'var(--color-green)', display: '30%' },
      { name: 'Word Skip Rate', value: 18, color: 'var(--color-green)', display: '18%' },
      { name: 'Oral Comprehension', value: 75, color: 'var(--color-green)', display: '75%' },
    ],
    alertHeadline:
      'Amara shows a mild phonemic processing delay. Two more sessions are needed before any classification is made.',
    alertDetail:
      'Slight hesitation on phonically complex words noted across 9 sessions. Pattern has not yet crossed the alert threshold. InsightED is monitoring quietly and will notify you if confidence increases. No action needed at this stage.',
    tags: ['Monitoring', 'Below Threshold', 'No Action Yet'],
    arcColor: 'var(--color-amber)',
    summary: 'Amara shows emerging patterns, but the system is still in monitor mode.',
    recommendations: [
      'Keep collecting sessions before making a referral.',
      'Support with short phonics warm-ups and repetition.',
      'Watch for changes in hesitation and re-read rates.',
    ],
  },
  chidi: {
    id: 'chidi',
    name: 'Chidi',
    fullName: 'Chidi Okonkwo',
    age: 8,
    sessions: 11,
    stars: 28,
    streak: 4,
    condition: 'Typical',
    confidence: 28,
    riskLevel: 'low',
    hesitation: '1.4s',
    reversals: 0,
    rereads: 1,
    signals: [
      { name: 'Phonics Hesitation', value: 20, color: 'var(--color-green)', display: '1.4s' },
      { name: 'Letter Reversal Rate', value: 4, color: 'var(--color-green)', display: '4%' },
      { name: 'Re-read Frequency', value: 15, color: 'var(--color-green)', display: '15%' },
      { name: 'Word Skip Rate', value: 10, color: 'var(--color-green)', display: '10%' },
      { name: 'Oral Comprehension', value: 88, color: 'var(--color-green)', display: '88%' },
    ],
    alertHeadline:
      'Chidi is performing within typical ranges across all exercises. No learning difference markers detected.',
    alertDetail:
      'All 11 sessions show consistent, expected performance patterns. Hesitation times, error types, and re-read rates are within the typical range for an 8-year-old. Chidi is progressing well.',
    tags: ['Typical Pattern', 'No Concerns', 'Progressing Well'],
    arcColor: 'var(--color-green)',
    summary: 'Chidi is progressing within the expected range for age and task type.',
    recommendations: [
      'Continue normal classroom pacing.',
      'Use the app as a confidence-building practice tool.',
      'No special intervention is required now.',
    ],
  },
  fatima: {
    id: 'fatima',
    name: 'Fatima',
    fullName: 'Fatima Bah',
    age: 9,
    sessions: 8,
    stars: 18,
    streak: 2,
    condition: 'Dyscalculia',
    confidence: 61,
    riskLevel: 'medium',
    hesitation: '1.9s',
    reversals: 2,
    rereads: 2,
    signals: [
      { name: 'Digit Reversal Rate', value: 68, color: 'var(--color-red)', display: '68%' },
      { name: 'Magnitude Comparison Err', value: 72, color: 'var(--color-red)', display: '72%' },
      { name: 'Sequential Order Errors', value: 58, color: 'var(--color-amber)', display: '58%' },
      { name: 'Multi-step Math Errors', value: 64, color: 'var(--color-amber)', display: '64%' },
      { name: 'Verbal Maths Performance', value: 70, color: 'var(--color-green)', display: '70%' },
    ],
    alertHeadline:
      'Fatima shows consistent dyscalculia markers across number and sequencing tasks.',
    alertDetail:
      'Digit reversal and magnitude comparison errors appear in 7 of 8 sessions. Fatima performs notably better on verbal maths than symbolic maths — a classic dyscalculia signature. Recommend visual number lines, finger counting, and avoiding timed arithmetic pressure.',
    tags: ['Dyscalculia Markers', 'Medium Confidence', 'Monitor Closely'],
    arcColor: 'var(--color-amber)',
    summary: 'Fatima shows number-processing strain, especially on symbolic math tasks.',
    recommendations: [
      'Use visual number lines and concrete counting objects.',
      'Avoid timed arithmetic drills while the pattern is being tracked.',
      'Compare verbal and symbolic tasks to refine support.',
    ],
  },
}

export const childOrder = ['james', 'amara', 'chidi', 'fatima'] as const

export const activities: ActivityCard[] = [
  {
    type: 'reading',
    title: 'Story Reading',
    description: 'Read along at your own pace. Tap any word that feels difficult.',
    icon: '📖',
    progress: 65,
    active: true,
  },
  {
    type: 'letters',
    title: 'Letter Match',
    description: 'Find the matching letter or sound. Quick and fun.',
    icon: '🔤',
    progress: 40,
  },
  {
    type: 'numbers',
    title: 'Number Puzzles',
    description: 'Fill in the missing number. What comes next?',
    icon: '🔢',
    progress: 20,
  },
  {
    type: 'patterns',
    title: 'Pattern Play',
    description: 'Colours and shapes in a sequence. Complete the pattern.',
    icon: '🎨',
    progress: 50,
  },
  {
    type: 'reading',
    title: 'Sound Blends',
    description: 'Combine sounds into words. Unlock at 50 stars.',
    icon: '🎵',
    progress: 0,
    locked: true,
    unlockText: 'Unlock at 50 stars',
  },
  {
    type: 'letters',
    title: 'Word Safari',
    description: 'Words from your world. Unlock at 60 stars.',
    icon: '🌍',
    progress: 0,
    locked: true,
    unlockText: 'Unlock at 60 stars',
  },
]

export const scienceSteps: ScienceStep[] = [
  {
    title: 'Child learns normally',
    description: 'Stories, letter games, and number puzzles. Nothing about the experience feels like a test.',
  },
  {
    title: 'Signals are logged',
    description: 'Every tap, hesitation, skip, error, and re-read is timestamped in the background.',
  },
  {
    title: 'Patterns emerge',
    description: 'The AI compares the child\'s behavioral fingerprint against known learning profiles.',
  },
  {
    title: 'App adapts silently',
    description: 'Pacing, format, and exercise type shift automatically for that specific child.',
  },
  {
    title: 'Teacher is alerted',
    description: 'Plain language. No clinical jargon. Exactly what to do differently — and why.',
  },
]

export const conditionCards: ConditionCard[] = [
  {
    name: 'Dyslexia',
    icon: '📚',
    tint: '#FDECEA',
    description:
      'A phonological processing difference affecting reading, symbol decoding, and sequencing. It is not a measure of intelligence.',
    signals: [
      'Letter reversal frequency (b/d, p/q, u/n)',
      'Phonics hesitation versus peer baseline',
      'Re-read rate on the same passage',
      'Word-skip and line-skip patterns',
      'Oral versus written comprehension divergence',
    ],
  },
  {
    name: 'ADHD',
    icon: '⚡',
    tint: '#F3EDFA',
    description:
      'A difference in attention, impulse control, and sustained focus. Children are not naughty; their attention circuitry is wired differently.',
    signals: [
      'Attention drop-off curves over time',
      'Impulsive selection on complex tasks',
      'High abandon rates mid-exercise',
      'Inconsistent performance across sessions',
      'Performance spikes on novel content',
    ],
  },
  {
    name: 'Dyscalculia',
    icon: '🔢',
    tint: 'var(--color-orange-bg)',
    description:
      'A specific difficulty with number sense and mathematics. It is often under-detected because math failure is accepted as ordinary.',
    signals: [
      'Digit reversal and transposition errors',
      'Number magnitude comparison failures',
      'Counting sequence irregularities',
      'Spatial errors in written arithmetic',
      'Strong verbal versus weak symbolic math gap',
    ],
  },
]

export const principles: PrincipleItem[] = [
  {
    title: 'Natural observation',
    description: 'The child is not placed under exam conditions. The app watches ordinary learning behavior.',
  },
  {
    title: 'Early intervention',
    description: 'Patterns appear before repeated failure becomes shame, withdrawal, or mislabeling.',
  },
  {
    title: 'Teacher-readable',
    description: 'Alerts are written in plain language so the next action is obvious, not technical.',
  },
  {
    title: 'Equity by design',
    description: 'The model is built for classrooms where clinical screening is unavailable or too expensive.',
  },
]

export const improvements: string[] = [
  'Tune thresholds against real classroom data, not demo values.',
  'Add teacher feedback loops so alerts can be confirmed or corrected.',
  'Expand beyond English to languages with different phoneme patterns.',
  'Support offline-first sync for low-connectivity schools.',
  'Track long-term intervention outcomes instead of one-off flags.',
]
