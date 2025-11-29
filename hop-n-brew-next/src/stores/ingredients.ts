import { defineStore } from 'pinia';
import apiManager from '@/lib/api/index';
import type { IFermentable, IHop, IYeast, IMisc, IWater } from '@/lib/recipes/types';

export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    fermentables: [] as IFermentable[],
    hops: [] as IHop[],
    yeasts: [] as IYeast[],
    miscs: [] as IMisc[],
    waters: [] as IWater[],
    loading: false,
    error: null as string | null,
    lastFetch: null as Date | null,
  }),

  getters: {
    allFermentables: (state) => state.fermentables,
    allHops: (state) => state.hops,
    allYeasts: (state) => state.yeasts,
    allMiscs: (state) => state.miscs,
    allWaters: (state) => state.waters,
    
    fermentableById: (state) => (id: number) => state.fermentables.find(f => f.id === id),
    hopById: (state) => (id: number) => state.hops.find(h => h.id === id),
    yeastById: (state) => (id: number) => state.yeasts.find(y => y.id === id),
    miscById: (state) => (id: number) => state.miscs.find(m => m.id === id),
    waterById: (state) => (id: number) => state.waters.find(w => w.id === id),
  },

  actions: {
    // Méthodes pour les fermentescibles
    async fetchFermentables(force: boolean = false) {
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 1000) { // 5 minutes
        return { success: true, data: this.fermentables };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.fermentables.getAll();
        if (result.success) {
          this.fermentables = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.fermentables };
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

    async addFermentable(fermentable: Omit<IFermentable, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.fermentables.create(fermentable as IFermentable);
        if (result.success && result.data) {
          this.fermentables.push(result.data);
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

    async updateFermentable(id: number, fermentable: Partial<IFermentable>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.fermentables.update(id, fermentable);
        if (result.success && result.data) {
          const index = this.fermentables.findIndex(f => f.id === id);
          if (index !== -1) {
            this.fermentables[index] = result.data;
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

    async deleteFermentable(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.fermentables.delete(id);
        if (result.success) {
          this.fermentables = this.fermentables.filter(f => f.id !== id);
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

    // Méthodes pour les houblons
    async fetchHops(force: boolean = false) {
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 1000) { // 5 minutes
        return { success: true, data: this.hops };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.hops.getAll();
        if (result.success) {
          this.hops = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.hops };
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

    async addHop(hop: Omit<IHop, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.hops.create(hop as IHop);
        if (result.success && result.data) {
          this.hops.push(result.data);
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

    async updateHop(id: number, hop: Partial<IHop>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.hops.update(id, hop);
        if (result.success && result.data) {
          const index = this.hops.findIndex(h => h.id === id);
          if (index !== -1) {
            this.hops[index] = result.data;
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

    async deleteHop(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.hops.delete(id);
        if (result.success) {
          this.hops = this.hops.filter(h => h.id !== id);
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

    // Méthodes pour les levures
    async fetchYeasts(force: boolean = false) {
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 1000) { // 5 minutes
        return { success: true, data: this.yeasts };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.yeasts.getAll();
        if (result.success) {
          this.yeasts = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.yeasts };
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

    async addYeast(yeast: Omit<IYeast, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.yeasts.create(yeast as IYeast);
        if (result.success && result.data) {
          this.yeasts.push(result.data);
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

    async updateYeast(id: number, yeast: Partial<IYeast>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.yeasts.update(id, yeast);
        if (result.success && result.data) {
          const index = this.yeasts.findIndex(y => y.id === id);
          if (index !== -1) {
            this.yeasts[index] = result.data;
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

    async deleteYeast(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.yeasts.delete(id);
        if (result.success) {
          this.yeasts = this.yeasts.filter(y => y.id !== id);
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

    // Méthodes pour les ingrédients divers
    async fetchMiscs(force: boolean = false) {
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 100) { // 5 minutes
        return { success: true, data: this.miscs };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.miscs.getAll();
        if (result.success) {
          this.miscs = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.miscs };
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

    async addMisc(misc: Omit<IMisc, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.miscs.create(misc as IMisc);
        if (result.success && result.data) {
          this.miscs.push(result.data);
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

    async updateMisc(id: number, misc: Partial<IMisc>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.miscs.update(id, misc);
        if (result.success && result.data) {
          const index = this.miscs.findIndex(m => m.id === id);
          if (index !== -1) {
            this.miscs[index] = result.data;
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

    async deleteMisc(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.miscs.delete(id);
        if (result.success) {
          this.miscs = this.miscs.filter(m => m.id !== id);
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

    // Méthodes pour les eaux
    async fetchWaters(force: boolean = false) {
      if (!force && this.lastFetch && (Date.now() - this.lastFetch.getTime()) < 5 * 60 * 1000) { // 5 minutes
        return { success: true, data: this.waters };
      }

      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.waters.getAll();
        if (result.success) {
          this.waters = result.data || [];
          this.lastFetch = new Date();
          return { success: true, data: this.waters };
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

    async addWater(water: Omit<IWater, 'id'>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.waters.create(water as IWater);
        if (result.success && result.data) {
          this.waters.push(result.data);
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

    async updateWater(id: number, water: Partial<IWater>) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.waters.update(id, water);
        if (result.success && result.data) {
          const index = this.waters.findIndex(w => w.id === id);
          if (index !== -1) {
            this.waters[index] = result.data;
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

    async deleteWater(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await apiManager.waters.delete(id);
        if (result.success) {
          this.waters = this.waters.filter(w => w.id !== id);
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
  },
});