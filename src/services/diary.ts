import { DiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'
import { randomUUID } from 'crypto'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const getEntriesById = (id: string): DiaryEntry => {
  const entry = diaries.find(e => e.id === id)
  if (entry === undefined) {
    throw new Error(`Entries with id:${id} not found`)
  }
  return entry
}

export const addEntry = (input: NewDiaryEntry): DiaryEntry => {
  const newEntry = {
    id: randomUUID(),
    ...input
  }
  diaryData.push(newEntry)
  return newEntry
}
