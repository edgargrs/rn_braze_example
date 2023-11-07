import React, {FC} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import InitialRootNavigator from './src/navigation/InitialRootNavigator';

import Providers from './Providers';

const gestureHandlerRootViewStyle = {flex: 1};

const App: FC = () => {
  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
      <Providers>
        <StatusBar barStyle={'default'} />
        <InitialRootNavigator />
      </Providers>
    </GestureHandlerRootView>
  );
};

// Switch the export to enable storybook
//export { default } from './.storybook';
export default App;
