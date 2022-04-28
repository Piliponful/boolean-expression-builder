import React from 'react'

import { Argument } from './Argument'

import { Args } from '../../types'

import styles from './ArgumentList.module.css'

type Props = {
  args: Args,
  setArgs: (args: Args) => void
}

export const ArgumentList = ({ args, setArgs }: Props): JSX.Element => {
  const setNewArgName = (oldName: string, newName: string) => {
    const { [oldName]: old, ...newArgs } = args

    setArgs({ ...newArgs, [newName]: old })
  }

  const setNewArgValue = (argName: string, argValue: boolean) => {
    setArgs({ ...args, [argName]: argValue })
  }

  return (
    <div className={styles.card}>
      <h3>Arguments</h3>

      <div className={styles.container}>
        {Object.keys(args).map(argName => (
          <Argument
            key={argName}
            setNewArgName={setNewArgName}
            setNewArgValue={setNewArgValue}
            argName={argName}
            argValue={args[argName]}
          />
        ))}
      </div>

      {Object.keys(args).length === 0 ? <h3 className={styles['secondary-text']}>No Arguments Yet</h3> : null}

      <button className={styles['button-add']} onClick={() => setArgs({ ...args, newarg: false })}>
        +
      </button>
    </div>
  )
}
