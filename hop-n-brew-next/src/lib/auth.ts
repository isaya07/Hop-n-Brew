import { MongoClient } from 'mongodb';

export interface User {
  _id?: string;
  id?: number;
  email: string;
 password?: string;
 name: string;
 createdAt: Date;
}

export class AuthManager {
  private client: MongoClient;
  private usersCollection: any;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString);
  }

  async connect() {
    await this.client.connect();
    const db = this.client.db();
    this.usersCollection = db.collection('users');
  }

  async register(email: string, password: string, name: string): Promise<User> {
    // Hash password in real implementation
    const user: User = {
      email,
      password, // Should be hashed
      name,
      createdAt: new Date()
    };

    const result = await this.usersCollection.insertOne(user);
    user._id = result.insertedId.toString();
    
    // Also store in local Dexie
    const localUser = { ...user, id: result.insertedId };
    await this.storeLocalUser(localUser);
    
    return user;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersCollection.findOne({ email });
    
    if (user && user.password === password) { // Password should be compared after hashing
      // Store in local Dexie for offline access
      const localUser = { ...user, id: user._id };
      await this.storeLocalUser(localUser);
      return user;
    }
    
    return null;
 }

  async logout(): Promise<void> {
    // Clear local session
    localStorage.removeItem('hb_user');
  }

 async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('hb_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private async storeLocalUser(user: any): Promise<void> {
    // Store in localStorage as temporary solution
    // In real implementation, use Dexie.js
    localStorage.setItem('hb_user', JSON.stringify(user));
  }
}