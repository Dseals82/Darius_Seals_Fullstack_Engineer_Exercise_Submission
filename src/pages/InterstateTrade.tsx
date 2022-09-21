import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import useStates from '../hooks/useStates'

 interface InterStateRow {
    'Destination State': string
    'Millions Of Dollars': number
    'Thousands Of Tons': number
    topFiveStatesByAmount: string[] | any
    topFiveStatesByTons: string[] | any    
}

const InterstateTrade = () => {
    const { results, clearFilter, search, nameFilter } = useStates()
    const [interstate, setInterstate] = useState([])
    const columns = [
        {
            name: 'Name',
            selector: (row: InterStateRow) => row['Destination State'],
        },
        {
            name: 'Total Dollar Amount',
            selector: (row: InterStateRow) => row['Millions Of Dollars'],
        },
        {
            name: 'Total Tons',
            selector: (row: InterStateRow) => row['Thousands Of Tons'],
        },
        {
            name: 'Top 5 States in terms of dollar Amount',
            cell: (row: InterStateRow) => (
                <> 
                    <ul style={{listStyle: 'none'}}>
                        {
                        row.topFiveStatesByAmount.map((states: any) => (
                            <>
                                <li>{states['Destination State']}:</li>
                                <li>{states['Millions Of Dollars']}</li>
                            </>
                        ))
                        }
                    </ul> 
                </>
            ),
        },
        {
            name: 'Top 5 States in terms of Tons',
            cell: (row: InterStateRow) => (
                <> 
                    <ul style={{listStyle: 'none'}}>
                        {
                        row.topFiveStatesByTons.map((states: any) => (
                            <>
                                <li>{states['Destination State']}:</li>
                                <li>{states['Thousands Of Tons']}</li>
                            </>
                        ))
                        }
                    </ul> 
                </>
            ),
        }
    ]
    const stateId: string[] | undefined = results?.map((result)=> result.id); 
    const stateFound: boolean = results?.length === 1;
    const correctState = interstate.filter((stateReturn) => stateReturn['Destination State'] ===  stateReturn['Origin']);
    const destinationState = correctState[0]?.['Destination State'];
    const millionsOfDollars = correctState[0]?.['Millions Of Dollars'];
    const thousandsOfTons = correctState[0]?.['Thousands Of Tons'];
    const topStatesByAmount = [...interstate].sort((a, b) => b['Millions Of Dollars'] - a['Millions Of Dollars']).splice(0,5);
    const topStatesByTons = [...interstate].sort((a,b) => b['Thousands Of Tons'] - a['Thousands Of Tons']).splice(0,5);
   
    const tableData = [
        {
            'Destination State': destinationState,
            'Millions Of Dollars':millionsOfDollars,
            'Thousands Of Tons':thousandsOfTons,
            'topFiveStatesByAmount':topStatesByAmount,
            'topFiveStatesByTons': topStatesByTons
            
        }
    ];



    useEffect(()=>{
        const fetchStates = async ()=> { 
            const resp = await fetch(`https://datausa.io/api/data?Origin%20State=${stateId}&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest`);
            const data = await resp.json();
            setInterstate(data.data);
            console.log(data.data)
        }
        if(stateFound){
            fetchStates();
        }
        if(!stateFound){
            setInterstate([]);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stateFound])


    return (
        <div>
            <div>
                <label data-testid='labelForSearchInput' htmlFor="state">Search for a State</label>
                <input
                    value={nameFilter}
                    onChange={(evt) => search(evt.target.value)}
                    name="state"
                    type="text"
                    data-testid='searchInput'
                />
                <button data-testid='button' onClick={clearFilter}>Clear Search</button>
                
            </div>
            <DataTable
                title="State List"
                columns={columns}
                data={tableData}
                progressPending={results === undefined}
                pagination
            />
        </div>
    )

}

export default InterstateTrade
