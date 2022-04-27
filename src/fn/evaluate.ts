import { OpType, Op, Args } from '../types'

export const evaluate = (opList: Op[], args: Args): boolean => {
  if (opList.length === 1 && opList[0].type === OpType.Constant) {
    return opList[0].payload as boolean
  }

  if (opList.length >= 1 && opList[0].type === OpType.Argument) {
    return args[opList[0].payload as string]
  }

  return undefined
}

