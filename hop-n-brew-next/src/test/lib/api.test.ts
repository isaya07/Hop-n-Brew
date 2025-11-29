import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ApiManager } from '../../lib/api'
import { db } from '../../lib/database'
import { SyncManager } from '../../lib/sync-manager'

// Mock de la base de données Dexie
vi.mock('../../lib/database', async () => {
  const actual = await vi.importActual('../../lib/database')
  return {
    ...actual,
    db: {
      users: {
        toArray: vi.fn().mockResolvedValue([]),
        get: vi.fn().mockResolvedValue(null),
        add: vi.fn().mockResolvedValue(1),
        update: vi.fn().mockResolvedValue(1),
        delete: vi.fn().mockResolvedValue(1)
      },
      recipes: {
        toArray: vi.fn().mockResolvedValue([]),
        get: vi.fn().mockResolvedValue(null),
        add: vi.fn().mockResolvedValue(1),
        update: vi.fn().mockResolvedValue(1),
        delete: vi.fn().mockResolvedValue(1)
      },
      ingredients: {
        toArray: vi.fn().mockResolvedValue([]),
        get: vi.fn().mockResolvedValue(null),
        add: vi.fn().mockResolvedValue(1),
        update: vi.fn().mockResolvedValue(1),
        delete: vi.fn().mockResolvedValue(1)
      },
      profiles: {
        toArray: vi.fn().mockResolvedValue([]),
        get: vi.fn().mockResolvedValue(null),
        add: vi.fn().mockResolvedValue(1),
        update: vi.fn().mockResolvedValue(1),
        delete: vi.fn().mockResolvedValue(1)
      }
    }
  }
})

// Mock du SyncManager
vi.mock('../../lib/sync-manager', () => {
  return {
    SyncManager: vi.fn().mockImplementation(() => ({
      sync: vi.fn().mockResolvedValue(undefined)
    }))
  }
})

