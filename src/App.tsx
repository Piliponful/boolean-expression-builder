import React, { useState, useEffect } from "react"

import { OperationsList } from './OperationsList'
import { Argument } from './Argument'

import { Args } from './types'

export default function App() {
  const [args, setArgs] = useState<Args>({})
  
  const setNewArgName = (oldName: string, newName: string) => {
    const { [oldName]: old, ...newArgs } = args

    setArgs({ ...newArgs, [newName]: old })
  }

  const setNewArgValue = (argName: string, argValue: boolean) => {
    setArgs({ ...args, [argName]: argValue })
  }

  return (
    <div>
      {Object.keys(args).map(argName => (
        <Argument
          key={argName}
          setNewArgName={setNewArgName}
          setNewArgValue={setNewArgValue}
          argName={argName}
          argValue={args[argName]}
        />
      ))}

      <button onClick={() => setArgs({ ...args, newarg: false })}>
        + add args
      </button>

      <hr />

      <OperationsList args={args} />
    </div>
  )
}
