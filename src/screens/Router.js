import Splash from './screens/Splash';
import Profile from './screens/Profile';
import DashBoard from './screens/DashBoard';
import SideDrawer from './SideDrawer';
import SignUp from './screens/SignUp';
import VerificationCode from './screens/VerificationCode';
import VerifySignup from './screens/VerifySignup';
import SignIn from './screens/SignIn';
import EditProfile from './screens/EditProfile';
import ForgotPassword from './screens/ForgotPassword'
import NewPassword from './screens/NewPassword'

import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

const MainStack = createStackNavigator({
  Home: { screen: DashBoard },
  Profile: { screen: Profile },
  EditProfile: { screen: EditProfile }
});
const AppStack = createDrawerNavigator({
  MainStack: { screen: MainStack },
},
  {
    contentComponent: SideDrawer,
  }
);

export const AuthStack = createStackNavigator({
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    NewPassword: { screen: NewPassword },
    VerifyForgotPassword: { screen: VerificationCode },
    VerifySignup: { screen: VerifySignup }
});

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    AuthLoading: {
      screen: Splash,
      navigationOptions: { header: null },
    }
  },
  {
    initialRouteName: "AuthLoading",
  }
);

export default RootNavigator;