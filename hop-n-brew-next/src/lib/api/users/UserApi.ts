import { db, type IUser } from '../../database';
import { ApiBase } from '../base/ApiBase';

export class UserApi extends ApiBase<IUser> {
  protected getTable() {
    return db.users;
 }
}