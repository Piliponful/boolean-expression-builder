import React, { useState, useEffect } from 'react'

import { OperationDisplay } from './OperationDisplay'

import { OpType, BooleanOperatorType, OpPayload, Op, Args } from './types'

import { evaluate } from './fn/evaluate'

export const OperationsList = ({ args }: { args: Args }) => {
  const [opList, setOpList] = useState<Op[]>([])
  const [showSelect, setShowSelect] = useState<boolean>(true)
  const [operationResult, setOperationResult] = useState<boolean>()

  useEffect(() => {
    const result = evaluate(opList, args)
    setOperationResult(result)
  }, [JSON.stringify(opList), JSON.stringify(args)])

  const addNewOp = (type: OpType, payload: BooleanOperatorType) => {
    if (type === OpType.Constant) {
      setOpList([...opList, { id: performance.now(), type, payload: false }])
    }

    if (type === OpType.Argument) {
      setOpList([...opList, { id: performance.now(), type, payload: Object.keys(args)[0] }])
    }

    if (type === OpType.BooleanOperator) {
      setOpList([
        ...opList,
        { id: performance.now(), type, payload: { operator: payload, leftOperand: null, rightOperand: null } }
      ])
    }

    setShowSelect(false)
  }

  const updateOp = (id: number, payload: OpPayload) => {
    const index = opList.findIndex(i => i.id === id)
    const item = opList.find(i => i.id === id)

    if (!item) {
      return
    }

    setOpList([...opList.slice(0, index), { ...item, payload }, ...opList.slice(index + 1)])
  }

  const removeOp = (id: number) => {
    const newOpList = opList.filter(i => i.id !== id)
    if (newOpList.length === 0) {
      setShowSelect(true)
    }
    setOpList(newOpList)
  }

  return (
    <div>
      {opList.map(op => (
        <OperationDisplay
          key={op.id}
          op={op}
          args={args}
          updateOp={(payload: OpPayload) => updateOp(op.id, payload)}
          removeOp={() => removeOp(op.id)}
        />
      ))}

      {
        showSelect
          ? (
              <select onChange={e => addNewOp(e.target.value as OpType, e.target.options[e.target.selectedIndex].text as BooleanOperatorType)}>
                <option value=''>select...</option>
                <option value={OpType.Constant}>constant</option>
                <option value={OpType.Argument}>argument</option>
                <option value={OpType.BooleanOperator}>and</option>
                <option value={OpType.BooleanOperator}>or</option>
              </select>
            )
          : null
      }

      <p>result: {JSON.stringify(operationResult) || 'undefined'}</p>
    </div>
  )
}
