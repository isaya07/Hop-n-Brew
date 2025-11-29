import Dexie from 'dexie';

type Table<T, TKey> = Dexie.Table<T, TKey>;

export interface IUser {
  id?: number;
  _id?: string; // MongoDB ObjectId
 email: string;
 name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interfaces pour la base de données sans références circulaires
export interface IRecipeDB {
  id?: number;
  _id?: string; // MongoDB ObjectId
  name: string;
  notes: string;
  brewer: string;
  asstBrewer: string;
  type: string;
  equipment: any; // Données d'équipement sérialisées
  style: any; // Données de style sérialisées
  batchSize: number;
  boilSize: number;
  boilTime: number;
  efficiency: number;
  fermentables: any[]; // Données de fermentescibles sérialisées
 yeasts: any[]; // Données de levures sérialisées
  hops: any[]; // Données de houblons sérialisées
 miscs: any[]; // Données d'ingrédients divers sérialisées
  waters: any[]; // Données d'eau sérialisées
  mash: any; // Données d'empâtage sérialisées
 fermentation: any; // Données de fermentation sérialisées
  carbonation: any; // Données de carbonatation sérialisées
  og: number;
  fg: number;
  tasteNote: string;
  tasteRating: string;
  date: string;
  estOg: number | null;
  estFg: number | null;
  estColor: number | null;
  ibu: number | null;
  ibuMethod: string;
  estAbv: number | null;
  abv: number | null;
  actualEfficiency: number | null;
  calories: number | null;
  displayBatchSize: string | null;
  displayBoilSize: string | null;
  displayOg: string | null;
  displayFg: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Alias pour IRecipe pointant vers la version DB
export interface IRecipe extends IRecipeDB {}

export interface IIngredient {
  id?: number;
  _id?: string; // MongoDB ObjectId
 name: string;
 type: 'fermentable' | 'hop' | 'yeast' | 'misc' | 'water';
  attributes: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile {
  id?: number;
  _id?: string; // MongoDB ObjectId
  name: string;
  type: 'style' | 'fermentation' | 'carbonation' | 'equipment' | 'mash';
  attributes: any;
  createdAt: Date;
  updatedAt: Date;
}

class HopNBrewDatabase extends Dexie {
  users!: Table<IUser, number>;
  recipes!: Table<IRecipe, number>;
  ingredients!: Table<IIngredient, number>;
  profiles!: Table<IProfile, number>;

  constructor() {
    super('HopNBrewDatabase');
    this.version(2).stores({
      users: '++id, _id, email, name, createdAt',
      recipes: '++id, _id, name, createdAt, updatedAt',
      ingredients: '++id, _id, name, type, createdAt',
      profiles: '++id, _id, name, type, createdAt'
    });
  }
}

export const db = new HopNBrewDatabase();