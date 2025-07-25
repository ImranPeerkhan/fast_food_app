import {View, Text, FlatList} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from '@/components/CustomHeader';
import cn from 'clsx';
import { PaymentInfoStripeProps } from '@/type';
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const {items, getTotalPrice, getTotalItems} = useCartStore();

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    return (
        <SafeAreaView className='bg-white h-full'>
            <FlatList
                data={items}
                renderItem={({item}) => <CartItem item={item}/>}
                keyExtractor={item => item.$id}
                contentContainerClassName='px-5 pt-5 pb-28'
                ListHeaderComponent={() => <CustomHeader title ='Your Cart'  />}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View>
                        <View>
                            <Text className='text-lg text-gray-700'>Payment Summary</Text>
                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee (${totalItems})`}
                                value={`$5.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`-$0.50`}
                                valueStyle='!text-success'
                            />
                            <View className='border-t border-gray-300 my-2' />
                                <PaymentInfoStripe
                                    label={`Total`}
                                    value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                                    labelStyle='base=bold !text-dark-100'
                                    valueStyle='base=bold !text-dark-100 !text-right'
                                />
                        </View>
                        <CustomButton title='order now' />
                    </View>
                )}
                />

        </SafeAreaView>
    )
}
export default Cart
