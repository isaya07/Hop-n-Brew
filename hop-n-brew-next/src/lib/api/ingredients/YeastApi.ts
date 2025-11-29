import { db, type IIngredient } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class YeastApi extends ApiBase<IIngredient> {
  protected getTable() {
    return db.ingredients;
 }
}