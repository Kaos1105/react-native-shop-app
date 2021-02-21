import React from 'react';
import { FlatList, Platform, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import {
  NavigationParams,
  NavigationProp,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import * as cartActions from '../../store/actions/cart';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ProductOverviewScreen = (props: IProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: 'ProductDetail',
              params: { productId: itemData.item.id, productTitle: itemData.item.title },
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navData: IProps) => {
  return {
    headerTitle: 'All Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;
