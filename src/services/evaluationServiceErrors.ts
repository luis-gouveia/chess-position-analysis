import { ServiceError } from '../shared/errors/ServiceErrors'

export class FailedToGetEvaluation extends ServiceError {
  public constructor(data: any, service: string) {
    super('Failed to get position evaluation.', data, service)
  }
}

export class InvalidEvaluationData extends ServiceError {
  public constructor(data: any, service: string) {
    super('Invalid evaluation data.', data, service)
  }
}

export class InvalidEvaluationDepth extends ServiceError {
  public constructor(service: string) {
    super('Invalid evaluation depth.', undefined, service)
  }
}
