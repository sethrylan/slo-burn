import { useSearchParams } from 'react-router-dom'

export function useSearchParamsState(searchParamName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  const searchParamsState = acquiredSearchParam ?? defaultValue

  const setSearchParamsState = (newState) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    )
    setSearchParams(next)
  }
  return [searchParamsState, setSearchParamsState]
}
