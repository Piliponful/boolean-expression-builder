export enum ExpressionType {
  Constant = 'constant',
  Argument = 'argument',
  BooleanOperator = 'boolean-operator'
}

export enum Operator {
  And = 'and',
  Or = 'or'
}

export type Args = {
  [key: string]: boolean
}
