import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import { useCartStore } from '@/store/cart.store';
import {router} from 'expo-router';

const CartButtons = () => {
    const {getTotalItems} = useCartStore();
    console.log("getTotalItems",getTotalItems());
    const totalItems= getTotalItems()
    return (
        <TouchableOpacity className='cart-btn' onPress={() => router.push('/cart')}>
            <Image source={images.bag} className='size-5' resizeMode='contain' />
            {totalItems > 0 && (
                <View className='cart-badge'>
                    <Text className='small-bold text-white'>{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButtons
