import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

export const mountWithStore = (
  component: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined,
  mockState: any,
  mockDispatch = jest.fn()
) => {
  const mockStore = configureStore([])

  const store = mockStore(mockState)
  store.dispatch = mockDispatch

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}