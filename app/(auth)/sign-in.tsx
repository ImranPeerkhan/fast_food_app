import React, {useState} from 'react'
import {View, Text, Button, Alert} from "react-native";
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native';

export const SignIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState( {email:'', password:''});

    const submit = async() =>{

        const { email, password } = form;
        if(!email || !password) {
            return alert('Please fill all fields')
        }
        setIsSubmitting(true)
        try{
            await signIn({email, password});

            Alert.alert('Success', 'You have signed in successfully')
            router.replace('/')
        } catch (error : any) {
            Alert.alert('Error', error.message)
            Sentry.captureEvent(error)}
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className='gap-10 bg-white rounded-lg p-5 m-5'>
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
                title='Sign In'
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text>Don&#39;t have an account? </Text>
                <Link href='/sign-up' className='text-primary base-bold'>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn

