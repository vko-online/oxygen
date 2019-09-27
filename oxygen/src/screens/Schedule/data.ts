import faker from 'faker'

const cats = ['sport', 'festival', 'movie', 'tourism', 'trip']
export function getCategory () {
  return faker.random.arrayElement(cats)
}

export type Category = string
export type EventDates = {
  start: Date
  end?: Date
}
export interface Event {
  id: string
  title: string
  description: string
  categories: Category[]
  date: EventDates
  address: string
  reservable: boolean
}

export function getEvent (): Event {
  const future = faker.date.future(0)
  return {
    id: faker.random.uuid(),
    title: faker.lorem.words(2),
    description: faker.lorem.paragraph(),
    categories: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, getCategory),
    date: {
      start: faker.date.recent(10),
      end: faker.random.boolean() && faker.date.future(0, future)
    },
    address: faker.address.streetAddress(),
    reservable: faker.random.boolean()
  }
}

export function genEvents (): Event[] {
  return Array.from({ length: faker.random.number({ min: 20, max: 30 }) }, getEvent)
}
