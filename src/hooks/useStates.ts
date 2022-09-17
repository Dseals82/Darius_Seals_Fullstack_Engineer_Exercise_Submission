import { useCallback, useEffect, useState } from 'react'

export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

const useStates = () => {
    const [results, setResults] = useState<StateRow[]>()
    const [nameSearchString, setNameSearchString] = useState<string>('')
    const clearFilter = useCallback(() => {
        setNameSearchString('')
    }, [])
    const search = useCallback((searchString: string) => {
        setNameSearchString(searchString)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000'
            )
            const data = await response.json()
            setResults(data.results)
        }
        fetchData()
    }, [])

    if (nameSearchString.trim() !== '' && results) {
        return {
            results: results?.filter((result) =>
                result.name
                    .toLowerCase()
                    .startsWith(nameSearchString.toLowerCase())
            ),
            clearFilter,
            search,
            nameFilter: nameSearchString,
        }
    }

    return { results, clearFilter, search, nameFilter: nameSearchString }
}

export default useStates
