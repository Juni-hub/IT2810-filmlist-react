import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import Films from '../components/Films';
import { mountWithStore } from './mountWithStore';
import { MockedProvider } from "@apollo/client/testing";
import { resetApolloContext } from '@apollo/client';




test('bleh', () => {
    expect(2).toBe(2)
});

/** 
* Test to check if filter fields gets cleard
*/

test("Check if filters are cleared ", async () => {
  const mockState = {
    myData: {
      isLoading: true
    }
  }
    let wrapper = mountWithStore(<MockedProvider mocks={[]}><Films /></MockedProvider>, mockState);
    
    const button = wrapper.container.querySelector('#reset')!;
    const search = wrapper.container.querySelector('#searchField') as HTMLInputElement
    const genre = wrapper.container.querySelector('#genre') as HTMLInputElement
    const year = wrapper.container.querySelector('#year') as HTMLInputElement

    fireEvent.click(button);
    await waitFor(() => {
      expect(search.value).toBe('');
    });

  await waitFor(() => {
    expect(genre.value).toBe('');
    });
  
  await waitFor(() => {
      expect(year.value).toBe('');
    });

});


