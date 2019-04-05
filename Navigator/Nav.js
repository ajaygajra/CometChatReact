import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginPage from '../LoginScreen/LoginPage';
import SignUp from '../LoginScreen/SignUp';

const MainNavigator = createStackNavigator({
  Login: {screen: LoginPage},
  SignUp: {screen: SignUp},
});

const App = createAppContainer(MainNavigator);

export default App;