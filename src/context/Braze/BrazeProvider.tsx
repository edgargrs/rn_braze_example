import React, {createContext, useState, useContext} from 'react';
import {ContentCard} from '@braze/react-native-sdk';

export interface BrazeContextState {
  contentCards: ContentCard[] | null; // All braze content cards
  setContentCards: (cards: ContentCard[]) => void;
}

const BrazeContext = createContext<BrazeContextState>({
  contentCards: null,
  setContentCards: () => null,
});

export const BrazeProvider = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  const [_contentCards, _setContentCards] = useState<ContentCard[] | null>(
    null,
  );

  const setContentCards = (cards: ContentCard[]) => _setContentCards(cards);

  return (
    <BrazeContext.Provider
      value={{
        contentCards: _contentCards,
        setContentCards,
      }}>
      {children}
    </BrazeContext.Provider>
  );
};

const useBrazeContext = () => {
  const context = useContext(BrazeContext);
  if (context === undefined) {
    throw new Error('useBrazeContext must be used within a BrazeProvider');
  }

  return context;
};

export default useBrazeContext;
