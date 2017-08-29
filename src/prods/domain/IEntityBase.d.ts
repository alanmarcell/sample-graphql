import { IEntityBase, IEntityBaseArgs } from 'ptz-core-domain';
import { IUserForLog } from 'ptz-user-domain';

export type IEntityBase = IEntityBase<IUserForLog>;

export type IEntityBaseArgs = IEntityBaseArgs<IUserForLog>;
