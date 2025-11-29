import { defineStore } from 'pinia';
import { MashProfile } from '@/lib/recipes/MashProfile';
import api from '@/lib/api';
import type { IApiMashProfile } from '@/lib/api/types';
import type { IProfile } from '@/lib/database';

export const useMashStore = defineStore('mash', {
 state: () => ({
    mashProfiles: [] as MashProfile[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAllMashProfiles: (state) => state.mashProfiles,
    getMashProfileById: (state) => (id: string) => {
      return state.mashProfiles.find(profile => profile.id === id);
    },
    getMashProfilesCount: (state) => state.mashProfiles.length,
  },

  actions: {
    async fetchAllMashProfiles() {
      try {
        this.loading = true;
        this.error = null;
        
        const result = await api.mash.getAll();
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors du chargement des profils de brassage');
        }
        
        // Convertir les données de l'API en objets MashProfile
        this.mashProfiles = result.data?.map((profile: IApiMashProfile) => {
          // Convertir le profile IProfile en objet compatible avec MashProfile
          const mashProfileData = {
            id: profile._id || profile.id?.toString(),
            name: profile.name,
            description: (profile.attributes as any)?.description || null,
            grainTemp: (profile.attributes as any)?.grainTemp || null,
            tunTemp: (profile.attributes as any)?.tunTemp || null,
            spargeTemp: (profile.attributes as any)?.spargeTemp || null,
            spargePh: (profile.attributes as any)?.spargePh || null,
            equipAdjust: (profile.attributes as any)?.equipAdjust || null,
            notes: (profile.attributes as any)?.notes || null,
            mashSteps: (profile.attributes as any)?.mashSteps || []
          };
          return new MashProfile(mashProfileData);
        }) || [];
        
        return this.mashProfiles;
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des profils de brassage';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createMashProfile(profileData: Partial<MashProfile>) {
      try {
        this.loading = true;
        this.error = null;
        
        // Convertir le MashProfile en format IProfile pour l'API
        const profileForApi: Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'> = {
          name: profileData.name || '',
          type: 'mash',
          attributes: {
            ...profileData,
            mashSteps: profileData.mashSteps || []
          }
        };
        
        const result = await api.mash.create(profileForApi);
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors de la création du profil de brassage');
        }
        
        const newProfile = new MashProfile({
          id: result.data?._id || result.data?.id?.toString(),
          ...profileData,
          mashSteps: profileData.mashSteps || []
        });
        
        this.mashProfiles.push(newProfile);
        
        return newProfile;
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la création du profil de brassage';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateMashProfile(id: string, profileData: Partial<MashProfile>) {
      try {
        this.loading = true;
        this.error = null;
        
        // Trouver l'index du profil dans la liste
        const index = this.mashProfiles.findIndex(profile => profile.id === id);
        if (index === -1) {
          throw new Error('Profil de brassage non trouvé');
        }
        
        // Obtenir l'ID numérique pour l'API à partir de notre liste locale
        const profileInStore = this.mashProfiles[index];
        const numericId = parseInt(id) || (profileInStore as any).id; // Si id est déjà un nombre
        
        // Convertir le MashProfile en format IProfile pour l'API
        const profileForApi: Partial<IProfile> = {
          name: profileData.name,
          attributes: {
            ...profileData,
            mashSteps: profileData.mashSteps || []
          },
          updatedAt: new Date()
        };
        
        const result = await api.mash.update(numericId, profileForApi);
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors de la mise à jour du profil de brassage');
        }
        
        const updatedProfile = new MashProfile({
          id: id,
          ...profileData,
          mashSteps: profileData.mashSteps || []
        });
        
        this.mashProfiles[index] = updatedProfile;
        
        return updatedProfile;
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la mise à jour du profil de brassage';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteMashProfile(id: string) {
      try {
        this.loading = true;
        this.error = null;
        
        // Trouver l'index du profil dans la liste
        const index = this.mashProfiles.findIndex(profile => profile.id === id);
        if (index === -1) {
          throw new Error('Profil de brassage non trouvé');
        }
        
        // Obtenir l'ID numérique pour l'API à partir de notre liste locale
        const profileInStore = this.mashProfiles[index];
        const numericId = parseInt(id) || (profileInStore as any).id;
        
        const result = await api.mash.delete(numericId);
        if (!result.success) {
          throw new Error(result.error || 'Erreur lors de la suppression du profil de brassage');
        }
        
        this.mashProfiles = this.mashProfiles.filter(profile => profile.id !== id);
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la suppression du profil de brassage';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour charger les données si elles ne sont pas encore chargées
    async initialize() {
      if (this.mashProfiles.length === 0) {
        await this.fetchAllMashProfiles();
      }
    }
 }
});