import React from 'react';
import { Button, FlatList, Platform, Text } from 'react-native';

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
import Color from '../../constants/Color';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ProductOverviewScreen = (props: IProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate({
      routeName: 'ProductDetail',
      params: { productId: id, productTitle: title },
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Color.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Color.primary}
            title='To Cart'
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navData: IProps) => {
  return {
    headerTitle: 'All Products',
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
