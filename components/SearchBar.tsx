import {View, TextInput, TouchableOpacity, Image} from 'react-native'
import {useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {images} from "@/constants";
import {router} from "expo-router";



const SearchBar = () => {

    const params = useLocalSearchParams();
    const [query, setQuery] = useState<string>(params.query);


    const handleSearch= (text: string) => {
        setQuery(text);
        if(!text) {
            router.setParams({query: undefined});
        }
    }

    const handleSubmit = () => {
        if(query.trim()){
            router.setParams({query});
        }
    }
    return (
        <View className='searchbar'>
            <TextInput
                className='flex-1 p-5'
                placeholder='search for pizza, burger, etc...'
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor='#A0A0A0'
                returnKeyType='search'
            />
            <TouchableOpacity
                className='pr-5'
                onPress={() => router.push({query})}>
                <Image
                    source={images.search}
                    className='size-6'
                    resizeMode='contain'
                    tintColor='#5D5F6D'/>

            </TouchableOpacity>
        </View>
    )
}
export default SearchBar
