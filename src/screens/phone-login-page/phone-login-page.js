import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import { primaryColor } from '../../../assets/colors';
import logoImage from './../../../assets/onboarding.png';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

const Login = ({ navigation }) => {
    // const phone = useRef();
    // const countryPicker = useRef();

    const [cca2, setCCA2] = useState('US');
    const [pickerData, setPickerData] = useState();
    const [phone, setPhone] = useState();
    const [confirmResult, setConfirmResult] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [userId, setUserID] = useState();

    useEffect(() => {
        // setPickerData(phone.getPickerData());
    }, []);

    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(phone)
    }

    const handleSendCode = () => {
        // Request to send OTP
        if (validatePhoneNumber()) {
          firebase
            .auth()
            .signInWithPhoneNumber(phone)
            .then(confirmResult => {
              setConfirmResult(confirmResult)
            })
            .catch(error => {
              alert(error.message)
      
              console.log(error)
            })
        } else {
          alert('Invalid Phone Number')
        }
    };

    const  handleVerifyCode = () => {
        // Request for OTP verification
        if (verificationCode.length == 6) {
            confirmResult
            .confirm(verificationCode)
            .then(user => {
                setUserID(user.uid);
                firebase
                .database()
                .ref('users/' + user.uid).set({
                    phoneNumber: phone
                  })
                .then(result => console.log('result: ', result))
                .catch(err => console.log('err: ', err));
                alert(`Verified! ${user.uid}`)
            })
            .catch(error => {
                alert(error.message)
                console.log(error)
            })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }

    const  renderConfirmationCodeView = () => {
        return (
            <View style={styles.verificationView}>
                <TextInput
                    style={[styles.fieldStyling]}
                    placeholder='Verification code'
                    placeholderTextColor='#eee'
                    value={verificationCode}
                    keyboardType='numeric'
                    onChangeText={verificationCode => {
                        setVerificationCode(verificationCode);
                    }}
                    maxLength={6}
                />
                <TouchableOpacity
                    style={[styles.themeButton, { marginTop: 20 }]}
                    onPress={handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // const onPressFlag = () => {
    //     countryPicker.current.open();
    // }
     
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
                {/* <PhoneInput
                    ref={phone}
                    onPressFlag={onPressFlag}
                /> */}

                {/* <CountryPicker
                    ref={countryPicker}
                    onChange={(value)=> selectCountry(value)}
                    translation='eng'
                    cca2={cca2}
                >
                </CountryPicker> */}

                <View style={{ marginTop: 30 }}>
                    <View style={styles.fieldStyling}>
                        <Text style={{ color: 'white' }}>Pakistan</Text>
                    </View>
                    
                    <TextInput
                        style={[styles.fieldStyling, {borderTopWidth: 0}]}
                        placeholder='Phone Number ( +92xxxxxxxxxx )'
                        placeholderTextColor='#eee'
                        keyboardType='phone-pad'
                        value={phone}
                        onChangeText={phone => {
                            setPhone(phone);
                        }}
                        maxLength={15}
                        editable={confirmResult ? false : true}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.themeButton, { marginTop: 20 }]}
                    onPress={handleSendCode}>
                    <Text style={styles.themeButtonTitle}>
                        Send Code
                    </Text>
                </TouchableOpacity>

                {confirmResult ? renderConfirmationCodeView() : null}

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
    },
    fieldStyling: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        width: 410, 
        borderColor: '#555963',
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});

export default Login;