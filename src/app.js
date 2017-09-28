import { StackNavigator } from 'react-navigation'
import routes from './routes'

const App = StackNavigator(routes,{headerMode :'none'});

export default App;