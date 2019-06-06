import React from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";


class Card extends React.Component {
  render() {

    const { children, style, onPress } = this.props;
   
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{...styles.container, ...style}}>
            {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingTop: 5
    },
});
export default Card;
