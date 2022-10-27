import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Films from '../components/Films';
import { mountWithStore } from './mountWithStore';
import { configure } from 'enzyme';



test('bleh', () => {
    expect(2).toBe(2)
});

/** 
* Test to check if filter fields gets cleard
*/
// Setup enzyme's react adapter

test("Check if filters ", async () => {
    const mockState = {
        myData: {
          isLoading: true
        }
      }
    let wrapper = mountWithStore(<Films />, mockState);
    
    //const genre = getByTestId(container, 'genre') as HTMLInputElement
    const {container} = render(<MemoryRouter><Films /></MemoryRouter>);
    const button = wrapper.getByTestId('resetFields');
    const search = wrapper.getByTestId('searchField') as HTMLInputElement
   // const search = getByTestId(container, 'searchField') as HTMLInputElement
    //const genre = getByTestId(container, 'genre') as HTMLInputElement
    //const year = getByTestId(container, 'year') as HTMLInputElement
    
    fireEvent.click(button);
    await waitFor(() => {
        expect(search.value).toBe('');
    })
    // await waitFor(() => {
    //     expect(genre.value).toBe('');
    // })
    // await waitFor(() => {
    //     expect(year.value).toBe('');
    // })
});


