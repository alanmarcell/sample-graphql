import { IUserForLog } from '@alanmarcell/ptz-user-domain';
import { IAppFuncArgs as IAppFuncArgsBase } from 'ptz-core-domain';

export type IAppFuncArgs = IAppFuncArgsBase<IUserForLog>;
