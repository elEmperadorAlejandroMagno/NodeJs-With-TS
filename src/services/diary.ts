import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import { toUpdateEntry } from '../utils'
import diaryData from './diaries.json'
import { randomUUID } from 'crypto'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const getEntriesById = (id: string): DiaryEntry | undefined => {
  const entry = diaries.find(e => e.id === id)
  return entry
}

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addEntry = (input: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = {
    id: randomUUID(),
    ...input
  }
  diaryData.push(newEntry)
  return newEntry
}

export const updateEntry = (input: Partial<NewDiaryEntry>, id: string): DiaryEntry => {
  const validatedNewEntry = toUpdateEntry(input)
  const oldEntry = diaries.find(e => e.id === id)
  if (oldEntry == null) {
    throw new Error('Diary Entry not found')
  }
  const updatedEntry = { ...oldEntry, ...validatedNewEntry }

  return updatedEntry
}
