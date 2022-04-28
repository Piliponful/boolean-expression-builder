import React, { useState, useEffect } from 'react'

import { ExpressionType } from '../../types'

import styles from './ExpressionTypeSelect.module.css'

type Props = {
  type: ExpressionType,
  setType: (type: ExpressionType) => void,
  setOperator: (operator: string) => void
}

export const ExpressionTypeSelect = ({ type, setType, setOperator }: Props): JSX.Element | null => {
  if (type) {
    return null
  }

  return (
    <select
      className={styles.select}
      onChange={e => { setType(e.target.value as ExpressionType); setOperator(e.target.options[e.target.selectedIndex].text) }}
    >
      <option value=''>select...</option>
      <option value={ExpressionType.Constant}>constant</option>
      <option value={ExpressionType.Argument}>argument</option>
      <option value={ExpressionType.BooleanOperator}>and</option>
      <option value={ExpressionType.BooleanOperator}>or</option>
    </select>
  )
}
