import faker from 'faker'

export const categories = ['sport', 'festival', 'movie', 'tourism', 'trip']
export function getCategory () {
  return faker.random.arrayElement(categories)
}

export function getImage () {
  return {
    title: faker.lorem.words(2),
    thumbnail: faker.image.imageUrl(400, 200, undefined, false)
  }
}

export type Category = string
export type EventDates = {
  start: Date
  end?: Date
}
export type EventImage = {
  title?: string
  thumbnail: string
}
export interface Event {
  id: string
  title: string
  description: string
  categories: Category[]
  date: EventDates
  address: string
  reservable: boolean
  images: EventImage[]
}

export function getEvent (): Event {
  const future = faker.date.future(0)
  return {
    id: faker.random.uuid(),
    title: faker.lorem.words(2),
    description: faker.lorem.paragraph(3),
    categories: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, getCategory),
    date: {
      start: faker.date.recent(10),
      end: faker.random.boolean() && faker.date.future(0, future)
    },
    address: faker.address.streetAddress(),
    reservable: false,// faker.random.boolean(),
    images: Array.from({ length: faker.random.number({ min: 0, max: 2 }) }, getImage)
  }
}

export function genEvents (): Event[] {
  return Array.from({ length: faker.random.number({ min: 20, max: 30 }) }, getEvent)
}

const cache = genEvents()

export function find () {
  return cache
}
export function findById (id) {
  return cache.find(v => v.id === id)
}
