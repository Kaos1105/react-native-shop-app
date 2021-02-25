import React from 'react';
import { Button, FlatList, Platform } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Color from '../../constants/Color';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state: RootState) => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem product={itemData.item} onSelect={() => {}}>
          <Button color={Color.primary} title='Edit' onPress={() => {}} />
          <Button color={Color.primary} title='Delete' onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData: IProps) => {
  return {
    headerTitle: 'Your Products',
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

export default UserProductsScreen;
