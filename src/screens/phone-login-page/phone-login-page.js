import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from '@react-navigation/native';
import { primaryColor } from '../../../assets/colors';
import logoImage from './../../../assets/onboarding.png';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

const Login = ({ navigation }) => {
    const phone = useRef();
    const countryPicker = useRef();

    const [cca2, setCCA2] = useState('US');
    const [pickerData, setPickerData] = useState();

    useEffect(() => {
        // setPickerData(phone.getPickerData());
    }, []);

    const onPressFlag = () => {
        countryPicker.current.open();
    }
     
    const selectCountry = (country) => {
        phone.current.selectCountry(country.cca2.toLowerCase());
        setCCA2(country.cca2);
    }

  return (
    <SafeAreaView style={ styles.mainContainer }>
        <View>
            <Text style={ styles.welcomeText }>Please Confirm your country code and enter your phone number</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '87%' }}>
            <View>
                <PhoneInput
                    ref={phone}
                    onPressFlag={onPressFlag}
                />

                <CountryPicker
                    ref={countryPicker}
                    onChange={(value)=> selectCountry(value)}
                    translation='eng'
                    cca2={cca2}
                >
                </CountryPicker>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '97%' }}>
                <Link to={'/OnBoarding'} style={[styles.loginLink, styles.cancelLink]}>Cancel</Link>
                <Link to={'/Chat'} style={[styles.loginLink, styles.nextLink]}>Next</Link>
            </View>
        </View>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: primaryColor
    },
    welcomeText: {
        marginVertical: 15,
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 18,
        width: 275,
        textAlign: 'center',
        color: 'white'
    },
    loginLink: {
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 21
    },
    cancelLink: {
        color: '#93979F',
        // width: '50%'
    },
    nextLink: {
        color: 'white',
        // width: '50%'
    }
});

export default Login;