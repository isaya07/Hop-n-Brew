import { defineStore } from 'pinia';
import apiManager from '@/lib/api/index';
import type { IApiRecipe } from '@/lib/api/types';

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes: [] as IApiRecipe[],
    currentRecipe: null as IApiRecipe | null,
    loading: false,
    error: null as string | null,
    lastFetch: null as Date | null,
  }),

  getters: {
    allRecipes: (state) => state.recipes,
    recipeById: (state) => (id: number) => state.recipes.find(recipe => recipe.id === id),
    recipeCount: (state) => state.recipes.length,
    isOfflineMode: (state) => state.lastFetch !== null && !state.loading,
  },

  actions: {
    async fetchRecipes(force: boolean = false) {
      // Vérifier si les données sont déjà récentes et pas de force refresh
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 1000) { // 5 minutes
        return { success: true, data: this.recipes };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.recipes.getAll();
        if (result.success) {
          this.recipes = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.recipes };
        } else {
          this.error = result.error || null;
          return { success: false, error: result.error || null };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async fetchRecipeById(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.recipes.getById(id);
        if (result.success && result.data) {
          // Mettre à jour la liste des recettes si la recette existe déjà
          const existingIndex = this.recipes.findIndex(r => r.id === id);
          if (existingIndex !== -1) {
            this.recipes[existingIndex] = result.data;
          } else {
            // Sinon, ajouter la recette à la liste
            if (!this.recipes.some(r => r.id === id)) {
              this.recipes.push(result.data);
            }
          }
          
          this.currentRecipe = result.data;
          return { success: true, data: result.data };
        } else {
          this.error = result.error || null;
          return { success: false, error: result.error || null };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async createRecipe(recipe: Omit<IApiRecipe, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.recipes.create(recipe as IApiRecipe);
        if (result.success && result.data) {
          this.recipes.push(result.data);
          this.currentRecipe = result.data;
          return { success: true, data: result.data };
        } else {
          this.error = result.error || null;
          return { success: false, error: result.error || null };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateRecipe(id: number, recipe: Partial<IApiRecipe>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.recipes.update(id, recipe);
        if (result.success && result.data) {
          const index = this.recipes.findIndex(r => r.id === id);
          if (index !== -1) {
            this.recipes[index] = result.data;
          }
          
          if (this.currentRecipe?.id === id) {
            this.currentRecipe = result.data;
          }
          
          return { success: true, data: result.data };
        } else {
          this.error = result.error || null;
          return { success: false, error: result.error || null };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteRecipe(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.recipes.delete(id);
        if (result.success) {
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
          if (this.currentRecipe?.id === id) {
            this.currentRecipe = null;
          }
          return { success: true, data: true };
        } else {
          this.error = result.error || null;
          return { success: false, error: result.error || null };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour synchroniser les données avec le serveur
    async syncRecipes() {
      try {
        // Dans une implémentation complète, on utiliserait le SyncManager
        // Pour l'instant, on fait juste un refresh
        return await this.fetchRecipes(true);
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      }
    },

    // Méthode pour ajouter une recette à l'état local sans sauvegarder sur le serveur
    addRecipeToLocal(recipe: IApiRecipe) {
      if (!this.recipes.some(r => r.id === recipe.id)) {
        this.recipes.push(recipe);
      }
    },

    // Méthode pour supprimer une recette de l'état local
    removeRecipeFromLocal(id: number) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      if (this.currentRecipe?.id === id) {
        this.currentRecipe = null;
      }
    },
  },
});