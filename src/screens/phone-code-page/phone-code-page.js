import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { primaryColor, borderColor } from '../../../assets/colors';

const CELL_COUNT = 6;

const PhoneCode = ({ route, navigation }) => {

    const {confirmResult, phone} = route.params;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [verificationCode, setVerificationCode] = useState();

    useEffect(() => {
        // setPickerData(phone.getPickerData());
    }, []);

    const  handleVerifyCode = () => {
        // Request for OTP verification
        if (verificationCode.length == 6) {
            confirmResult
            .confirm(verificationCode)
            .then(user => {
                firebase
                .database()
                .ref('users/' + user.uid).set({
                    phoneNumber: phone
                  })
                .then(result => navigation.navigate('Home', {
                    userID: user.uid
                }))
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

  return (
    <SafeAreaView style={ styles.mainContainer }>
        <View>
            <Text style={ styles.welcomeText }>Please Enter the security code you received for verification</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '87%' }}>
            <View>
                {/* {renderConfirmationCodeView} */}
                <CodeField
                    ref={ref}
                    {...props}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                    )}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '97%' }}>
                <Link to={'/OnBoarding'} style={[styles.loginLink, styles.cancelLink]}>Cancel</Link>
                <TouchableOpacity onPress={handleVerifyCode}>
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
    codeFieldRoot: {
        marginTop: 100,
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    cellText: {
        color: 'white',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
    },
});

export default PhoneCode;