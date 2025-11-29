import { db, IUser, IRecipe, IIngredient, IProfile } from './database';
import { Equipment } from './recipes/Equipment';
import { Style } from './recipes/Style';
import { Fermentation } from './recipes/Fermentation';
import { Carbonation } from './recipes/Carbonation';
import { Mash } from './recipes/Mash';
import { SyncManager } from './sync-manager';

export interface IApiResult<T> {
  success: boolean;
  data?: T;
 error?: string;
}

export class LegacyApiManager {
  private syncManager: SyncManager;

  constructor(mongodbUri: string) {
    this.syncManager = new SyncManager(mongodbUri);
  }

  // User operations
  async getUsers(): Promise<IApiResult<IUser[]>> {
    try {
      const users = await db.users.toArray();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async getUser(id: number): Promise<IApiResult<IUser>> {
    try {
      const user = await db.users.get(id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async createUser(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IApiResult<IUser>> {
    try {
      const now = new Date();
      const newUser: IUser = {
        ...user,
        createdAt: now,
        updatedAt: now
      };
      const id = await db.users.add(newUser);
      const createdUser = await db.users.get(id);
      return { success: true, data: createdUser! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async updateUser(id: number, user: Partial<IUser>): Promise<IApiResult<IUser>> {
    try {
      const existingUser = await db.users.get(id);
      if (!existingUser) {
        return { success: false, error: 'User not found' };
      }
      
      await db.users.update(id, { ...user, updatedAt: new Date() });
      const updatedUser = await db.users.get(id);
      return { success: true, data: updatedUser! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async deleteUser(id: number): Promise<IApiResult<boolean>> {
    try {
      await db.users.delete(id);
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 // Recipe operations
 async getRecipes(): Promise<IApiResult<IRecipe[]>> {
    try {
      const recipes = await db.recipes.toArray();
      return { success: true, data: recipes };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async getRecipe(id: number): Promise<IApiResult<IRecipe>> {
    try {
      const recipe = await db.recipes.get(id);
      if (!recipe) {
        return { success: false, error: 'Recipe not found' };
      }
      return { success: true, data: recipe };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async createRecipe(recipe: Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<IApiResult<IRecipe>> {
    try {
      const now = new Date();
      // S'assurer que les tableaux d'ingrédients sont initialisés
      const newRecipe: IRecipe = {
        ...recipe,
        fermentables: recipe.fermentables || [],
        hops: recipe.hops || [],
        yeasts: recipe.yeasts || [],
        miscs: recipe.miscs || [],
        waters: recipe.waters || [],
        createdAt: now,
        updatedAt: now
      };
      const id = await db.recipes.add(newRecipe);
      const createdRecipe = await db.recipes.get(id);
      return { success: true, data: createdRecipe! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async updateRecipe(id: number, recipe: Partial<IRecipe>): Promise<IApiResult<IRecipe>> {
    try {
      const existingRecipe = await db.recipes.get(id);
      if (!existingRecipe) {
        return { success: false, error: 'Recipe not found' };
      }
      
      // Convertir les objets de recette en objets sérialisables pour la base de données
      const recipeForDB = this.serializeRecipe(recipe);
      await db.recipes.update(id, { ...recipeForDB, updatedAt: new Date() });
      const updatedRecipe = await db.recipes.get(id);
      return { success: true, data: updatedRecipe! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async deleteRecipe(id: number): Promise<IApiResult<boolean>> {
    try {
      await db.recipes.delete(id);
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 // Ingredient operations
 async getIngredients(): Promise<IApiResult<IIngredient[]>> {
    try {
      const ingredients = await db.ingredients.toArray();
      return { success: true, data: ingredients };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async getIngredient(id: number): Promise<IApiResult<IIngredient>> {
    try {
      const ingredient = await db.ingredients.get(id);
      if (!ingredient) {
        return { success: false, error: 'Ingredient not found' };
      }
      return { success: true, data: ingredient };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async createIngredient(ingredient: Omit<IIngredient, 'id' | 'createdAt' | 'updatedAt'>): Promise<IApiResult<IIngredient>> {
    try {
      const now = new Date();
      const newIngredient: IIngredient = {
        ...ingredient,
        createdAt: now,
        updatedAt: now
      };
      const id = await db.ingredients.add(newIngredient);
      const createdIngredient = await db.ingredients.get(id);
      return { success: true, data: createdIngredient! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async updateIngredient(id: number, ingredient: Partial<IIngredient>): Promise<IApiResult<IIngredient>> {
    try {
      const existingIngredient = await db.ingredients.get(id);
      if (!existingIngredient) {
        return { success: false, error: 'Ingredient not found' };
      }
      
      await db.ingredients.update(id, { ...ingredient, updatedAt: new Date() });
      const updatedIngredient = await db.ingredients.get(id);
      return { success: true, data: updatedIngredient! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async deleteIngredient(id: number): Promise<IApiResult<boolean>> {
    try {
      await db.ingredients.delete(id);
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  // Profile operations
  async getProfiles(): Promise<IApiResult<IProfile[]>> {
    try {
      const profiles = await db.profiles.toArray();
      return { success: true, data: profiles };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async getProfile(id: number): Promise<IApiResult<IProfile>> {
    try {
      const profile = await db.profiles.get(id);
      if (!profile) {
        return { success: false, error: 'Profile not found' };
      }
      return { success: true, data: profile };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async createProfile(profile: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<IApiResult<IProfile>> {
    try {
      const now = new Date();
      const newProfile: IProfile = {
        ...profile,
        createdAt: now,
        updatedAt: now
      };
      const id = await db.profiles.add(newProfile);
      const createdProfile = await db.profiles.get(id);
      return { success: true, data: createdProfile! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async updateProfile(id: number, profile: Partial<IProfile>): Promise<IApiResult<IProfile>> {
    try {
      const existingProfile = await db.profiles.get(id);
      if (!existingProfile) {
        return { success: false, error: 'Profile not found' };
      }
      
      await db.profiles.update(id, { ...profile, updatedAt: new Date() });
      const updatedProfile = await db.profiles.get(id);
      return { success: true, data: updatedProfile! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async deleteProfile(id: number): Promise<IApiResult<boolean>> {
    try {
      await db.profiles.delete(id);
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 // Sync operations
 async sync() {
    await this.syncManager.sync();
  }

  // Méthodes utilitaires pour la sérialisation
  private serializeRecipe(recipe: Partial<IRecipe>): Partial<IRecipe> {
    // Pour l'instant, on retourne l'objet tel quel car il est déjà sérialisable
    // On pourrait ajouter une logique plus complexe si nécessaire
    return JSON.parse(JSON.stringify(recipe));
  }

  // Méthodes spécifiques pour les ingrédients dans une recette
  async addIngredientToRecipe(recipeId: number, ingredientType: string, ingredient: any): Promise<IApiResult<IRecipe>> {
    try {
      const recipe = await db.recipes.get(recipeId);
      if (!recipe) {
        return { success: false, error: 'Recipe not found' };
      }

      // Ajouter l'ingrédient au tableau approprié
      switch(ingredientType) {
        case 'fermentable':
          if (!recipe.fermentables) recipe.fermentables = [];
          recipe.fermentables.push(ingredient);
          break;
        case 'hop':
          if (!recipe.hops) recipe.hops = [];
          recipe.hops.push(ingredient);
          break;
        case 'yeast':
          if (!recipe.yeasts) recipe.yeasts = [];
          recipe.yeasts.push(ingredient);
          break;
        case 'misc':
          if (!recipe.miscs) recipe.miscs = [];
          recipe.miscs.push(ingredient);
          break;
        case 'water':
          if (!recipe.waters) recipe.waters = [];
          recipe.waters.push(ingredient);
          break;
        default:
          return { success: false, error: 'Invalid ingredient type' };
      }

      await db.recipes.update(recipeId, { ...recipe, updatedAt: new Date() });
      const updatedRecipe = await db.recipes.get(recipeId);
      return { success: true, data: updatedRecipe! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

 async removeIngredientFromRecipe(recipeId: number, ingredientType: string, ingredientIndex: number): Promise<IApiResult<IRecipe>> {
    try {
      const recipe = await db.recipes.get(recipeId);
      if (!recipe) {
        return { success: false, error: 'Recipe not found' };
      }

      // Retirer l'ingrédient du tableau approprié
      switch(ingredientType) {
        case 'fermentable':
          if (recipe.fermentables && recipe.fermentables.length > ingredientIndex) {
            recipe.fermentables.splice(ingredientIndex, 1);
          }
          break;
        case 'hop':
          if (recipe.hops && recipe.hops.length > ingredientIndex) {
            recipe.hops.splice(ingredientIndex, 1);
          }
          break;
        case 'yeast':
          if (recipe.yeasts && recipe.yeasts.length > ingredientIndex) {
            recipe.yeasts.splice(ingredientIndex, 1);
          }
          break;
        case 'misc':
          if (recipe.miscs && recipe.miscs.length > ingredientIndex) {
            recipe.miscs.splice(ingredientIndex, 1);
          }
          break;
        case 'water':
          if (recipe.waters && recipe.waters.length > ingredientIndex) {
            recipe.waters.splice(ingredientIndex, 1);
          }
          break;
        default:
          return { success: false, error: 'Invalid ingredient type' };
      }

      await db.recipes.update(recipeId, { ...recipe, updatedAt: new Date() });
      const updatedRecipe = await db.recipes.get(recipeId);
      return { success: true, data: updatedRecipe! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}