import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import { getEntry, toUpdateEntry } from '../utils'
import diaryData from './diaries.json'
import { randomUUID } from 'crypto'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const getEntryById = (id: string): DiaryEntry | undefined => {
  const entry = getEntry(id, diaries)
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
  const oldEntry = getEntry(id, diaries)
  if (oldEntry == null) {
    throw new Error('Diary Entry not found')
  }
  const updatedEntry = { ...oldEntry, ...validatedNewEntry }

  return updatedEntry
}

export const deleteEntry = (id: string): boolean => {
  const entryIndex = diaries.findIndex(e => e.id === id)
  if (entryIndex === -1) {
    return false
  }
  diaries.splice(entryIndex, 1)
  return true
}
