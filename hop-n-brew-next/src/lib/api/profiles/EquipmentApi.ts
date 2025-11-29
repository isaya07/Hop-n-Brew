import { db, type IProfile } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class EquipmentApi extends ApiBase<IProfile> {
  protected getTable() {
    return db.profiles;
  }
}