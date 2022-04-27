export enum OpType {
  Constant = 'constant',
  Argument = 'argument',
  BooleanOperator = 'boolean-operator'
}

export enum BooleanOperatorType {
  And = 'and',
  Or = 'or'
}

export type BooleanOperator = {
  leftOperand: OpPayload;
  rightOperand: OpPayload;
  operator: BooleanOperatorType;
}

export type Args = {
  [key: string]: boolean
}

export type OpPayload = boolean | string | BooleanOperator

export type Op = {
  id: number,
  type: OpType,
  payload: OpPayload
}
