'use server'

import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '../supabase'

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth()
  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select()

  if (error || !data)
    throw new Error(error?.message || 'Failed to create a companion')

  return data[0]
}

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions): Promise<Companion[]> => {
  const supabase = createSupabaseClient()

  let query = supabase.from('companions').select()

  if (Array.isArray(subject) && subject.length > 0) {
    const subjectFilters = subject.map((s) => `subject.ilike.%${s}%`).join(',')

    if (topic) {
      query = query.or(
        `${subjectFilters},topic.ilike.%${topic}%,name.ilike.%${topic}%`
      )
    } else {
      query = query.or(subjectFilters)
    }
  } else if (typeof subject === 'string') {
    if (topic) {
      query = query
        .ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else {
      query = query.ilike('subject', `%${subject}%`)
    }
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  const { data: companions, error } = await query

  if (error) throw new Error(error.message)

  return companions
}

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id)

  if (error) return console.log(error)

  return data[0]
}
