import React, { useState, useEffect } from 'react'

import { BooleanValueSelect } from './BooleanValueSelect'

import { Expression as ExpressionType, Operator, Args } from './types'

type Props = { args: Args, result?: boolean, setResult: (result: boolean) => void, nest: number }

export const Expression = ({ args, result, setResult, nest = 1 }) => {
  const [expression, setExpression] = useState<ExpressionType>()
  const [argument, setArgument] = useState<string | undefined>(undefined)

  const [operator, setOperator] = useState<Operator>()
  const [operands, setOperands] = useState<[boolean | undefined, boolean | undefined]>([undefined, undefined])

  useEffect(() => {
    if (argument) {
      if (argument in args) {
        setResult(args[argument])
      } else {
        setResult(undefined)
        setArgument(undefined)
      }
    }
  }, [JSON.stringify(args)])

  useEffect(() => {
    if (typeof operands[0] !== 'boolean' || typeof operands[1] !== 'boolean') {
      if (typeof result === 'boolean') {
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

  const initializeExpression = (expType: ExpressionType, operator: string) => {
    setExpression(expType)

    if (expType === ExpressionType.Constant) {
      setResult(false)
    }

    if (expType === ExpressionType.Argument) {
      const name = Object.keys(args)[0]
      setArgument(name)
      setResult(args[name])
    }

    if (expType === ExpressionType.BooleanOperator) {
      setOperator(operator as Operator)
    }
  }

  const resetExpression = () => {
    setResult(undefined)
    setOperator(undefined)
    setExpression(undefined)
    setOperands([undefined, undefined])
  }

  const styles = {
  }

  return (
    <div className='expression' style={{ backgroundColor: `rgb(213, ${161 + (15 * nest)}, ${142  + (10 * nest)})`, width: `calc(100% - ${10 * nest}px` }}>
      {nest === 1 ? <h3>Expression Builder</h3> : null}
      {
        expression === undefined
          ? (
              <select className='select' onChange={e => initializeExpression(e.target.value as ExpressionType, e.target.options[e.target.selectedIndex].text)}>
                <option value=''>select...</option>
                <option value={ExpressionType.Constant}>constant</option>
                <option value={ExpressionType.Argument}>argument</option>
                <option value={ExpressionType.BooleanOperator}>and</option>
                <option value={ExpressionType.BooleanOperator}>or</option>
              </select>
            )
          : null
      }

      {
        expression === ExpressionType.Constant
          ?
            (
              <div style={{ display: 'flex', margin: 0 }}>
                <BooleanValueSelect className='expression-bool' value={result} setValue={setResult} />
                <button className='button-dismiss' onClick={() => { setExpression(undefined); setResult(undefined) }}>✖</button>
              </div>
            )
          : null
      }

      {
        expression === ExpressionType.Argument
          ?
            (
              <div style={{ display: 'flex', margin: 0 }}>
                <select className='expression-bool' value={argument} onChange={e => { setArgument(e.target.value); setResult(args[e.target.value]) }}>
                  <option>select...</option>
                  {Object.keys(args).map(argName => (<option key={argName} value={argName}>{argName}</option>))}
                </select>
                <button className='button-dismiss' onClick={() => { setExpression(undefined); setResult(undefined) }}>✖</button>
              </div>
            )
          : null
      }

      {
        expression === ExpressionType.BooleanOperator
          ?
            (
              <>
                <Expression args={args} result={operands[0]} setResult={left => setOperands([left, operands[1]])} nest={nest + 1} />
                <div>|</div>
                <span style={{ display: 'flex' }}>
                  {operator.toString()}
                  <button className='button-dismiss-square' onClick={() => resetExpression()}>✖</button>
                </span>
                <div>|</div>
                <Expression args={args} result={operands[1]} setResult={right => setOperands([operands[0], right])} nest={nest + 1} />
              </>
            )
          : null
      }
    </div>
  )
}
