import {View, Text, Button} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";

const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>
            <Button title='seed' onPress={() => seed().catch((error) => console.log("Seeding failed "+ error))} />
        </SafeAreaView>
    )
}
export default Search
