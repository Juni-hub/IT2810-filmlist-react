import { render} from '@testing-library/react';
import App from '../App';
import store from '../redux/store';
import { Provider } from 'react-redux';

/** 
* Test for app
*/
test('renders app', () => {
  render(
  <Provider store = {store}>
  <App />
  </Provider>
  );
});




