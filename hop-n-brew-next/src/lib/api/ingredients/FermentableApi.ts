import { db, type IIngredient } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class FermentableApi extends ApiBase<IIngredient> {
  protected getTable() {
    return db.ingredients;
  }
}