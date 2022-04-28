import React, { useState } from 'react'

import { Expression } from './Expression'
import { Argument } from './Argument'
import { ArgumentList } from './ArgumentList'

import { Args } from './types'

import styles from './App.module.css'

export const App = () => {
  const [args, setArgs] = useState<Args>({})
  const [result, setResult] = useState<boolean | undefined>(undefined)
  
  return (
    <>
      <ArgumentList args={args} setArgs={setArgs} />
      <Expression args={args} result={result} setResult={setResult} />

      <div className={styles.result}>
        <div>result</div>
        <div>is</div>
        <div>{JSON.stringify(result) || 'undefined'}</div>
      </div>
    </>
  )
}
