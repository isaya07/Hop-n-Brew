import { vi, beforeEach, afterEach } from 'vitest'
import { config } from '@vue/test-utils'

// Mocks globaux
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

// Mock de l'API IndexedDB/Dexie
vi.mock('dexie', () => {
  const Dexie = vi.fn()
  Dexie.prototype.open = vi.fn().mockResolvedValue(undefined)
  Dexie.prototype.close = vi.fn()
  Dexie.prototype.table = vi.fn().mockReturnThis()
  Dexie.prototype.version = vi.fn().mockReturnThis()
  Dexie.prototype.stores = vi.fn().mockReturnThis()
  return { default: Dexie }
})

// Mock de MongoDB
vi.mock('mongodb', () => ({
  MongoClient: vi.fn().mockImplementation(() => ({
    connect: vi.fn().mockResolvedValue(undefined),
    close: vi.fn(),
    db: vi.fn().mockReturnThis(),
    collection: vi.fn().mockReturnThis(),
    find: vi.fn().mockReturnThis(),
    toArray: vi.fn().mockResolvedValue([]),
    insertOne: vi.fn().mockResolvedValue({ insertedId: 'mock-id' }),
    updateOne: vi.fn().mockResolvedValue({ modifiedCount: 1 }),
    deleteOne: vi.fn().mockResolvedValue({ deletedCount: 1 })
  }))
}))

// Reset mocks avant chaque test
beforeEach(() => {
  vi.clearAllMocks()
})

// Nettoyage après chaque test
afterEach(() => {
  vi.restoreAllMocks()
})