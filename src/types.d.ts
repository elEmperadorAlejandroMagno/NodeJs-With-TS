export type Weather = 'sunny' | 'rainy' | 'windy' | 'cloudy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry {
  id: string
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
