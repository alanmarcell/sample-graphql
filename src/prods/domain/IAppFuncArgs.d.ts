import { IAppFuncArgs as IAppFuncArgsBase } from 'ptz-core-domain';
import { IUserForLog } from 'ptz-user-domain';

export type IAppFuncArgs = IAppFuncArgsBase<IUserForLog>;