describe('ApiManager', () => {
  let apiManager: ApiManager
  const mockConnectionString = 'mongodb://localhost:27017/test'
  
  beforeEach(() => {
    apiManager = new ApiManager(mockConnectionString)
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  it('creates ApiManager instance correctly', () => {
    expect(apiManager).toBeInstanceOf(ApiManager)
  })
  
  describe('User operations', () => {
    it('gets all users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'User 2', email: 'user2@example.com', createdAt: new Date(), updatedAt: new Date() }
      ]
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.users, 'toArray').mockResolvedValue(mockUsers)
      
      const result = await apiManager.getUsers()
      
      expect(result).toEqual({ success: true, data: mockUsers })
      expect(db.users.toArray).toHaveBeenCalled()
    })
    
    it('gets a user by id', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.users, 'get').mockResolvedValue(mockUser)
      
      const result = await apiManager.getUser(1)
      
      expect(result).toEqual({ success: true, data: mockUser })
      expect(db.users.get).toHaveBeenCalledWith(1)
    })
    
    it('creates a new user', async () => {
      const userData = {
        name: 'New User',
        email: 'new@example.com'
      }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.users, 'add').mockResolvedValue(1)
      vi.spyOn(db.users, 'get').mockResolvedValue({ id: 1, ...userData, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.createUser(userData)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.users.add).toHaveBeenCalledWith(expect.objectContaining(userData))
    })
    
    it('updates a user', async () => {
      const userId = 1
      const updates = { name: 'Updated User' }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.users, 'get').mockResolvedValue({ id: userId, name: 'Updated User', email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.updateUser(userId, updates)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.users.update).toHaveBeenCalledWith(userId, expect.objectContaining(updates))
    })
    
    it('deletes a user', async () => {
      const userId = 1
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.users, 'delete').mockResolvedValue(undefined)
      
      const result = await apiManager.deleteUser(userId)
      
      expect(result).toEqual({ success: true, data: true })
      expect(db.users.delete).toHaveBeenCalledWith(userId)
    })
  })
  
  describe('Recipe operations', () => {
    it('gets all recipes', async () => {
      const mockRecipes = [
        { id: 1, name: 'Recipe 1', description: 'Test recipe 1', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Recipe 2', description: 'Test recipe 2', createdAt: new Date(), updatedAt: new Date() }
      ]
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.recipes, 'toArray').mockResolvedValue(mockRecipes)
      
      const result = await apiManager.getRecipes()
      
      expect(result).toEqual({ success: true, data: mockRecipes })
      expect(db.recipes.toArray).toHaveBeenCalled()
    })
    
    it('gets a recipe by id', async () => {
      const mockRecipe = { id: 1, name: 'Test Recipe', description: 'Test recipe', createdAt: new Date(), updatedAt: new Date() }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.recipes, 'get').mockResolvedValue(mockRecipe)
      
      const result = await apiManager.getRecipe(1)
      
      expect(result).toEqual({ success: true, data: mockRecipe })
      expect(db.recipes.get).toHaveBeenCalledWith(1)
    })
    
    it('creates a new recipe', async () => {
      const recipeData = {
        name: 'New Recipe',
        description: 'New test recipe'
      }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.recipes, 'add').mockResolvedValue(1)
      vi.spyOn(db.recipes, 'get').mockResolvedValue({ id: 1, ...recipeData, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.createRecipe(recipeData)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.recipes.add).toHaveBeenCalledWith(expect.objectContaining(recipeData))
    })
    
    it('updates a recipe', async () => {
      const recipeId = 1
      const updates = { name: 'Updated Recipe' }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.recipes, 'get').mockResolvedValue({ id: recipeId, name: 'Updated Recipe', description: 'Test recipe', createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.updateRecipe(recipeId, updates)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.recipes.update).toHaveBeenCalledWith(recipeId, expect.objectContaining(updates))
    })
    
    it('deletes a recipe', async () => {
      const recipeId = 1
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.recipes, 'delete').mockResolvedValue(undefined)
      
      const result = await apiManager.deleteRecipe(recipeId)
      
      expect(result).toEqual({ success: true, data: true })
      expect(db.recipes.delete).toHaveBeenCalledWith(recipeId)
    })
  })
  
  describe('Ingredient operations', () => {
    it('gets all ingredients', async () => {
      const mockIngredients = [
        { id: 1, name: 'Ingredient 1', type: 'fermentable', attributes: {}, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Ingredient 2', type: 'hop', attributes: {}, createdAt: new Date(), updatedAt: new Date() }
      ]
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.ingredients, 'toArray').mockResolvedValue(mockIngredients)
      
      const result = await apiManager.getIngredients()
      
      expect(result).toEqual({ success: true, data: mockIngredients })
      expect(db.ingredients.toArray).toHaveBeenCalled()
    })
    
    it('gets an ingredient by id', async () => {
      const mockIngredient = { id: 1, name: 'Test Ingredient', type: 'fermentable', attributes: {}, createdAt: new Date(), updatedAt: new Date() }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.ingredients, 'get').mockResolvedValue(mockIngredient)
      
      const result = await apiManager.getIngredient(1)
      
      expect(result).toEqual({ success: true, data: mockIngredient })
      expect(db.ingredients.get).toHaveBeenCalledWith(1)
    })
    
    it('creates a new ingredient', async () => {
      const ingredientData = {
        name: 'New Ingredient',
        type: 'fermentable' as const,
        attributes: {}
      }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.ingredients, 'add').mockResolvedValue(1)
      vi.spyOn(db.ingredients, 'get').mockResolvedValue({ id: 1, ...ingredientData, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.createIngredient(ingredientData)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.ingredients.add).toHaveBeenCalledWith(expect.objectContaining(ingredientData))
    })
    
    it('updates an ingredient', async () => {
      const ingredientId = 1
      const updates = { name: 'Updated Ingredient' }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.ingredients, 'get').mockResolvedValue({ id: ingredientId, name: 'Updated Ingredient', type: 'fermentable', attributes: {}, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.updateIngredient(ingredientId, updates)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.ingredients.update).toHaveBeenCalledWith(ingredientId, expect.objectContaining(updates))
    })
    
    it('deletes an ingredient', async () => {
      const ingredientId = 1
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.ingredients, 'delete').mockResolvedValue(undefined)
      
      const result = await apiManager.deleteIngredient(ingredientId)
      
      expect(result).toEqual({ success: true, data: true })
      expect(db.ingredients.delete).toHaveBeenCalledWith(ingredientId)
    })
  })
  
  describe('Profile operations', () => {
    it('gets all profiles', async () => {
      const mockProfiles = [
        { id: 1, name: 'Profile 1', type: 'style', attributes: {}, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Profile 2', type: 'equipment', attributes: {}, createdAt: new Date(), updatedAt: new Date() }
      ]
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.profiles, 'toArray').mockResolvedValue(mockProfiles)
      
      const result = await apiManager.getProfiles()
      
      expect(result).toEqual({ success: true, data: mockProfiles })
      expect(db.profiles.toArray).toHaveBeenCalled()
    })
    
    it('gets a profile by id', async () => {
      const mockProfile = { id: 1, name: 'Test Profile', type: 'style', attributes: {}, createdAt: new Date(), updatedAt: new Date() }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.profiles, 'get').mockResolvedValue(mockProfile)
      
      const result = await apiManager.getProfile(1)
      
      expect(result).toEqual({ success: true, data: mockProfile })
      expect(db.profiles.get).toHaveBeenCalledWith(1)
    })
    
    it('creates a new profile', async () => {
      const profileData = {
        name: 'New Profile',
        type: 'style' as const,
        attributes: {}
      }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.profiles, 'add').mockResolvedValue(1)
      vi.spyOn(db.profiles, 'get').mockResolvedValue({ id: 1, ...profileData, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.createProfile(profileData)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.profiles.add).toHaveBeenCalledWith(expect.objectContaining(profileData))
    })
    
    it('updates a profile', async () => {
      const profileId = 1
      const updates = { name: 'Updated Profile' }
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.profiles, 'get').mockResolvedValue({ id: profileId, name: 'Updated Profile', type: 'style', attributes: {}, createdAt: new Date(), updatedAt: new Date() })
      
      const result = await apiManager.updateProfile(profileId, updates)
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(db.profiles.update).toHaveBeenCalledWith(profileId, expect.objectContaining(updates))
    })
    
    it('deletes a profile', async () => {
      const profileId = 1
      
      // Mock de la réponse de la base de données
      vi.spyOn(db.profiles, 'delete').mockResolvedValue(undefined)
      
      const result = await apiManager.deleteProfile(profileId)
      
      expect(result).toEqual({ success: true, data: true })
      expect(db.profiles.delete).toHaveBeenCalledWith(profileId)
    })
  })
  
  describe('Synchronization', () => {
    it('performs sync operation', async () => {
      await apiManager.sync()
      
      expect(apiManager['syncManager'].sync).toHaveBeenCalled()
    })
  })
})