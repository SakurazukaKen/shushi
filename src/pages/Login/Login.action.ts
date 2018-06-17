import {createStandardAction} from 'typesafe-actions'
const NAMESPACE = "LOGIN_PAGE";
const SUBMIT = `${NAMESPACE}/SUBMIT`;
export const loginAction = createStandardAction(SUBMIT)<{username:string, password: string}>();
