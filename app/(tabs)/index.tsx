import {FlatList, Pressable, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {offers} from "@/constants";
import {Fragment} from "react";
import cn from 'clsx'
import {images} from "../../constants";
import CartButtons from "@/components/CartButtons";

export default function Index() {

    const listHeader = () => ( <View className='flex-between flex-row w-full my-5 px-5'>
        <View className='flex-start'>
            <Text className='small-bold text-primary'>Deliver To</Text>
            <TouchableOpacity className='flex-center flex-row gap-x-1 mt-0.5'>
                <Text className='paragraph-bold' text-dark-100>U.S.A</Text>
                <Image
                    source={images.arrowDown}
                    className='size-3'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
        <CartButtons />

    </View>);

    return (
        <SafeAreaView  className='flex-1 bg-white'>
            <FlatList data={offers}
                      renderItem={({item, index}) => {
                          const isEven = index % 2 === 0;

                          return (
                              <Pressable className={cn('offer-card', isEven ? 'flex-row-reverse' : 'flex-row')}
                                         style={{backgroundColor: item.color }}
                                         android_ripple={{color: '#fffff22'}}
                              >
                                  {({pressed}) => (
                                      <Fragment>
                                          <View className='h-full w-1/2'>
                                              <Image
                                                  source={item.image}
                                                    className='size-full'
                                                  resizeMode='contain'
                                              />
                                          </View>
                                          <View className={cn('offer-card__info', isEven ? 'pl-10' : 'pr-10')}>
                                              <Text className='h1-bold text-white leading-tight'>
                                                  {item.title}
                                              </Text>
                                              <Image
                                                  source={images.arrowRight}
                                                  className='size-10'
                                                  resizeMode='contain'
                                                  tintColor='#ffffff'
                                                  />
                                          </View>
                                      </Fragment>
                                  )}
                              </Pressable>
                          )
                      }}
                      contentContainerClassName='pb-28 px-5'
                      ListHeaderComponent={() => listHeader()}
                      />
        </SafeAreaView>
    );
}
