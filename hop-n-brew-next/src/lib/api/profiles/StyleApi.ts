import { db, type IProfile } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class StyleApi extends ApiBase<IProfile> {
  protected getTable() {
    return db.profiles;
  }
}