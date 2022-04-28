import React, { useState, useEffect } from 'react'

import { ExpressionTypeSelect } from './ExpressionTypeSelect'
import { ArgumentSelect } from './ArgumentSelect'
import { ConstantSelect } from './ConstantSelect'
import { BooleanOperator } from './BooleanOperator'

import { ExpressionType, Operator, Args } from './types'

import styles from './Expression.module.css'

type Props = {
  args: Args,
  result: boolean,
  setResult: (result: boolean) => void,
  level: number
}

export const Expression = ({ args, result, setResult, level = 1 }: Props): JSX.Element => {
  const [type, setType] = useState<ExpressionType | undefined>(undefined)
  const [operator, setOperator] = useState<Operator | undefined>(undefined)

  const reset = () => {
    setResult(undefined)
    setOperator(undefined)
    setType(undefined)
  }

  const containerStyle = {
    backgroundColor: `rgb(213, ${161 + (15 * level)}, ${142  + (10 * level)})`,
    width: `calc(100% - ${10 * level}px`
  }

  return (
    <div
      className={styles.container}
      style={containerStyle}
    >
      {level === 1 ? <h3>Expression Builder</h3> : null}

      <ExpressionTypeSelect type={type} setType={setType} setOperator={setOperator} />

      <ConstantSelect reset={reset} result={result} setResult={setResult} type={type} />

      <ArgumentSelect
        args={args}
        result={result}
        setResult={setResult}
        reset={reset}
        type={type}
      />

      <BooleanOperator
        args={args}
        result={result}
        setResult={setResult}
        reset={reset}
        type={type}
        level={level}
        operator={operator}
      />
    </div>
  )
}
