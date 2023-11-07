import React, {FC, useEffect} from 'react';
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Braze from '@braze/react-native-sdk';

import {NavigationKeys} from './NavigationScreenEnums';

import HomeScreen from '../screens/Home/HomeScreen';
import AppInfoScreen from '../screens/AppInfo/AppInfoScreen';
import EnrollmentScreen from '../screens/Enrollment/EnrollmentScreen';
import BrazeDashboardScreen from '../screens/BrazeDashboard/BrazeDashboard';
import useBrazeContext from '../context/Braze/BrazeProvider';
import ContentCardDetailScreen from '../screens/ContentCardDetail/ContentCardDetail';
import {ContentCard} from '@braze/react-native-sdk';

export type HomeStackParamList = {
  [NavigationKeys.HOME_SCREEN]: undefined;
  [NavigationKeys.BRAZE_DASHBOARD_SCREEN]: undefined;
};

export type HomeScreenParams = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, NavigationKeys.HOME_SCREEN>,
  StackScreenProps<MainStackParamList, NavigationKeys.MAIN_TAB_NAVIGATOR>
>;

export type BrazeDashboardScreenParams = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, NavigationKeys.BRAZE_DASHBOARD_SCREEN>,
  StackScreenProps<
    MainStackParamList,
    NavigationKeys.CONTENT_CARD_DETAIL_SCREEN
  >
>;

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator: FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={NavigationKeys.HOME_SCREEN}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name={NavigationKeys.BRAZE_DASHBOARD_SCREEN}
        options={{
          title: 'Braze Dashboards',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
        component={BrazeDashboardScreen}
      />
    </HomeStack.Navigator>
  );
};

// * -------------------------------------------------------------

export type MainTabParamList = {
  [NavigationKeys.HOME_NAVIGATOR]: undefined;
  [NavigationKeys.APP_INFO_SCREEN]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'blue',
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 18,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name={NavigationKeys.HOME_NAVIGATOR}
        options={{
          headerShown: false,
          title: 'Home',
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={NavigationKeys.APP_INFO_SCREEN}
        options={{
          headerShown: false,
          title: 'App Info',
        }}
        component={AppInfoScreen}
      />
    </Tab.Navigator>
  );
};

// * -------------------------------------------------------------

export type MainStackParamList = {
  [NavigationKeys.MAIN_TAB_NAVIGATOR]: undefined;
  [NavigationKeys.ENROLLMENT_SCREEN]: undefined;
  [NavigationKeys.CONTENT_CARD_DETAIL_SCREEN]: {card: ContentCard};
};

export type EnrollmentScreenParams = CompositeScreenProps<
  StackScreenProps<MainStackParamList, NavigationKeys.ENROLLMENT_SCREEN>,
  StackScreenProps<HomeStackParamList, NavigationKeys.BRAZE_DASHBOARD_SCREEN>
>;

export type ContentCardDetailScreenParams = StackScreenProps<
  MainStackParamList,
  NavigationKeys.CONTENT_CARD_DETAIL_SCREEN
>;

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigation: FC = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={NavigationKeys.MAIN_TAB_NAVIGATOR}
        component={MainTabNavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name={NavigationKeys.ENROLLMENT_SCREEN}
        component={EnrollmentScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name={NavigationKeys.CONTENT_CARD_DETAIL_SCREEN}
        component={ContentCardDetailScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </MainStack.Navigator>
  );
};

// * -------------------------------------------------------------

export type MainAppNavigatorParamList = {
  [NavigationKeys.MAIN_STACK_NAVIGATOR]: NavigatorScreenParams<MainStackParamList>;
};

const Drawer = createDrawerNavigator<MainAppNavigatorParamList>();

const MainAppNavigator: FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={NavigationKeys.MAIN_STACK_NAVIGATOR}
        component={MainStackNavigation}
      />
    </Drawer.Navigator>
  );
};

// * -------------------------------------------------------------

export type InitialRootParamList = {
  [NavigationKeys.MAIN_APP_NAVIGATOR]: NavigatorScreenParams<MainAppNavigatorParamList>;
};

const RootStack = createStackNavigator<InitialRootParamList>();

const InitialRootNavigator: FC = () => {
  const {setContentCards} = useBrazeContext();

  useEffect(() => {
    const contentCardsSubscription = Braze.addListener(
      Braze.Events.CONTENT_CARDS_UPDATED,
      ({cards}) => {
        console.log('CONTENT_CARDS_UPDATED', cards.length);
        // cards.forEach(card => {
        //   Braze.logContentCardDismissed(card.id);
        // });
        setContentCards(cards);
      },
    );

    return () => {
      contentCardsSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name={NavigationKeys.MAIN_APP_NAVIGATOR}
          component={MainAppNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default InitialRootNavigator;
