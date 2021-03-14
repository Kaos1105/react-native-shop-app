import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Color from '../../constants/Color';
import Loading from '../../components/UI/Loading';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ProductOverviewScreen = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate({
      routeName: 'ProductDetail',
      params: { productId: id, productTitle: title },
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error occurred!</Text>
        <Button title='Try again' onPress={loadProducts} color={Color.primary} />
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductOverviewScreen;
