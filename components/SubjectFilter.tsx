'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { subjects } from '@/constants'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SubjectFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('subject') || ''

  const [subject, setSubject] = useState(query)

  useEffect(() => {
    const current = searchParams.toString()

    const newUrl =
      subject === 'all'
        ? removeKeysFromUrlQuery({
            params: current,
            keysToRemove: ['subject'],
          })
        : formUrlQuery({
            params: current,
            key: 'subject',
            value: subject,
          })

    if (newUrl !== `${window.location.pathname}?${current}`) {
      router.push(newUrl, { scroll: false })
    }
  }, [subject, router, searchParams])

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default SubjectFilter
