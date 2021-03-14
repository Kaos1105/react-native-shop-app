import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, Platform } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Loading from '../../components/UI/Loading';
import * as orderActions from '../../store/actions/orders';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state: RootState) =>
    Array.from(state.orders.items, ([key, value]) => ({ key, value }))
  );
  const dispatch = useDispatch();

  const loadOrder = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderActions.fetchOrder());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.key}
      renderItem={(itemData) => <OrderItem item={itemData.item.value} />}
    />
  );
};

OrderScreen.navigationOptions = (navData: IProps) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrderScreen;
