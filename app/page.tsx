import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import {
  getAllCompanions,
  getRecentSessions,
} from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

const Home = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsCompanions = await getRecentSessions(10)

  return (
    <main>
      <h2 className="text-2xl underline">Popular Companions</h2>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Home
