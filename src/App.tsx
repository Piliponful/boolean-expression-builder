import React, { useState, useEffect } from "react"

import { Expression } from './Expression'
import { Argument } from './Argument'

import { Args } from './types'

import './styles.css'

export default function App() {
  const [args, setArgs] = useState<Args>({})
  const [result, setResult] = useState<boolean | undefined>(undefined)
  
  const setNewArgName = (oldName: string, newName: string) => {
    const { [oldName]: old, ...newArgs } = args

    setArgs({ ...newArgs, [newName]: old })
  }

  const setNewArgValue = (argName: string, argValue: boolean) => {
    setArgs({ ...args, [argName]: argValue })
  }

  return (
    <>
      <div className='card'>
        <h3>Arguments</h3>

        {Object.keys(args).map(argName => (
          <Argument
            key={argName}
            setNewArgName={setNewArgName}
            setNewArgValue={setNewArgValue}
            argName={argName}
            argValue={args[argName]}
          />
        ))}

        {Object.keys(args).length === 0 ? <h3 className='secondary-text'>No Arguments Yet</h3> : null}

        <button className='button-add' onClick={() => setArgs({ ...args, newarg: false })}>
          +
        </button>
      </div>

      <Expression args={args} result={result} setResult={setResult} />

      <div className='result'>
        <div>result</div>
        <div>is</div>
        <div>{JSON.stringify(result) || 'undefined'}</div>
      </div>
    </>
  )
}
