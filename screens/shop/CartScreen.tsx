import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Loading from '../../components/UI/Loading';
import Color from '../../constants/Color';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CartScreen = (prop) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector(
    (state: RootState) => Array.from(state.cart.items, ([key, value]) => ({ key, value }))
    //.sort((a,b)=>a.value.quantity>b.value.sum ? 1:-1)
  );
  const dispatch = useDispatch();

  const addOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount).toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            color={Color.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={addOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <CartItem
            cartItem={itemData.item.value}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.key));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navData: IProps) => {
  return {
    headerTitle: 'Your Cart',
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
  },
  amount: {
    color: Color.primary,
  },
});
export default CartScreen;
