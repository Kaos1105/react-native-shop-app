import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import CartItem from '../../components/shop/CartItem';
import Color from '../../constants/Color';

const CartScreen = (prop) => {
  const cartTotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) =>
    Array.from(state.cart.items, ([key, value]) => ({ key, value }))
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Color.accent}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => <CartItem />}
      />
    </View>
  );
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
  },
  amount: {
    color: Color.primary,
  },
});
export default CartScreen;
