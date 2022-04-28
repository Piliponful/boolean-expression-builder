import React from 'react'

type BooleanValueSelectProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  className: string;
}

export const BooleanValueSelect = ({ className, value = false, setValue }: BooleanValueSelectProps) => {
  return (
    <select
      className={className}
      value={value.toString()}
      onChange={e => setValue(JSON.parse(e.target.value))}
    >
      <option value='true'>true</option>
      <option value='false'>false</option>
    </select>
  )
}
