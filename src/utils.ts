import { NewDiaryEntry } from './types'
import { Visibility, Weather } from './enums'

function isString (string: any): boolean {
  return typeof string === 'string'
}
function isDate (date: string): boolean {
  console.log(Date.parse(date))
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

const toNewEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  }
  return newEntry
}

export default toNewEntry
