import Dexie from 'dexie';
import type { IApiResult } from './types';

export abstract class ApiBase<T> {
  protected abstract getTable(): Dexie.Table<T, number>;
  
  async getAll(): Promise<IApiResult<T[]>> {
    try {
      const items = await this.getTable().toArray();
      return { success: true, data: items };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  
  async getById(id: number): Promise<IApiResult<T>> {
    try {
      const item = await this.getTable().get(id);
      if (!item) {
        return { success: false, error: 'Item not found' };
      }
      return { success: true, data: item };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  
  async create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<IApiResult<T>> {
    try {
      const now = new Date();
      const newItem: T = {
        ...(item as any),
        createdAt: now,
        updatedAt: now
      };
      const id = await this.getTable().add(newItem);
      const createdItem = await this.getTable().get(id);
      return { success: true, data: createdItem! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  
  async update(id: number, item: Partial<T>): Promise<IApiResult<T>> {
    try {
      const existingItem = await this.getTable().get(id);
      if (!existingItem) {
        return { success: false, error: 'Item not found' };
      }
      
      const updateData = { ...item } as any;
      updateData.updatedAt = new Date();
      await this.getTable().update(id, updateData);
      const updatedItem = await this.getTable().get(id);
      return { success: true, data: updatedItem! };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  
  async delete(id: number): Promise<IApiResult<boolean>> {
    try {
      await this.getTable().delete(id);
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}