import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import { NavigationActions } from 'react-navigation';
import ShopNavigator from './ShopNavigator';
import { NavigationContainerRef } from '@react-navigation/native';

const NavigatorContainer = (props) => {
  const navRef = useRef<NavigationContainerRef>(null);

  const isAuth = useSelector((state: RootState) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigatorContainer;
