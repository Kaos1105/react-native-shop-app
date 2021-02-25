import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Order from '../../models/order';
import CartItem from './CartItem';

interface IProps {
  item: Order;
}

const OrderItem = (props: IProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.item.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.item.readableDate}</Text>
      </View>
      <Button
        color={Color.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(!showDetails);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.item.items.map((cartItem) => (
            <CartItem key={cartItem.key} cartItem={cartItem.value}></CartItem>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
