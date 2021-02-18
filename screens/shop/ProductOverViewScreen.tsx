import React from 'react';
import { FlatList, Text } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import {
  NavigationParams,
  NavigationProp,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ProductOverviewScreen = (props: IProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);

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
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductOverviewScreen;
