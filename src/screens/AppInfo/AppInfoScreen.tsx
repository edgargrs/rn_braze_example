import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {commonStyles} from '../../style/common';

const appInfo: Record<string, string> = {
  'React Native version': '0.71.13',
  'React-Native Braze SDK Version': '7.0.0',
};

const AppInfoScreen: FC = () => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>App Info</Text>
      {Object.keys(appInfo).map((k, i) => (
        <Text style={commonStyles.description} key={`${i}`}>
          {k}: {appInfo[k]}
        </Text>
      ))}
    </View>
  );
};

export default AppInfoScreen;
