import React, { useState, useEffect } from 'react'

import { ExpressionType, Operator, Args } from '../../types'

import { Expression } from '../Expression'

import styles from './BooleanOperator.module.css'

type Props = {
  args: Args,
  result: boolean,
  setResult: (result: boolean) => void,
  reset: () => void,
  level: number,
  operator: Operator,
  type: ExpressionType
}

export const BooleanOperator = ({ args, type, result, setResult, reset, level, operator }: Props): JSX.Element | null => {
  if (type !== ExpressionType.BooleanOperator) {
    return null
  }

  const [operands, setOperands] = useState<[boolean | undefined, boolean | undefined]>([undefined, undefined])

  useEffect(() => {
    if (typeof operands[0] !== 'boolean' || typeof operands[1] !== 'boolean') {
      if (typeof result === 'boolean') { // remove result on reset of one of operands
        setResult(undefined)
      }

      return
    }

    if (operator === 'and') {
      setResult(operands[0] && operands[1])
    }

    if (operator === 'or') {
      setResult(operands[0] || operands[1])
    }
  }, [operands[0], operands[1]])

  const resetWithOperands = () => {
    reset()
    setOperands([undefined, undefined])
  }

  return (
    <>
      <Expression args={args} result={operands[0]} setResult={left => setOperands([left, operands[1]])} level={level + 1} />
      <div>|</div>
      <span className={styles['operator-contaienr']}>
        {operator}
        <button className={styles['button-dismiss-square']} onClick={resetWithOperands}>✖</button>
      </span>
      <div>|</div>
      <Expression args={args} result={operands[1]} setResult={right => setOperands([operands[0], right])} level={level + 1} />
    </>
  )
}
