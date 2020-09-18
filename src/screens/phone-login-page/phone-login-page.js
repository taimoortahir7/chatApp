import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import { primaryColor, borderColor } from '../../../assets/colors';
import CountryPicker from 'react-native-country-picker-modal';

const Login = ({ navigation }) => {

    const [cca2, setCCA2] = useState('US');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('92');
    const [phone, setPhone] = useState();

    useEffect(() => {
        // setPickerData(phone.getPickerData());
    }, []);

    const validatePhoneNumber = (phoneNumber) => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(phoneNumber)
    }

    const handleSendCode = () => {
        const phoneNumber = '+'+countryCode+phone;
        console.log('phone: ', phoneNumber);
        // Request to send OTP
        if (validatePhoneNumber(phoneNumber)) {
          firebase
            .auth()
            .signInWithPhoneNumber('+'+countryCode+phone)
            .then(confirmResult => {
              navigation.navigate('PhoneCode', {
                confirmResult: confirmResult,
                phone: phone
              });
            })
            .catch(error => {
              alert(error.message);
              console.log('error: ' , error);
            })
        } else {
          alert('Invalid Phone Number')
        }
    };
     
    const selectCountry = (country) => {
        console.log('country: ', country);
        // phone.current.selectCountry(country.cca2.toLowerCase());
        setCountry(country.name);
        setCCA2(country.cca2);
        setCountryCode(country.callingCode);
    }

  return (
    <SafeAreaView style={ styles.mainContainer }>
        <View>
            <Text style={ styles.welcomeText }>Please Confirm your country code and enter your phone number</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '87%' }}>
            <View>
                <View style={{ marginTop: 30 }}>
                    
                    <View style={{ borderTopWidth: 1, width: 410, borderColor: borderColor, paddingVertical: 15, paddingHorizontal: 15 }}>
                        <CountryPicker
                            withFlag={true}
                            withCallingCode={true}
                            withFilter={true}
                            withFlagButton={true}
                            withCountryNameButton={true}
                            withCallingCodeButton={true}
                            onSelect={(value) => selectCountry(value)}
                            translation='eng'
                            cca2={cca2}
                        >
                        </CountryPicker>
                    </View>

                    <View style={styles.fieldStyling}>
                        <Text style={{ color: 'white' }}>{country}</Text>
                    </View>
                    
                    <View style={styles.phoneNumberFieldStyling}>
                        <View style={{ width: 65, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRightWidth: 1, borderRightColor: borderColor, borderLeftWidth: 1, borderLeftColor: borderColor, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'white' }}>+</Text>
                            <Text style={{ color: 'white' }}>{countryCode}</Text>
                        </View>
                        
                        <View style={{ width: 345 , paddingLeft: 20}}>
                            <TextInput
                                placeholder='Your Phone Number (without code)'
                                placeholderTextColor='#eee'
                                keyboardType='phone-pad'
                                value={phone}
                                style={{ color: 'white' }}
                                onChangeText={phone => {
                                    setPhone(phone);
                                }}
                                maxLength={10}
                            />
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '97%' }}>
                <Link to={'/OnBoarding'} style={[styles.loginLink, styles.cancelLink]}>Cancel</Link>
                <TouchableOpacity onPress={handleSendCode}>
                    <Text style={[styles.loginLink, styles.nextLink]}>Next</Text>
                </TouchableOpacity>
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
    },
    phoneNumberFieldStyling: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 410,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: borderColor,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    fieldStyling: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        width: 410, 
        borderColor: borderColor,
        paddingVertical: 15,
        paddingHorizontal: 15
    }
});

export default Login;