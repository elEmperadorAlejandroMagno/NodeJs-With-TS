import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
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
