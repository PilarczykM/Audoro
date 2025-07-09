'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const TOPIC = 'topic'

const SearchInput = () => {
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery] = useDebounce(searchQuery, 500)

  useEffect(() => {
    if (debouncedQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: TOPIC,
        value: debouncedQuery,
      })

      router.push(newUrl, { scroll: false })
    } else {
      if (pathName === '/companions') {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: [TOPIC],
        })

        router.push(newUrl, { scroll: false })
      }
    }
  }, [debouncedQuery, router, searchParams, pathName])

  return (
    <div className="relative border border-black rounded-lg flex items-center gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search icon" width={15} height={15} />
      <input
        placeholder="Search companions"
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
export default SearchInput
