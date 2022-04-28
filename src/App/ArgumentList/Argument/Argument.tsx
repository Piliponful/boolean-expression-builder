import React, { useState } from 'react'

import { BooleanValueSelect } from '../../common/BooleanValueSelect'

import styles from './Argument.module.css'

type ArgumentProps = {
  setNewArgName: (argName: string, newArgName: string) => void;
  setNewArgValue: (argName: string, argValue: boolean) => void;
  argValue: boolean;
  argName: string;
}

export const Argument = ({ setNewArgName, setNewArgValue, argValue, argName }: ArgumentProps) => {
  const [newArgName, setArgName] = useState(argName)

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='text'
        value={newArgName}
        onChange={e => setArgName(e.target.value)}
        onBlur={e => setNewArgName(argName, newArgName)}
      />
      <BooleanValueSelect
        className={styles.select}
        value={argValue}
        setValue={value => setNewArgValue(argName, value)}
      />
    </div>
  )
}
