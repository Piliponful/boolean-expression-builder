import React, { useState, useEffect } from 'react'

import { BooleanValueSelect } from '../../common/BooleanValueSelect'

import { ExpressionType } from '../../types'

import styles from './ConstantSelect.module.css'

type Props = {
  type: ExpressionType,
  result: boolean,
  setResult: (result: boolean) => void,
  reset: () => void
}

export const ConstantSelect = ({ type, result, setResult, reset }: Props): JSX.Element | null => {
  if (type !== ExpressionType.Constant) {
    return null
  }

  useEffect(() => {
    setResult(false)
  }, [])

  return (
    <div className={styles.container}>
      <BooleanValueSelect className={styles.select} value={result} setValue={setResult} />
      <button className={styles['dismiss-button']} onClick={reset}>✖</button>
    </div>
  )
}
