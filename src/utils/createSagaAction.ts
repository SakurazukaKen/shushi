import {createStandardAction} from 'typesafe-actions';
import {ISagaError} from '../models/SagaError'
export function createSagaAction<SuccessPayload = undefined, RequestPayload = undefined, ErrorPayload = ISagaError>(name:string, namespace?: string) {
  const prefix = `${namespace?namespace + '/':''}${name}_`;
  return {
    error: createStandardAction(`${prefix}ERROR`)<ErrorPayload>(),
    request: createStandardAction(`${prefix}REQUEST`)<RequestPayload>(),
    success: createStandardAction(`${prefix}SUCCESS`)<SuccessPayload>()
  }
}

