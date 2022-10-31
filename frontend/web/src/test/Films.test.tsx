import { fireEvent, getByTestId, queryByText, render, waitFor,screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import Films from '../components/Films';
import { MockedProvider} from "@apollo/client/testing";
import { SEARCH_FILMS } from '../queries/filmQueries';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';


const mocks=  [
  {
    request: {
      query: SEARCH_FILMS,
      variables: {
        limit: 15,
        offset:"" ,
        titleFilter: "",
        genreFilter: "",
        yearFilter: 0,
        sorting: 1

      }
    },
    result: {
      data: {
        getFilteredPosts: [{"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa473","title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa474","title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa475","title":"Caught","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa476","title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa477","title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
        {"_id":"63453c374d8655244d2aa478","title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa479","title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},{"_id":"63453c374d8655244d2aa47b","title":"New Life Rescue","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47c","title":"New Morning Bath","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47d","title":"Searching Ruins on Broadway, Galveston, for Dead Bodies","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47e","title":"The Tribulations of an Amateur Photographer","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47f","title":"Trouble in Hogan's Alley","year":1900,"cast":[],"genres":["Comedy"]},{"_id":"63453c374d8655244d2aa480","title":"Two Old Sparks","year":1900,"cast":[],"genres":["Short"]},{"_id":"63453c374d8655244d2aa481","title":"The Wonder, Ching Ling Foo","year":1900,"cast":["Ching Ling Foo"],"genres":["Short"]}]
      }
    }
  }
];

it("renders without error", async () => {
  render(
    <Provider store = {store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <Films />
    </MockedProvider>
    </Provider>
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  
});

it("should show error UI", async () => {
  const filmMock = {
    request: {
      query: SEARCH_FILMS,
      variables: { 
        limit: 15,
        offset:0 ,
        titleFilter: "",
        genreFilter: "",
        yearFilter: 0,
        sorting: 1
       }
    },
    error: new Error("Something went wrong...")
  };
  render(
    <Provider store={store}>
    <MockedProvider mocks={[filmMock]} addTypename={false}>
      <Films />
    </MockedProvider>
    </Provider>
  );
  expect(await screen.findByText("Something went wrong...")).toBeInTheDocument();
});

it("should render films", async () => {
  const filmMock = {
    request: {
      query: SEARCH_FILMS,
      variables: {
        limit: 15,
        offset:0 ,
        titleFilter: "",
        genreFilter: "",
        yearFilter: 0,
        sorting: 1

      }
    },
    result: {
      data: {
        getFilteredPosts: [{"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa473","title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa474","title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa475","title":"Caught","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa476","title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa477","title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
        {"_id":"63453c374d8655244d2aa478","title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa479","title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},{"_id":"63453c374d8655244d2aa47b","title":"New Life Rescue","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47c","title":"New Morning Bath","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47d","title":"Searching Ruins on Broadway, Galveston, for Dead Bodies","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47e","title":"The Tribulations of an Amateur Photographer","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47f","title":"Trouble in Hogan's Alley","year":1900,"cast":[],"genres":["Comedy"]},{"_id":"63453c374d8655244d2aa480","title":"Two Old Sparks","year":1900,"cast":[],"genres":["Short"]},{"_id":"63453c374d8655244d2aa481","title":"The Wonder, Ching Ling Foo","year":1900,"cast":["Ching Ling Foo"],"genres":["Short"]}]
      }
    }
  }
  render(
    <Provider store={store}>
    <MockedProvider mocks={[filmMock]} addTypename={false}>
      <Films  />
    </MockedProvider>
    </Provider>
  );
  expect(await screen.findByText("After Dark in Central Park")).toBeInTheDocument();
});

it("clear search field", async () => {
  const searchMock=  [
    {
      request: {
        query: SEARCH_FILMS,
        variables: {
          limit: 15,
          offset:"" ,
          titleFilter: "After Dark in Central Park",
          genreFilter: "",
          yearFilter: 0,
          sorting: 1
  
        }
      },
      result: {
        data: {
          getFilteredPosts: [{"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa473","title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
          {"_id":"63453c374d8655244d2aa474","title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa475","title":"Caught","year":1900,"cast":[],"genres":[]},
          {"_id":"63453c374d8655244d2aa476","title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa477","title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
          {"_id":"63453c374d8655244d2aa478","title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa479","title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},{"_id":"63453c374d8655244d2aa47b","title":"New Life Rescue","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47c","title":"New Morning Bath","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47d","title":"Searching Ruins on Broadway, Galveston, for Dead Bodies","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47e","title":"The Tribulations of an Amateur Photographer","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47f","title":"Trouble in Hogan's Alley","year":1900,"cast":[],"genres":["Comedy"]},{"_id":"63453c374d8655244d2aa480","title":"Two Old Sparks","year":1900,"cast":[],"genres":["Short"]},{"_id":"63453c374d8655244d2aa481","title":"The Wonder, Ching Ling Foo","year":1900,"cast":["Ching Ling Foo"],"genres":["Short"]}]
        }
      }
    }
  ];

  render(
    <Provider store={store}>
    <MockedProvider mocks={searchMock} addTypename={false}>
      <Films />
    </MockedProvider>
    </Provider>
  );


  // Find the button element...

  const button = await screen.getByRole('button', {
    name: /edit/
  })
  expect(button).toBeInTheDocument();

  // const searchField = await screen.findByAltText("Search for title") as HTMLInputElement;
  // userEvent.click(button); // Simulate a click and fire the mutation

 // const button2 = container.querySelector('reset')! as HTMLElement;
  //const searchField2 = container.querySelector('searchField') as HTMLInputElement;
 // expect(await screen.findByText("Buffalo Bill's Wild West Parad")).toBeInTheDocument();  
  //expect(searchField.value).toBe('');




});




