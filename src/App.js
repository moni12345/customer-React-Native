import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import RootNavigator from './Router';
import { persistor, store } from './store';
import LayzeeLogoScreen from './screens/LayzeeLogoScreen';
import { PersistGate } from 'redux-persist/lib/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <PersistGate loading={<LayzeeLogoScreen />} persistor={persistor}>
            <RootNavigator persistenceKey={"NavigationState"} />
          </PersistGate>
        </View>
      </Provider>
    )
  }
}

export default App;