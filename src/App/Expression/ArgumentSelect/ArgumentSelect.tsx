import React, { useState, useEffect } from 'react'

import { Args, ExpressionType } from '../../types'

import styles from './ArgumentSelect.module.css'

type Props = {
  args: Args,
  result: boolean,
  setResult: (result: boolean) => void,
  reset: () => void,
  type: ExpressionType
}

export const ArgumentSelect = ({ args, result, setResult, reset, type }: Props): JSX.Element | null => {
  if (type !== ExpressionType.Argument) {
    return null
  }

  const [argument, setArgument] = useState<string | undefined>(undefined)

  useEffect(() => {
    const name = Object.keys(args)[0]
    setArgument(name)
    setResult(args[name])
  }, [])

  useEffect(() => {
    if (!argument) {
      return
    }

    if (argument in args && result !== args[argument]) { // argument value updated
      setResult(args[argument])
    } else { // argument name updated
      setResult(undefined)
      setArgument(undefined)
    }
  }, [JSON.stringify(args)])

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={argument}
        onChange={e => { setArgument(e.target.value); setResult(args[e.target.value]) }}
      >
        <option>select...</option>
        {Object.keys(args).map(argName => (<option key={argName} value={argName}>{argName}</option>))}
      </select>

      <button className={styles['dismiss-button']} onClick={reset}>✖</button>
    </div>
  )
}
