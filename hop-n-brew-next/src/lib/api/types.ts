/**
 * Types pour les réponses de l'API
 */

import type { IRecipe, IStyle } from '@/lib/recipes/types';
import type { IProfile } from '../database';

export interface IApiRecipe extends IRecipe {
  id?: number;
  archived?: boolean;
  description?: string;
 dateCreated?: string;
  dateUpdated?: string;
}

export interface IApiStyle extends IStyle {
  id?: number;
}

export interface IApiUser {
  id?: number;
  username: string;
  email: string;
  role: string;
  active: boolean;
  dateCreated?: string;
  lastLogin?: string;
}

export interface IApiMashProfile extends IProfile {
  id?: number;
}

export interface IApiResult<T> {
 success: boolean;
 data?: T;
  error?: string;
}

export interface IApiListResult<T> {
  success: boolean;
  data?: T[];
  error?: string;
  total?: number;
}