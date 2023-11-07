import React, {useEffect} from 'react';
import {Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import Braze, {ContentCard} from '@braze/react-native-sdk';

import {BrazeDashboardScreenParams} from '../../navigation/InitialRootNavigator';
import {NavigationKeys} from '../../navigation/NavigationScreenEnums';
import useBrazeContext from '../../context/Braze/BrazeProvider';

import {commonStyles} from '../../style/common';

interface CardPropsInterface {
  card: ContentCard;
  onPressCard: (card: ContentCard) => void;
}

const renderCard = ({card, onPressCard}: CardPropsInterface) => {
  const onPress = () => onPressCard(card);
  if (card.type !== 'Banner') {
    return (
      <TouchableOpacity
        style={commonStyles.cardContainer}
        onPress={onPress}
        activeOpacity={0.8}
        key={card.id}>
        <Text style={commonStyles.cardTitle}>{card.title}</Text>
      </TouchableOpacity>
    );
  }
  return null;
};

const BrazeDashboardScreen = ({
  navigation: {navigate},
}: BrazeDashboardScreenParams) => {
  const {contentCards} = useBrazeContext();

  const onRefresh = () => {
    console.log('requestContentCardsRefresh');
    Braze.requestContentCardsRefresh();
  };

  useEffect(() => {
    console.log('requestContentCardsRefresh');
    Braze.requestContentCardsRefresh();
  }, []);

  const onPressCard = (card: ContentCard) =>
    navigate(NavigationKeys.CONTENT_CARD_DETAIL_SCREEN, {card});

  return (
    <ScrollView
      contentContainerStyle={commonStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          tintColor="black"
        />
      }>
      <Text style={commonStyles.title}>Braze dahsboard</Text>
      <Text style={commonStyles.description}>
        This screen is specific to see the content cards.
      </Text>
      {contentCards?.length === 0 && (
        <Text style={commonStyles.description}>No content cards</Text>
      )}
      {contentCards?.map(card => renderCard({card, onPressCard}))}
    </ScrollView>
  );
};

export default BrazeDashboardScreen;
