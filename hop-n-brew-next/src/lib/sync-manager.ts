import { db } from './database';
import { MongoClient, ObjectId } from 'mongodb';

/**
 * Manager for synchronizing data between Dexie.js (local) and MongoDB Atlas (cloud)
 */
export class SyncManager {
  private client: MongoClient;
  private isOnline: boolean = navigator.onLine;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString);
    this.setupNetworkListeners();
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.sync();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  /**
   * Synchronize data between local Dexie and MongoDB Atlas
   */
  async sync(): Promise<void> {
    if (!this.isOnline) {
      console.log('Offline: Skipping sync');
      return;
    }

    try {
      await this.client.connect();
      const dbConnection = this.client.db();
      
      // Sync users
      await this.syncUsers(dbConnection);
      
      // Sync recipes
      await this.syncRecipes(dbConnection);
      
      // Sync ingredients
      await this.syncIngredients(dbConnection);
      
      // Sync profiles
      await this.syncProfiles(dbConnection);
      
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      await this.client.close();
    }
  }

  private async syncUsers(dbConnection: any) {
    const usersCollection = dbConnection.collection('users');
    
    // Get local changes
    const localUsers = await db.users.toArray();
    
    // Push local changes to MongoDB
    for (const user of localUsers) {
      if (user._id) {
        // Update existing document
        await usersCollection.replaceOne(
          { _id: new ObjectId(user._id) },
          { ...user, _id: new ObjectId(user._id) },
          { upsert: true }
        );
      } else {
        // Insert new document and update local record with MongoDB ID
        const result = await usersCollection.insertOne({
          ...user,
          createdAt: user.createdAt || new Date(),
          updatedAt: user.updatedAt || new Date()
        });
        await db.users.update(user.id!, { _id: result.insertedId.toString() });
      }
    }
    
    // Pull remote changes to local
    const remoteUsers = await usersCollection.find({}).toArray();
    for (const remoteUser of remoteUsers) {
      const { _id, ...userData } = remoteUser;
      await db.users.put({
        ...userData,
        _id: _id.toString(),
        id: userData.id // Preserve local id if exists
      });
    }
  }

  private async syncRecipes(dbConnection: any) {
    const recipesCollection = dbConnection.collection('recipes');
    
    // Get local changes
    const localRecipes = await db.recipes.toArray();
    
    // Push local changes to MongoDB
    for (const recipe of localRecipes) {
      if (recipe._id) {
        // Update existing document
        await recipesCollection.replaceOne(
          { _id: new ObjectId(recipe._id) },
          { ...recipe, _id: new ObjectId(recipe._id) },
          { upsert: true }
        );
      } else {
        // Insert new document and update local record with MongoDB ID
        const result = await recipesCollection.insertOne({
          ...recipe,
          createdAt: recipe.createdAt || new Date(),
          updatedAt: recipe.updatedAt || new Date()
        });
        await db.recipes.update(recipe.id!, { _id: result.insertedId.toString() });
      }
    }
    
    // Pull remote changes to local
    const remoteRecipes = await recipesCollection.find({}).toArray();
    for (const remoteRecipe of remoteRecipes) {
      const { _id, ...recipeData } = remoteRecipe;
      await db.recipes.put({
        ...recipeData,
        _id: _id.toString(),
        id: recipeData.id // Preserve local id if exists
      });
    }
  }

  private async syncIngredients(dbConnection: any) {
    const ingredientsCollection = dbConnection.collection('ingredients');
    
    // Get local changes
    const localIngredients = await db.ingredients.toArray();
    
    // Push local changes to MongoDB
    for (const ingredient of localIngredients) {
      if (ingredient._id) {
        // Update existing document
        await ingredientsCollection.replaceOne(
          { _id: new ObjectId(ingredient._id) },
          { ...ingredient, _id: new ObjectId(ingredient._id) },
          { upsert: true }
        );
      } else {
        // Insert new document and update local record with MongoDB ID
        const result = await ingredientsCollection.insertOne({
          ...ingredient,
          createdAt: ingredient.createdAt || new Date(),
          updatedAt: ingredient.updatedAt || new Date()
        });
        await db.ingredients.update(ingredient.id!, { _id: result.insertedId.toString() });
      }
    }
    
    // Pull remote changes to local
    const remoteIngredients = await ingredientsCollection.find({}).toArray();
    for (const remoteIngredient of remoteIngredients) {
      const { _id, ...ingredientData } = remoteIngredient;
      await db.ingredients.put({
        ...ingredientData,
        _id: _id.toString(),
        id: ingredientData.id // Preserve local id if exists
      });
    }
  }

  private async syncProfiles(dbConnection: any) {
    const profilesCollection = dbConnection.collection('profiles');
    
    // Get local changes
    const localProfiles = await db.profiles.toArray();
    
    // Push local changes to MongoDB
    for (const profile of localProfiles) {
      if (profile._id) {
        // Update existing document
        await profilesCollection.replaceOne(
          { _id: new ObjectId(profile._id) },
          { ...profile, _id: new ObjectId(profile._id) },
          { upsert: true }
        );
      } else {
        // Insert new document and update local record with MongoDB ID
        const result = await profilesCollection.insertOne({
          ...profile,
          createdAt: profile.createdAt || new Date(),
          updatedAt: profile.updatedAt || new Date()
        });
        await db.profiles.update(profile.id!, { _id: result.insertedId.toString() });
      }
    }
    
    // Pull remote changes to local
    const remoteProfiles = await profilesCollection.find({}).toArray();
    for (const remoteProfile of remoteProfiles) {
      const { _id, ...profileData } = remoteProfile;
      await db.profiles.put({
        ...profileData,
        _id: _id.toString(),
        id: profileData.id // Preserve local id if exists
      });
    }
  }
}