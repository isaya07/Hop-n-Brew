import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AuthManager } from '../../lib/auth'
import { MongoClient } from 'mongodb'

// Mock de MongoDB
vi.mock('mongodb', () => {
  const mockCollection = {
    findOne: vi.fn(),
    insertOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn()
  }
  
  const mockDb = {
    collection: vi.fn().mockReturnValue(mockCollection)
  }
  
  const mockClient = {
    connect: vi.fn().mockResolvedValue(undefined),
    close: vi.fn(),
    db: vi.fn().mockReturnValue(mockDb)
  }
  
  return {
    MongoClient: vi.fn(() => mockClient),
    ...mockClient,
    ...mockDb,
    ...mockCollection
  }
})

describe('AuthManager', () => {
  let authManager: AuthManager
  const mockConnectionString = 'mongodb://localhost:27017/test'
  
  beforeEach(() => {
    authManager = new AuthManager(mockConnectionString)
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  it('creates AuthManager instance correctly', () => {
    expect(authManager).toBeInstanceOf(AuthManager)
    expect(MongoClient).toHaveBeenCalledWith(mockConnectionString)
  })
  
  it('connects to MongoDB', async () => {
    await authManager.connect()
    expect(authManager.client.connect).toHaveBeenCalled()
    expect(authManager.client.db).toHaveBeenCalled()
  })
  
  describe('User registration', () => {
    it('registers a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      }
      
      // Mock de la réponse MongoDB
      ;(authManager.client.db().collection().insertOne as jest.Mock).mockResolvedValue({
        insertedId: 'mock-user-id'
      })
      
      const result = await authManager.register(userData.email, userData.password, userData.name)
      
      expect(result).toEqual({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        createdAt: expect.any(Date)
      })
      expect(authManager.client.db().collection().insertOne).toHaveBeenCalledWith({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    })
    
    it('fails to register user with existing email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User'
      }
      
      // Mock de la réponse MongoDB - utilisateur déjà existant
      ;(authManager.client.db().collection().findOne as jest.Mock).mockResolvedValue({
        email: userData.email
      })
      
      const result = await authManager.register(userData.email, userData.password, userData.name)
      
      expect(result).toBeNull()
    })
  })
  
  describe('User login', () => {
    it('logs in user with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }
      
      const mockUser = {
        email: loginData.email,
        password: loginData.password,
        name: 'Test User'
      }
      
      // Mock de la réponse MongoDB
      ;(authManager.client.db().collection().findOne as jest.Mock).mockResolvedValue(mockUser)
      
      const result = await authManager.login(loginData.email, loginData.password)
      
      expect(result).toEqual(mockUser)
      expect(authManager.client.db().collection().findOne).toHaveBeenCalledWith({
        email: loginData.email
      })
    })
    
    it('fails to log in with incorrect password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }
      
      const mockUser = {
        email: loginData.email,
        password: 'correctpassword',
        name: 'Test User'
      }
      
      // Mock de la réponse MongoDB
      ;(authManager.client.db().collection().findOne as jest.Mock).mockResolvedValue(mockUser)
      
      const result = await authManager.login(loginData.email, loginData.password)
      
      expect(result).toBeNull()
    })
    
    it('fails to log in with non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      }
      
      // Mock de la réponse MongoDB - utilisateur non trouvé
      ;(authManager.client.db().collection().findOne as jest.Mock).mockResolvedValue(null)
      
      const result = await authManager.login(loginData.email, loginData.password)
      
      expect(result).toBeNull()
    })
  })
  
  describe('User logout', () => {
    it('clears user session', async () => {
      // Mock de localStorage
      const localStorageMock = {
        removeItem: vi.fn()
      }
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      })
      
      await authManager.logout()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('hb_user')
    })
  })
  
  describe('Get current user', () => {
    it('returns current user from localStorage', async () => {
      const mockUser = {
        email: 'test@example.com',
        name: 'Test User'
      }
      
      // Mock de localStorage
      const localStorageMock = {
        getItem: vi.fn().mockReturnValue(JSON.stringify(mockUser))
      }
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      })
      
      const result = await authManager.getCurrentUser()
      
      expect(result).toEqual(mockUser)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('hb_user')
    })
    
    it('returns null when no user in localStorage', async () => {
      // Mock de localStorage vide
      const localStorageMock = {
        getItem: vi.fn().mockReturnValue(null)
      }
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      })
      
      const result = await authManager.getCurrentUser()
      
      expect(result).toBeNull()
    })
  })
})