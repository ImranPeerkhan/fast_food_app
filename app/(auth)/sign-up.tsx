import React, {useState} from 'react'
import {View, Text, Button, Alert} from "react-native";
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

export const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState( {name:'', email:'', password:''});

    const submit = async() =>{

        const { name, email, password } = form;
        if(!name || !email || !password) {
            return alert('Please fill all fields')
        }
        setIsSubmitting(true)
        try{
            await createUser({
                email,
                password,
                name,
            })

            Alert.alert('Success', 'You have signed up successfully')
            router.replace('/')
        } catch (error : any) {
            Alert.alert('Error', error.message)
            Sentry.captureEvent(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className='gap-10 bg-white rounded-lg p-5 m-5'>
            <CustomInput
                placeholder='Enter your Name'
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
                label='Full Name'
            />
            <CustomInput
                placeholder='Enter your Email'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                label='Email'
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label='password'
                secureTextEntry={true}
            />
            <CustomButton
                title='Sign Up'
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text>Already have an account ? </Text>
                <Link href='/sign-in' className='text-primary base-bold'>Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp

