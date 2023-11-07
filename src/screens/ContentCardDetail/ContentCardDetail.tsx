import React from 'react';
import {View, Text, Button} from 'react-native';
import Braze, {ContentCard} from '@braze/react-native-sdk';

import {ContentCardDetailScreenParams} from '../../navigation/InitialRootNavigator';
import useBrazeContext from '../../context/Braze/BrazeProvider';
import {BRAZE_CUSTOM_EVENTS} from '../../constants/braze';

import {commonStyles} from '../../style/common';

const ContentCardDetailScreen = ({
  route: {
    params: {card},
  },
  navigation,
}: ContentCardDetailScreenParams) => {
  const {contentCards, setContentCards} = useBrazeContext();

  const onClickedCard = () => {
    Braze.logContentCardClicked(card.id);
    Braze.logCustomEvent(BRAZE_CUSTOM_EVENTS.HAPPI_COMPLETED, {
      pet_id: card.extras.pet_id,
      activity: Number(card.extras.activity),
      unit: Number(card.extras.unit),
    });
    setContentCards(
      contentCards?.map(c =>
        card.id === c.id ? ({...card, clicked: true} as ContentCard) : card,
      ) ?? [],
    );
    navigation.goBack();
  };

  if (card.type !== 'Banner') {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Content Card Detail screen</Text>
        <Text style={commonStyles.description}>
          We are using this screen to display some details of the content card
        </Text>
        <Text style={commonStyles.cardTitle}>
          Content Card title: {card.title}
        </Text>
        {!card.clicked && (
          <Button title="Mark the card as clicked" onPress={onClickedCard} />
        )}
      </View>
    );
  }

  return null;
};

export default ContentCardDetailScreen;
