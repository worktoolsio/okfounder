import { ObjectId } from 'mongodb';

export enum EUserKeys {
  DONTWANT = 'dontwant',
  EMAIL = 'email',
  FIRSTNAME = 'firstName',
  ID = '_id',
  LASTNAME = 'lastName',
  LINKEDIN = 'linkedin',
  MOTIVATION = 'motivation',
  SKILLSET = 'skillset',
  WANT = 'want',
}

export interface IUser {
  [EUserKeys.ID]?: ObjectId;
  [EUserKeys.DONTWANT]: string;
  [EUserKeys.EMAIL]: string;
  [EUserKeys.FIRSTNAME]: string;
  [EUserKeys.LASTNAME]: string;
  [EUserKeys.LINKEDIN]: string;
  [EUserKeys.MOTIVATION]: string;
  [EUserKeys.SKILLSET]: string;
  [EUserKeys.WANT]: string;
}
