import logo from './logo.svg';
import './App.css';
import Routing from './Router';
import { createStore } from 'redux';
import appReducer from './Redux';
import { Provider } from 'react-redux';

let store = createStore(appReducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}  >
        <Routing />
      </Provider>
    </div>
  );
}

export default App;
