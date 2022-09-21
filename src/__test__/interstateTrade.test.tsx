import React from 'react';
import { render, screen, fireEvent,} from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import InterstateTrade from '../pages/InterstateTrade';
import DataTable from 'react-data-table-component'
import { DATA } from './Data';

let container: HTMLDivElement | Element | DocumentFragment | null | any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container?.remove();
  container = null;
});

it('should render <interstateTrade/> successfully', () => {
    render(<InterstateTrade /> );
    const labelForSearchInput = screen.getByTestId('labelForSearchInput');
    expect(labelForSearchInput).toBeTruthy();
    const searchInput = screen.getByTestId('searchInput');
    expect(searchInput).toBeTruthy();
    fireEvent.change(searchInput, {target: {value: 'test'}});
    expect(searchInput).toHaveValue('test');
    const button = screen.getByTestId('button');
    expect(button).toBeTruthy();
    expect(button).toHaveTextContent('Clear Search');
    const table = screen.getByRole('table');
    expect(table).toBeTruthy();
    
  });

  it('should render <DataTable/> successfully',()=> {
    interface InterStateRow {
        'Destination State': string
        'Millions Of Dollars': number
        'Thousands Of Tons': number
        topFiveStatesByAmount: string[] | any
        topFiveStatesByTons: string[] | any    
    }
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
                        row.topFiveStatesByAmount.map((states: any, key: number) => (
                            <div key={key}>
                                <li>{states['Destination State']}:</li>
                                <li>{states['Millions Of Dollars']}</li>
                            </div>
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
                        row.topFiveStatesByTons.map((states: any, key: number) => (
                            <div key={key}>
                                <li>{states['Destination State']}:</li>
                                <li>{states['Thousands Of Tons']}</li>
                            </div>
                        ))
                        }
                    </ul> 
                </>
            ),
        }
    ]
    const results: string[] = [];
    const interstate: string[] | any = [...DATA]
    const correctState = interstate.filter((stateReturn: string[] | any) => stateReturn['Destination State'] ===  stateReturn['Origin']);
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

      render(
        <DataTable
            title="State List"
            columns={columns}
            data={tableData}
            progressPending={results === undefined}
            pagination     
        />
        )
        const columnName = screen.getByText('Name');
        const columnTotalAmount = screen.getByText('Total Dollar Amount');
        const columnTotalTons = screen.getByText('Total Tons');
        const columnTop5StatesByAmount = screen.getByText('Top 5 States in terms of dollar Amount');
        const columnTop5StatesByTons = screen.getByText('Top 5 States in terms of Tons');
        expect(columnName).toBeTruthy()
        expect(columnTotalAmount).toBeTruthy()
        expect(columnTotalTons).toBeTruthy()
        expect(columnTop5StatesByAmount).toBeTruthy()
        expect(columnTop5StatesByTons).toBeTruthy()
  })