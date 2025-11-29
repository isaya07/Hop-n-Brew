import { defineStore } from 'pinia';
import type { IProfile } from '../lib/database';
import apiManager from '../lib/api/index';

export const useProfilesStore = defineStore('profiles', {
  state: () => ({
    profiles: [] as IProfile[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    allProfiles: (state) => state.profiles,
    allEquipments: (state) => state.profiles.filter(profile => profile.type === 'equipment'),
    allStyles: (state) => state.profiles.filter(profile => profile.type === 'style'),
    allFermentations: (state) => state.profiles.filter(profile => profile.type === 'fermentation'),
    allCarbonations: (state) => state.profiles.filter(profile => profile.type === 'carbonation'),
    allMashes: (state) => state.profiles.filter(profile => profile.type === 'mash'),
    
    equipmentById: (state) => (id: number) => state.profiles.find(profile => profile.id === id && profile.type === 'equipment'),
    styleById: (state) => (id: number) => state.profiles.find(profile => profile.id === id && profile.type === 'style'),
    fermentationById: (state) => (id: number) => state.profiles.find(profile => profile.id === id && profile.type === 'fermentation'),
    carbonationById: (state) => (id: number) => state.profiles.find(profile => profile.id === id && profile.type === 'carbonation'),
    mashById: (state) => (id: number) => state.profiles.find(profile => profile.id === id && profile.type === 'mash'),
  },

  actions: {
    // Charger tous les profils
    async fetchAllProfiles() {
      this.loading = true;
      try {
        const result = await apiManager.equipment.getAll(); // Utilisation de l'une des API qui accède à la table profiles
        if (result.success) {
          this.profiles = result.data || [];
        } else {
          this.error = result.error || 'Failed to fetch profiles';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    // Équipements
    async fetchEquipments() {
      this.loading = true;
      try {
        const result = await apiManager.equipment.getAll();
        if (result.success) {
          // Filtrer pour ne garder que les équipements
          const equipmentProfiles = (result.data || []).filter(profile => profile.type === 'equipment');
          // Mettre à jour la liste complète des profils
          this.profiles = this.profiles.filter(profile => profile.type !== 'equipment').concat(equipmentProfiles);
        } else {
          this.error = result.error || 'Failed to fetch equipments';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createEquipment(equipmentData: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const equipmentWithProfile = {
          ...equipmentData,
          type: 'equipment' as const
        };
        const result = await apiManager.equipment.create(equipmentWithProfile);
        if (result.success && result.data) {
          this.profiles.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create equipment';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateEquipment(id: number, equipmentData: Partial<IProfile>) {
      this.loading = true;
      try {
        const result = await apiManager.equipment.update(id, equipmentData);
        if (result.success && result.data) {
          const index = this.profiles.findIndex(profile => profile.id === id && profile.type === 'equipment');
          if (index !== -1) {
            this.profiles[index] = { ...this.profiles[index], ...result.data };
          } else {
            // Si l'index n'est pas trouvé dans les équipements, l'ajouter
            this.profiles.push(result.data);
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update equipment';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteEquipment(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.equipment.delete(id);
        if (result.success) {
          this.profiles = this.profiles.filter(profile => profile.id !== id || profile.type !== 'equipment');
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete equipment';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    // Styles
    async fetchStyles() {
      this.loading = true;
      try {
        const result = await apiManager.styles.getAll();
        if (result.success) {
          // Filtrer pour ne garder que les styles
          const styleProfiles = (result.data || []).filter(profile => profile.type === 'style');
          // Mettre à jour la liste complète des profils
          this.profiles = this.profiles.filter(profile => profile.type !== 'style').concat(styleProfiles);
        } else {
          this.error = result.error || 'Failed to fetch styles';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createStyle(styleData: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const styleWithProfile = {
          ...styleData,
          type: 'style' as const
        };
        const result = await apiManager.styles.create(styleWithProfile);
        if (result.success && result.data) {
          this.profiles.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create style';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateStyle(id: number, styleData: Partial<IProfile>) {
      this.loading = true;
      try {
        const result = await apiManager.styles.update(id, styleData);
        if (result.success && result.data) {
          const index = this.profiles.findIndex(profile => profile.id === id && profile.type === 'style');
          if (index !== -1) {
            this.profiles[index] = { ...this.profiles[index], ...result.data };
          } else {
            // Si l'index n'est pas trouvé dans les styles, l'ajouter
            this.profiles.push(result.data);
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update style';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteStyle(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.styles.delete(id);
        if (result.success) {
          this.profiles = this.profiles.filter(profile => profile.id !== id || profile.type !== 'style');
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete style';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    // Fermentations
    async fetchFermentations() {
      this.loading = true;
      try {
        const result = await apiManager.fermentation.getAll();
        if (result.success) {
          // Filtrer pour ne garder que les fermentations
          const fermentationProfiles = (result.data || []).filter(profile => profile.type === 'fermentation');
          // Mettre à jour la liste complète des profils
          this.profiles = this.profiles.filter(profile => profile.type !== 'fermentation').concat(fermentationProfiles);
        } else {
          this.error = result.error || 'Failed to fetch fermentations';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createFermentation(fermentationData: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const fermentationWithProfile = {
          ...fermentationData,
          type: 'fermentation' as const
        };
        const result = await apiManager.fermentation.create(fermentationWithProfile);
        if (result.success && result.data) {
          this.profiles.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create fermentation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateFermentation(id: number, fermentationData: Partial<IProfile>) {
      this.loading = true;
      try {
        const result = await apiManager.fermentation.update(id, fermentationData);
        if (result.success && result.data) {
          const index = this.profiles.findIndex(profile => profile.id === id && profile.type === 'fermentation');
          if (index !== -1) {
            this.profiles[index] = { ...this.profiles[index], ...result.data };
          } else {
            // Si l'index n'est pas trouvé dans les fermentations, l'ajouter
            this.profiles.push(result.data);
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update fermentation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteFermentation(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.fermentation.delete(id);
        if (result.success) {
          this.profiles = this.profiles.filter(profile => profile.id !== id || profile.type !== 'fermentation');
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete fermentation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    // Carbonations
    async fetchCarbonations() {
      this.loading = true;
      try {
        const result = await apiManager.carbonation.getAll();
        if (result.success) {
          // Filtrer pour ne garder que les carbonations
          const carbonationProfiles = (result.data || []).filter(profile => profile.type === 'carbonation');
          // Mettre à jour la liste complète des profils
          this.profiles = this.profiles.filter(profile => profile.type !== 'carbonation').concat(carbonationProfiles);
        } else {
          this.error = result.error || 'Failed to fetch carbonations';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createCarbonation(carbonationData: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const carbonationWithProfile = {
          ...carbonationData,
          type: 'carbonation' as const
        };
        const result = await apiManager.carbonation.create(carbonationWithProfile);
        if (result.success && result.data) {
          this.profiles.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create carbonation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateCarbonation(id: number, carbonationData: Partial<IProfile>) {
      this.loading = true;
      try {
        const result = await apiManager.carbonation.update(id, carbonationData);
        if (result.success && result.data) {
          const index = this.profiles.findIndex(profile => profile.id === id && profile.type === 'carbonation');
          if (index !== -1) {
            this.profiles[index] = { ...this.profiles[index], ...result.data };
          } else {
            // Si l'index n'est pas trouvé dans les carbonations, l'ajouter
            this.profiles.push(result.data);
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update carbonation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteCarbonation(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.carbonation.delete(id);
        if (result.success) {
          this.profiles = this.profiles.filter(profile => profile.id !== id || profile.type !== 'carbonation');
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete carbonation';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    // Empâtages
    async fetchMashes() {
      this.loading = true;
      try {
        const result = await apiManager.mash.getAll();
        if (result.success) {
          // Filtrer pour ne garder que les empâtages
          const mashProfiles = (result.data || []).filter(profile => profile.type === 'mash');
          // Mettre à jour la liste complète des profils
          this.profiles = this.profiles.filter(profile => profile.type !== 'mash').concat(mashProfiles);
        } else {
          this.error = result.error || 'Failed to fetch mashes';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createMash(mashData: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const mashWithProfile = {
          ...mashData,
          type: 'mash' as const
        };
        const result = await apiManager.mash.create(mashWithProfile);
        if (result.success && result.data) {
          this.profiles.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create mash';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateMash(id: number, mashData: Partial<IProfile>) {
      this.loading = true;
      try {
        const result = await apiManager.mash.update(id, mashData);
        if (result.success && result.data) {
          const index = this.profiles.findIndex(profile => profile.id === id && profile.type === 'mash');
          if (index !== -1) {
            this.profiles[index] = { ...this.profiles[index], ...result.data };
          } else {
            // Si l'index n'est pas trouvé dans les empâtages, l'ajouter
            this.profiles.push(result.data);
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update mash';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteMash(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.mash.delete(id);
        if (result.success) {
          this.profiles = this.profiles.filter(profile => profile.id !== id || profile.type !== 'mash');
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete mash';
          return { success: false, error: result.error };
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