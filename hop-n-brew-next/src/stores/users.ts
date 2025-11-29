import { defineStore } from 'pinia';
import type { IUser } from '../lib/database';
import apiManager from '../lib/api/index';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as IUser[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    allUsers: (state) => state.users,
    userById: (state) => (id: number) => state.users.find(user => user.id === id),
  },

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const result = await apiManager.users.getAll();
        if (result.success) {
          this.users = result.data || [];
        } else {
          this.error = result.error || 'Failed to fetch users';
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createUser(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        const result = await apiManager.users.create(userData);
        if (result.success && result.data) {
          this.users.push(result.data);
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to create user';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id: number, userData: Partial<IUser>) {
      this.loading = true;
      try {
        const result = await apiManager.users.update(id, userData);
        if (result.success && result.data) {
          const index = this.users.findIndex(user => user.id === id);
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...result.data };
          }
          return { success: true, data: result.data };
        } else {
          this.error = result.error || 'Failed to update user';
          return { success: false, error: result.error };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: number) {
      this.loading = true;
      try {
        const result = await apiManager.users.delete(id);
        if (result.success) {
          this.users = this.users.filter(user => user.id !== id);
          return { success: true };
        } else {
          this.error = result.error || 'Failed to delete user';
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