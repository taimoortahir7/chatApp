import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";


const SearchView = (props) => {

  return (
    <View style={styles.addProject}>
        <View>
          <View style={styles.search}>
            <Image source={require('./../../../assets/search.png')}/>
            <TextInput
                style={ styles.textInput }
                onChangeText={text => searchFilterFunction(text)}
                placeholder='Search'
                textContentType='name'
                ref={r=>passwordTextInput=r}
            />
          </View>
        </View>
        {/* <TouchableOpacity activeOpacity = { .5 } onPress={() => refRBSheet.current.open()}>
          <Image source={require('./../assets/plusBlue.png')}/>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  addProject: {
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    height: 36, 
    borderColor: 'rgba(118, 118, 128, 0.12);',
    backgroundColor: 'rgba(118, 118, 128, 0.12);',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingLeft: 10
  },
  textInput: { 
    paddingLeft: 10
  },
});

export default SearchView;
