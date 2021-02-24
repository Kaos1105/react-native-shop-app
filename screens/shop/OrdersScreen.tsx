import React from 'react';
import { View, FlatList, Text, Platform } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OrderScreen = (props) => {
  const orders = useSelector((state: RootState) =>
    Array.from(state.orders.items, ([key, value]) => ({ key, value }))
  );

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
