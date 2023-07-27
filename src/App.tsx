import { Provider } from 'react-redux'
import BattleshipGamePage from './pages/BattleshipGamePage'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <BattleshipGamePage />
    </Provider>
  )
}

export default App
