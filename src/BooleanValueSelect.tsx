import React from 'react'

type BooleanValueSelectProps = {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const BooleanValueSelect = ({ value, setValue }: BooleanValueSelectProps) => {
  return (
    <select
      value={value.toString()}
      onChange={e => setValue(JSON.parse(e.target.value))}
    >
      <option value='true'>true</option>
      <option value='false'>false</option>
    </select>
  )
}
