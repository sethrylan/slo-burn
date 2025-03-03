import { useSearchParams } from 'react-router-dom'

type SearchParamValue = string | number | boolean;

export function useSearchParamsState<T extends SearchParamValue>(
  searchParamName: string,
  defaultValue: T
): [T, (newState: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  // Convert string to proper type based on defaultValue
  const searchParamsState = acquiredSearchParam !== null 
    ? (typeof defaultValue === 'number' 
        ? Number(acquiredSearchParam) 
        : typeof defaultValue === 'boolean'
          ? acquiredSearchParam === 'true'
          : acquiredSearchParam) as T
    : defaultValue

  const setSearchParamsState = (newState: T) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {} as Record<string, string>
      ),
      { [searchParamName]: String(newState) }
    )
    setSearchParams(next)
  }
  return [searchParamsState, setSearchParamsState]
}
