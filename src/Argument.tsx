import React, { useState } from 'react'

import { BooleanValueSelect } from './BooleanValueSelect'

type ArgumentProps = {
  setNewArgName: (argName: string, newArgName: string) => void;
  setNewArgValue: (argName: string, argValue: boolean) => void;
  argValue: boolean;
  argName: string;
}

export const Argument = ({ setNewArgName, setNewArgValue, argValue, argName }: ArgumentProps) => {
  const [newArgName, setArgName] = useState(argName)

  return (
    <div key={argName}>
      <input
        className='input'
        type='text'
        value={newArgName}
        onChange={e => setArgName(e.target.value)}
        onBlur={e => setNewArgName(argName, newArgName)}
      />
      <BooleanValueSelect
        className='select-bool'
        value={argValue}
        setValue={value => setNewArgValue(argName, value)}
      />
    </div>
  )
}
