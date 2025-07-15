import CompanionCard from '@/components/CompanionCard'
import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/SubjectFilter'
import { getAllCompanions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams

  let subject: string | string[] = ''
  if (typeof filters.subject === 'string') {
    subject = filters.subject.includes(',')
      ? filters.subject.split(',').map((s: string) => s.trim())
      : filters.subject
  }

  let topic: string | string[] = ''
  if (typeof filters.topic === 'string') {
    topic = filters.topic.includes(',')
      ? filters.topic.split(',').map((s) => s.trim())
      : filters.topic
  }

  let companions: Companion[] = []
  companions = await getAllCompanions({ subject: subject, topic: topic })

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  )
}
export default CompanionsLibrary
