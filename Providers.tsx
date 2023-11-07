import React from 'react';
import {BrazeProvider} from './src/context/Braze/BrazeProvider';

const Providers = ({children}: {children: React.ReactElement[]}) => {
  return (
    <>
      <BrazeProvider>{children}</BrazeProvider>
    </>
  );
};

export default Providers;
