import React from 'react';
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import { primaryColor } from '../../../assets/colors';
import logoImage from './../../../assets/onboarding.png';

const OnBoarding = ({ navigation }) => {    

    const userID = useSelector((state) => state.auth.userId);

    console.log('userID: ', userID);

    return (
        <SafeAreaView style={ styles.mainContainer }>
            <View style={{ alignItems: 'center' }}>
                <Image source={logoImage} style={styles.logoImage}/>
                <Text style={ styles.welcomeHeading }>Welcome to Chatina</Text>
                <Text style={ styles.welcomeText }>Read our Privacy Policy. Tap “Agree & Continue” to accept the Terms of Service.</Text>
            </View>

            {
                (userID) && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.loginLink}>Agree & Continue</Text>
                    </TouchableOpacity>
                )
            }
            {
                (!userID) && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Agree & Continue</Text>
                    </TouchableOpacity>
                )
            }
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: primaryColor
    },
    logoImage: {
        width: 222,
        height: 221,
        marginBottom: 30
    },
    welcomeHeading: {
        marginVertical: 15,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'center',
        color: 'white',
    },
    welcomeText: {
        marginVertical: 15,
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        width: 270,
        color: 'white'
    },
    loginLink: {
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 21,
        color: 'white'
    },
    button: {
        width: 222,
        height: 40,
        // backgroundColor: 'red',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 8
    }
});

export default OnBoarding;