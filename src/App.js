import './App.css';
import Centers from './Components/Centers';
import Circles from './Components/Circles'
import HelperText from './Components/HelperText';
import GlobalContextProvider from './Context/GlobalContext';
function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <Circles />
        <Centers />
        <HelperText />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
