import { DiaryEntry, NewDiaryEntry } from './types'
import { Visibility, Weather } from './enums'

export function getEntry (id: string, entries: DiaryEntry[]): DiaryEntry {
  const entry = entries.find(e => e.id === id)
  if (entry === null) {
    throw new Error('Diary entry not found')
  }
  return entry as DiaryEntry
}

function isString (string: any): boolean {
  return typeof string === 'string'
}
function isDate (date: string): boolean {
  return Boolean(Date.parse(date))
}
function isWeather (param: Weather): boolean {
  return Object.values(Weather).includes(param)
}
function isVisibility (param: Visibility): boolean {
  return Object.values(Visibility).includes(param)
}

function parseDate (date: any): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or incorrect date')
  }
  return date
}
function parseWeather (weather: any): Weather {
  if (!isWeather(weather) || !isString(weather)) {
    throw new Error('Invalid or incorrect weather')
  }
  return weather
}
function parseVisibility (visibility: any): Visibility {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Invalid or incorrect visibility')
  }
  return visibility
}
function parseComment (comment: any): string {
  if (!isString(comment)) {
    throw new Error('Invalid or incorrect comment')
  }
  return comment
}

export const toNewEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  }
  return newEntry
}

export const toUpdateEntry = (object: any): Partial<NewDiaryEntry> => {
  const parsedEntry: any = {}
  if (object.date !== undefined) {
    parsedEntry.date = parseDate(object.date)
  }
  if (object.weather !== undefined) {
    parsedEntry.weather = parseWeather(object.weather)
  }
  if (object.visibility !== undefined) {
    parsedEntry.visibility = parseVisibility(object.visibility)
  }
  if (object.comment !== undefined) {
    parsedEntry.comment = parseComment(object.comment)
  }
  return parsedEntry
}
