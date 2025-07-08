import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">🎓 Start learning your way.</div>
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      <p>
        Name your companion, choose a subject and voice, and start chatting.
        Learn faster, retain more, and have fun along the way.
      </p>
      <Image
        src="images/cta.svg"
        width={362}
        height={232}
        alt="Call to action image"
      />
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
        <Link href="/companions/new">
          <p className="uppercase">🚀 Build a NEW COMPANION</p>
        </Link>
      </button>
    </section>
  )
}
export default CTA
