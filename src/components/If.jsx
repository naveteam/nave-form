import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

const If = ({ children, conditions }) => {
  const { watch } = useFormContext()

  const validateAppear = useCallback(
    () =>
      conditions.map(condition =>
        Object.entries(condition).reduce((acc, [key, value]) => acc && watch(key) === value, true),
      ),
    [conditions, watch],
  )

  const shouldAppear = validateAppear()

  return useMemo(() => shouldAppear.includes(true) && children, [shouldAppear, children])
}

export default If
