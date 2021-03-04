import React from 'react';
import { View, StyleSheet, Image, Text, Platform } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Product from '../../models/product';
import Card from '../UI/Card';

interface IProps {
  product: Product;
  onSelect: () => void;
  children?: React.ReactNode;
}

const ProductItem = (props: IProps) => {
  let TouchableComponent = TouchableNativeFeedback;
  if (Platform.OS !== 'android' && Platform.Version < 21) {
    TouchableComponent = TouchableOpacity;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={{ uri: props.product.imageUrl }}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.product.title}</Text>
            <Text style={styles.price}>${props.product.price.toFixed(2)}</Text>
          </View>
        </TouchableComponent>
        <View style={styles.actions}>{props.children}</View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 20,
    paddingBottom: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    // height: '60%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
  },
});

export default ProductItem;
