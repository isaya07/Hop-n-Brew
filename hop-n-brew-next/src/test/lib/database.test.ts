import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Database } from '../../lib/database'
import Dexie from 'dexie'

// Mock de Dexie
vi.mock('dexie', () => {
  const mockDexie = {
    version: vi.fn().mockReturnThis(),
    stores: vi.fn().mockReturnThis(),
    open: vi.fn().mockResolvedValue(undefined),
    close: vi.fn(),
    table: vi.fn().mockReturnThis(),
    add: vi.fn().mockResolvedValue(1),
    put: vi.fn().mockResolvedValue(1),
    get: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
    where: vi.fn().mockReturnThis(),
    equals: vi.fn().mockReturnThis(),
    toArray: vi.fn().mockResolvedValue([{ id: 1, name: 'Test' }]),
    delete: vi.fn().mockResolvedValue(1),
    update: vi.fn().mockResolvedValue(1)
  }
  
  return {
    default: vi.fn(() => mockDexie),
    ...mockDexie
  }
})

describe('Database', () => {
  let db: Database
  
  beforeEach(() => {
    db = new Database()
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  it('creates database instance correctly', () => {
    expect(db).toBeInstanceOf(Database)
    expect(Dexie).toHaveBeenCalledWith('HopNBrewDatabase')
  })
  
  it('opens database connection', async () => {
    await db.open()
    expect(db.db.open).toHaveBeenCalled()
  })
  
  it('closes database connection', async () => {
    await db.close()
    expect(db.db.close).toHaveBeenCalled()
  })
  
  describe('User operations', () => {
    it('adds a user', async () => {
      const user = { 
        name: 'Test User', 
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await db.addUser(user)
      expect(result).toBe(1)
      expect(db.db.users.add).toHaveBeenCalledWith(user)
    })
    
    it('gets a user by id', async () => {
      const result = await db.getUser(1)
      expect(result).toEqual({ id: 1, name: 'Test' })
      expect(db.db.users.get).toHaveBeenCalledWith(1)
    })
    
    it('gets all users', async () => {
      const result = await db.getUsers()
      expect(result).toEqual([{ id: 1, name: 'Test' }])
      expect(db.db.users.toArray).toHaveBeenCalled()
    })
    
    it('updates a user', async () => {
      const updates = { name: 'Updated Name' }
      const result = await db.updateUser(1, updates)
      expect(result).toBe(1)
      expect(db.db.users.update).toHaveBeenCalledWith(1, updates)
    })
    
    it('deletes a user', async () => {
      const result = await db.deleteUser(1)
      expect(result).toBe(1)
      expect(db.db.users.delete).toHaveBeenCalledWith(1)
    })
  })
  
  describe('Recipe operations', () => {
    it('adds a recipe', async () => {
      const recipe = {
        name: 'Test Recipe',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await db.addRecipe(recipe)
      expect(result).toBe(1)
      expect(db.db.recipes.add).toHaveBeenCalledWith(recipe)
    })
    
    it('gets a recipe by id', async () => {
      const result = await db.getRecipe(1)
      expect(result).toEqual({ id: 1, name: 'Test' })
      expect(db.db.recipes.get).toHaveBeenCalledWith(1)
    })
    
    it('gets all recipes', async () => {
      const result = await db.getRecipes()
      expect(result).toEqual([{ id: 1, name: 'Test' }])
      expect(db.db.recipes.toArray).toHaveBeenCalled()
    })
    
    it('updates a recipe', async () => {
      const updates = { name: 'Updated Recipe' }
      const result = await db.updateRecipe(1, updates)
      expect(result).toBe(1)
      expect(db.db.recipes.update).toHaveBeenCalledWith(1, updates)
    })
    
    it('deletes a recipe', async () => {
      const result = await db.deleteRecipe(1)
      expect(result).toBe(1)
      expect(db.db.recipes.delete).toHaveBeenCalledWith(1)
    })
  })
  
  describe('Ingredient operations', () => {
    it('adds an ingredient', async () => {
      const ingredient = {
        name: 'Test Ingredient',
        type: 'fermentable' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await db.addIngredient(ingredient)
      expect(result).toBe(1)
      expect(db.db.ingredients.add).toHaveBeenCalledWith(ingredient)
    })
    
    it('gets an ingredient by id', async () => {
      const result = await db.getIngredient(1)
      expect(result).toEqual({ id: 1, name: 'Test' })
      expect(db.db.ingredients.get).toHaveBeenCalledWith(1)
    })
    
    it('gets all ingredients', async () => {
      const result = await db.getIngredients()
      expect(result).toEqual([{ id: 1, name: 'Test' }])
      expect(db.db.ingredients.toArray).toHaveBeenCalled()
    })
    
    it('updates an ingredient', async () => {
      const updates = { name: 'Updated Ingredient' }
      const result = await db.updateIngredient(1, updates)
      expect(result).toBe(1)
      expect(db.db.ingredients.update).toHaveBeenCalledWith(1, updates)
    })
    
    it('deletes an ingredient', async () => {
      const result = await db.deleteIngredient(1)
      expect(result).toBe(1)
      expect(db.db.ingredients.delete).toHaveBeenCalledWith(1)
    })
  })
  
  describe('Profile operations', () => {
    it('adds a profile', async () => {
      const profile = {
        name: 'Test Profile',
        type: 'style' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await db.addProfile(profile)
      expect(result).toBe(1)
      expect(db.db.profiles.add).toHaveBeenCalledWith(profile)
    })
    
    it('gets a profile by id', async () => {
      const result = await db.getProfile(1)
      expect(result).toEqual({ id: 1, name: 'Test' })
      expect(db.db.profiles.get).toHaveBeenCalledWith(1)
    })
    
    it('gets all profiles', async () => {
      const result = await db.getProfiles()
      expect(result).toEqual([{ id: 1, name: 'Test' }])
      expect(db.db.profiles.toArray).toHaveBeenCalled()
    })
    
    it('updates a profile', async () => {
      const updates = { name: 'Updated Profile' }
      const result = await db.updateProfile(1, updates)
      expect(result).toBe(1)
      expect(db.db.profiles.update).toHaveBeenCalledWith(1, updates)
    })
    
    it('deletes a profile', async () => {
      const result = await db.deleteProfile(1)
      expect(result).toBe(1)
      expect(db.db.profiles.delete).toHaveBeenCalledWith(1)
    })
  })
})