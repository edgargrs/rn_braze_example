import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import Braze from '@braze/react-native-sdk';

import {BRAZE_CUSTOM_EVENTS} from '../../constants/braze';
import {EnrollmentScreenParams} from '../../navigation/InitialRootNavigator';
import {NavigationKeys} from '../../navigation/NavigationScreenEnums';

import {commonStyles} from '../../style/common';

const pet_id = 'PET-ID'; // Pet from custom attributes

const EnrollmentScreen = ({navigation}: EnrollmentScreenParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPressButton = () => {
    setIsLoading(true);
    Braze.logCustomEvent(BRAZE_CUSTOM_EVENTS.HAPPI_ENROLLMENT, {pet_id});
    console.log('logCustomEvent', BRAZE_CUSTOM_EVENTS.HAPPI_ENROLLMENT, {
      pet_id,
    });
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(NavigationKeys.BRAZE_DASHBOARD_SCREEN);
    }, 5000);
  };
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>EnrollmentScreen</Text>
      <Text style={commonStyles.description}>
        In this screen we are preparing everything to send a custom event to
        braze{'\n'}
        Custom event: {BRAZE_CUSTOM_EVENTS.HAPPI_ENROLLMENT}
        {'\n'}
        pet_id: {pet_id}
        {'\n'}
      </Text>
      {isLoading && <ActivityIndicator size={'large'} />}
      {!isLoading && (
        <Button title="Send custom event" onPress={onPressButton} />
      )}
    </View>
  );
};

export default EnrollmentScreen;
