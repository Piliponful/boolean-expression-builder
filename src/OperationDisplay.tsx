import React from "react";

import { BooleanValueSelect } from './BooleanValueSelect'

import { BooleanOperator, OpType, OpPayload, Args, Op } from './types'

type OperationDisplayProps = {
  op: Op;
  args: Args;
  updateOp: (payload: OpPayload) => void;
  removeOp: () => void;
}

const BooleanOperation = (): JSX.Element | null => {
  const [operator, setOperator] = useState()
  return (
    <>
      <select>
        <option value='and'>and</option>
        <option value='or'>or</option>
      </select>

      <OperationDisplay op={op.payload.leftOperand as BooleanOperator} {...props} />
      <OperationDisplay op={op.payload.rightOperand as BooleanOperator} {...props}  />

      <button onClick={removeOp}>x</button>
    </>
  )
}

export const OperationDisplay = ({ op, ...props }: OperationDisplayProps): JSX.Element | null => {
  const [operationResult, setOperationResult] = useState<boolean>()

  const { args, updateOp, removeOp } = props

  useEffect(() => {
    const result = evaluate(opList, args)
    setOperationResult(result)
  }, [JSON.stringify(opList), JSON.stringify(args)])

  if (op.type === OpType.Constant) {
    return (
      <>
        <BooleanValueSelect value={op.payload as boolean} setValue={updateOp} />
        <button onClick={removeOp}>x</button>
      </>
    )
  }

  if (op.type === OpType.Argument) {
    return (
      <>
        <select>
          {Object.keys(args).map(argName => (<option key={argName} value={argName}>{argName}</option>))}
        </select>
        <button onClick={removeOp}>x</button>
      </>
    )
  }

  if (op.type === OpType.BooleanOperator) {
    return (
    )
  }

  return null
}
