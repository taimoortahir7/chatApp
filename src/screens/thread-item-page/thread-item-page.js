import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { redColor, orangeColor, blueColor, greenColor, primaryColor } from '../../../assets/colors';

const ThreadItem = (props) => {
  return (
    <View style={styles.orderItem}>
        <View style={ styles.categoryBackground }>
            <Image source={require('./../../../assets/user.png')}/>
        </View>
        <View style={styles.title}>
            {
                (props?.name) && (
                    <Text style={styles.titleHeading}>{props?.name}</Text>
                )
            }
            {
                (props?.phone) && (
                    <Text style={styles.titleHeading}>{props?.phone}</Text>
                )
            }
            <Text style={{ paddingHorizontal: 10, paddingVertical: 5, color: 'white' }}>{props?.about}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    display: 'flex',
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: '#E4E4E4',
    backgroundColor: primaryColor,
    padding: 20,
    alignItems: "center",
  },
  categoryBackground: {
    alignItems: "center",
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 4,
    shadowColor: "rgba(50, 50, 71, 0.08)",
    shadowOpacity: 5,
    shadowOffset: { width: 4, height: 14 },
    shadowRadius: 8,
    elevation: 5,
    // shadow: '0px 4px 4px rgba(50, 50, 71, 0.08), 0px 4px 8px rgba(50, 50, 71, 0.06)'
  },
  title: {
    display: 'flex',
    // alignItems: 'center'
  },
  tasks: {
    display: 'flex',
    flexDirection: 'row',
    // paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  titleHeading: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18
  }
});

export default ThreadItem;
