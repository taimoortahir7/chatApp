import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from '@react-navigation/native';
import { primaryColor } from '../../../assets/colors';
import logoImage from './../../../assets/onboarding.png';

const OnBoarding = ({ navigation }) => {    

  return (
    <SafeAreaView style={ styles.mainContainer }>
        <View style={{ alignItems: 'center' }}>
            <Image source={logoImage} style={styles.logoImage}/>
            <Text style={ styles.welcomeHeading }>Welcome to Chatina</Text>
            <Text style={ styles.welcomeText }>Read our Privacy Policy. Tap “Agree & Continue” to accept the Terms of Service.</Text>
        </View>

        <Link to='/Login' style={styles.loginLink}>Agree & Continue</Link>
        
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
    }
});

export default OnBoarding;