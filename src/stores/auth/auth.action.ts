import {createSagaAction} from '../../utils/createSagaAction';

export const authSagaActions = createSagaAction<{isAuthenticated:boolean, username?:string}>('AUTH');