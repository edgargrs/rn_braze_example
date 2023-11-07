import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Braze from '@braze/react-native-sdk';
import {NavigationKeys} from '../../navigation/NavigationScreenEnums';
import {HomeScreenParams} from '../../navigation/InitialRootNavigator';
import {commonStyles} from '../../style/common';

const userId = 'USER-ID';

const HomeScreen = ({navigation: {navigate}}: HomeScreenParams) => {
  const goToEnrollmentScreen = () => navigate(NavigationKeys.ENROLLMENT_SCREEN);
  const goToDashboardScreen = () =>
    navigate(NavigationKeys.BRAZE_DASHBOARD_SCREEN);

  useEffect(() => {
    console.log('changeUser', userId);
    Braze.changeUser(userId);
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Home Screen</Text>
      <Text style={commonStyles.description}>
        Here is our home screen, we are only changing the braze user, loading
        resources and their state. (User, Pets, etc.) {'\n'}
        Continue to the next screen
      </Text>
      <Button title="Go to enrollment screen" onPress={goToEnrollmentScreen} />
      <Button title="Go to dashboard screen" onPress={goToDashboardScreen} />
    </View>
  );
};

export default HomeScreen;
