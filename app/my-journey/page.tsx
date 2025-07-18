import Image from 'next/image'

import {
  getUserCompanions,
  getUserSessions,
} from '@/lib/actions/companion.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import CompanionsList from '@/components/CompanionsList'

const Profile = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const companions = await getUserCompanions(user.id)
  const sessionHistory = await getUserSessions(user.id)

  console.log(sessionHistory)
  console.log('companions: ', companions)

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col items-center py-5">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4 max-md:hidden">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="check-mark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <div>Lessons Completed</div>
          </div>

          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>Companions Created</div>
          </div>
        </div>
      </section>

      <div className="my-5">
        <Accordion type="multiple">
          {/* RECENTLY WATCHED LESSONS BY USER */}
          <AccordionItem value="recent">
            <AccordionTrigger className="text-2xl font-bold">
              Recent Sessions
            </AccordionTrigger>
            <AccordionContent>
              <CompanionsList
                title="Recent Sessions"
                companions={sessionHistory}
              />
            </AccordionContent>
          </AccordionItem>

          {/* USER-CREATED COMPANIONS */}
          <AccordionItem value="companions">
            <AccordionTrigger className="text-2xl font-bold">
              My Companions {`(${companions.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <CompanionsList
                title="My Companions"
                companions={companions}
                classNames=""
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}

export default Profile
