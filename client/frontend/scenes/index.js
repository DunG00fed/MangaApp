import { StackNavigator } from 'react-navigation';

import HomeMenu from './HomeMenu';
import Login from './Login';
import Register from './Register';

export default (DrawNav = StackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    HomeMenu: {screen: HomeMenu}
},
{
    initialRouteName: 'Login',
    headerMode: 'none'
}
));