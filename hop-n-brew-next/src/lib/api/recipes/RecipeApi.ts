import { db, type IRecipe } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class RecipeApi extends ApiBase<IRecipe> {
  protected getTable() {
    return db.recipes;
  }
}