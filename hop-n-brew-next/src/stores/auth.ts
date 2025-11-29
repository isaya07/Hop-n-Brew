import { defineStore } from 'pinia';
import { AuthManager, type User } from '../lib/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async initializeAuth() {
      this.loading = true;
      try {
        // Use environment variable for MongoDB URI
        const connectionString = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/hopnbrew';
        const authManager = new AuthManager(connectionString);
        await authManager.connect();
        const currentUser = await authManager.getCurrentUser();
        
        if (currentUser) {
          this.user = currentUser;
          this.isAuthenticated = true;
        }
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const connectionString = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/hopnbrew';
        const authManager = new AuthManager(connectionString);
        await authManager.connect();
        const user = await authManager.login(email, password);
        
        if (user) {
          this.user = user;
          this.isAuthenticated = true;
          return { success: true };
        } else {
          this.error = 'Invalid credentials';
          return { success: false, error: 'Invalid credentials' };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async register(email: string, password: string, name: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const connectionString = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/hopnbrew';
        const authManager = new AuthManager(connectionString);
        await authManager.connect();
        const user = await authManager.register(email, password, name);
        
        if (user) {
          this.user = user;
          this.isAuthenticated = true;
          return { success: true };
        } else {
          this.error = 'Registration failed';
          return { success: false, error: 'Registration failed' };
        }
      } catch (error) {
        this.error = (error as Error).message;
        return { success: false, error: (error as Error).message };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      
      try {
        const connectionString = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/hopnbrew';
        const authManager = new AuthManager(connectionString);
        await authManager.connect();
        await authManager.logout();
        
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    }
  },
});