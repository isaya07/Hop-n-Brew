import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SyncManager } from '../../lib/sync-manager'
import { Database } from '../../lib/database'
import { MongoClient } from 'mongodb'

// Mock de la base de données
vi.mock('../../lib/database', () => {
  return {
    Database: vi.fn().mockImplementation(() => ({
      open: vi.fn().mockResolvedValue(undefined),
      close: vi.fn().mockResolvedValue(undefined),
      getUsers: vi.fn().mockResolvedValue([]),
      getRecipes: vi.fn().mockResolvedValue([]),
      getIngredients: vi.fn().mockResolvedValue([]),
      getProfiles: vi.fn().mockResolvedValue([]),
      addUser: vi.fn().mockResolvedValue(1),
      addRecipe: vi.fn().mockResolvedValue(1),
      addIngredient: vi.fn().mockResolvedValue(1),
      addProfile: vi.fn().mockResolvedValue(1),
      updateUser: vi.fn().mockResolvedValue(1),
      updateRecipe: vi.fn().mockResolvedValue(1),
      updateIngredient: vi.fn().mockResolvedValue(1),
      updateProfile: vi.fn().mockResolvedValue(1)
    }))
  }
})

// Mock de MongoDB
vi.mock('mongodb', () => {
  const mockCollection = {
    find: vi.fn().mockReturnThis(),
    toArray: vi.fn().mockResolvedValue([]),
    insertOne: vi.fn().mockResolvedValue({ insertedId: 'mock-id' }),
    replaceOne: vi.fn().mockResolvedValue({ modifiedCount: 1 }),
    deleteOne: vi.fn().mockResolvedValue({ deletedCount: 1 })
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

describe('SyncManager', () => {
  let syncManager: SyncManager
  const mockConnectionString = 'mongodb://localhost:27017/test'
  
  beforeEach(() => {
    syncManager = new SyncManager(mockConnectionString)
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  it('creates SyncManager instance correctly', () => {
    expect(syncManager).toBeInstanceOf(SyncManager)
    expect(MongoClient).toHaveBeenCalledWith(mockConnectionString)
  })
  
  it('connects to MongoDB', async () => {
    await syncManager.connect()
    expect(syncManager.client.connect).toHaveBeenCalled()
  })
  
  describe('User synchronization', () => {
    it('syncs users from local to cloud', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ]
      
      // Mock des données locales
      ;(syncManager.db.getUsers as jest.Mock).mockResolvedValue(mockUsers)
      
      // Mock de la collection MongoDB
      const mockUsersCollection = {
        replaceOne: vi.fn().mockResolvedValue({ upsertedCount: 1 })
      }
      syncManager.client.db().collection.mockReturnValue(mockUsersCollection)
      
      await syncManager.syncUsers(syncManager.client.db())
      
      expect(syncManager.db.getUsers).toHaveBeenCalled()
      expect(mockUsersCollection.replaceOne).toHaveBeenCalledTimes(mockUsers.length)
    })
    
    it('syncs users from cloud to local', async () => {
      const mockRemoteUsers = [
        { _id: 'remote-1', name: 'Remote User 1', email: 'user1@example.com' },
        { _id: 'remote-2', name: 'Remote User 2', email: 'user2@example.com' }
      ]
      
      // Mock de la collection MongoDB
      const mockUsersCollection = {
        find: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue(mockRemoteUsers)
      }
      syncManager.client.db().collection.mockReturnValue(mockUsersCollection)
      
      await syncManager.syncUsers(syncManager.client.db())
      
      expect(mockUsersCollection.find).toHaveBeenCalledWith({})
      expect(mockUsersCollection.toArray).toHaveBeenCalled()
      expect(syncManager.db.addUser).toHaveBeenCalledTimes(mockRemoteUsers.length)
    })
  })
  
  describe('Recipe synchronization', () => {
    it('syncs recipes from local to cloud', async () => {
      const mockRecipes = [
        { id: 1, name: 'Recipe 1', description: 'Test recipe 1' },
        { id: 2, name: 'Recipe 2', description: 'Test recipe 2' }
      ]
      
      // Mock des données locales
      ;(syncManager.db.getRecipes as jest.Mock).mockResolvedValue(mockRecipes)
      
      // Mock de la collection MongoDB
      const mockRecipesCollection = {
        replaceOne: vi.fn().mockResolvedValue({ upsertedCount: 1 })
      }
      syncManager.client.db().collection.mockReturnValue(mockRecipesCollection)
      
      await syncManager.syncRecipes(syncManager.client.db())
      
      expect(syncManager.db.getRecipes).toHaveBeenCalled()
      expect(mockRecipesCollection.replaceOne).toHaveBeenCalledTimes(mockRecipes.length)
    })
    
    it('syncs recipes from cloud to local', async () => {
      const mockRemoteRecipes = [
        { _id: 'remote-1', name: 'Remote Recipe 1', description: 'Test recipe 1' },
        { _id: 'remote-2', name: 'Remote Recipe 2', description: 'Test recipe 2' }
      ]
      
      // Mock de la collection MongoDB
      const mockRecipesCollection = {
        find: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue(mockRemoteRecipes)
      }
      syncManager.client.db().collection.mockReturnValue(mockRecipesCollection)
      
      await syncManager.syncRecipes(syncManager.client.db())
      
      expect(mockRecipesCollection.find).toHaveBeenCalledWith({})
      expect(mockRecipesCollection.toArray).toHaveBeenCalled()
      expect(syncManager.db.addRecipe).toHaveBeenCalledTimes(mockRemoteRecipes.length)
    })
  })
  
  describe('Ingredient synchronization', () => {
    it('syncs ingredients from local to cloud', async () => {
      const mockIngredients = [
        { id: 1, name: 'Ingredient 1', type: 'fermentable' },
        { id: 2, name: 'Ingredient 2', type: 'hop' }
      ]
      
      // Mock des données locales
      ;(syncManager.db.getIngredients as jest.Mock).mockResolvedValue(mockIngredients)
      
      // Mock de la collection MongoDB
      const mockIngredientsCollection = {
        replaceOne: vi.fn().mockResolvedValue({ upsertedCount: 1 })
      }
      syncManager.client.db().collection.mockReturnValue(mockIngredientsCollection)
      
      await syncManager.syncIngredients(syncManager.client.db())
      
      expect(syncManager.db.getIngredients).toHaveBeenCalled()
      expect(mockIngredientsCollection.replaceOne).toHaveBeenCalledTimes(mockIngredients.length)
    })
    
    it('syncs ingredients from cloud to local', async () => {
      const mockRemoteIngredients = [
        { _id: 'remote-1', name: 'Remote Ingredient 1', type: 'fermentable' },
        { _id: 'remote-2', name: 'Remote Ingredient 2', type: 'hop' }
      ]
      
      // Mock de la collection MongoDB
      const mockIngredientsCollection = {
        find: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue(mockRemoteIngredients)
      }
      syncManager.client.db().collection.mockReturnValue(mockIngredientsCollection)
      
      await syncManager.syncIngredients(syncManager.client.db())
      
      expect(mockIngredientsCollection.find).toHaveBeenCalledWith({})
      expect(mockIngredientsCollection.toArray).toHaveBeenCalled()
      expect(syncManager.db.addIngredient).toHaveBeenCalledTimes(mockRemoteIngredients.length)
    })
  })
  
  describe('Profile synchronization', () => {
    it('syncs profiles from local to cloud', async () => {
      const mockProfiles = [
        { id: 1, name: 'Profile 1', type: 'style' },
        { id: 2, name: 'Profile 2', type: 'equipment' }
      ]
      
      // Mock des données locales
      ;(syncManager.db.getProfiles as jest.Mock).mockResolvedValue(mockProfiles)
      
      // Mock de la collection MongoDB
      const mockProfilesCollection = {
        replaceOne: vi.fn().mockResolvedValue({ upsertedCount: 1 })
      }
      syncManager.client.db().collection.mockReturnValue(mockProfilesCollection)
      
      await syncManager.syncProfiles(syncManager.client.db())
      
      expect(syncManager.db.getProfiles).toHaveBeenCalled()
      expect(mockProfilesCollection.replaceOne).toHaveBeenCalledTimes(mockProfiles.length)
    })
    
    it('syncs profiles from cloud to local', async () => {
      const mockRemoteProfiles = [
        { _id: 'remote-1', name: 'Remote Profile 1', type: 'style' },
        { _id: 'remote-2', name: 'Remote Profile 2', type: 'equipment' }
      ]
      
      // Mock de la collection MongoDB
      const mockProfilesCollection = {
        find: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue(mockRemoteProfiles)
      }
      syncManager.client.db().collection.mockReturnValue(mockProfilesCollection)
      
      await syncManager.syncProfiles(syncManager.client.db())
      
      expect(mockProfilesCollection.find).toHaveBeenCalledWith({})
      expect(mockProfilesCollection.toArray).toHaveBeenCalled()
      expect(syncManager.db.addProfile).toHaveBeenCalledTimes(mockRemoteProfiles.length)
    })
  })
  
  describe('Full synchronization', () => {
    it('performs complete sync when online', async () => {
      // Simuler l'état en ligne
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        configurable: true,
        value: true
      })
      
      await syncManager.sync()
      
      expect(syncManager.client.connect).toHaveBeenCalled()
      expect(syncManager.client.db).toHaveBeenCalled()
      expect(syncManager.client.close).toHaveBeenCalled()
    })
    
    it('skips sync when offline', async () => {
      // Simuler l'état hors ligne
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        configurable: true,
        value: false
      })
      
      await syncManager.sync()
      
      expect(syncManager.client.connect).not.toHaveBeenCalled()
    })
  })
})