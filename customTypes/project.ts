import { ObjectId } from 'mongodb';

export enum EProjectKeys {
  DESCRIPTION = 'description',
  EMAIL = 'email',
  NAME = 'name',
  FIRSTNAME = 'firstName',
  ID = '_id',
  LASTNAME = 'lastName',
  LINKEDIN = 'linkedin',
  SKILLSET = 'skillset',
  TARGET = 'target',
  TYPE = 'type',
}

export interface IProject {
  [EProjectKeys.ID]?: ObjectId;
  [EProjectKeys.DESCRIPTION]: string;
  [EProjectKeys.EMAIL]: string;
  [EProjectKeys.NAME]: string;
  [EProjectKeys.FIRSTNAME]: string;
  [EProjectKeys.LASTNAME]: string;
  [EProjectKeys.LINKEDIN]: string;
  [EProjectKeys.SKILLSET]: string;
  [EProjectKeys.TARGET]: string;
  [EProjectKeys.TYPE]: string;
}
