import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { dimensions, colors, fonts } from "../../constants/variables";
import { bold } from "ansi-colors";

class Card extends React.Component {
  render() {

    const { style, data: {title, subtitle, footer_title, product}, fullImage = false, iconEnable = false, titleEnable = false} = this.props;
   
    let imageStyle = styles.image;
    if(fullImage){
      imageStyle = {
        ...imageStyle,
        height: 120
      }
    }

    return (
      <View style={styles.block}>
        <View style={{...styles.Card, ...style}}>
          <Image style={imageStyle} source={{uri:"https://picsum.photos/200"}} />
          {!fullImage ? ( 
            <View style={styles.info}>
              {iconEnable ? <Icon
                style={{ marginRight: 10 }}
                name="user"
                size={21}
              /> : null}
              <View style={{ flexDirection: "column" }}>
                {titleEnable ? <Text style={[styles.headStyle]}>
                  {product}
                </Text> : null}
                {title ? <Text style={styles.text}>{title}</Text> : null}
                {subtitle ? <Text style={styles.text}>{subtitle}</Text> : null}
              </View>
            </View>
          ) : (
            <View style={styles.title}>
              <Text style={styles.title_text}>{title}</Text> 
            </View>
          )}

        </View>
        
        {footer_title && (
          <View style={styles.footer_title}>
            <Text style={styles.text}>- {footer_title}</Text> 
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  block:{
    flexDirection: 'column',
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    flex: 1,
    width: 120,
    margin: 2,
  },
  Card: {
    flexDirection: "column",
    padding: 4,
    justifyContent: "space-between",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.yellow,
    marginTop: 5,
    position: "relative",
    marginRight: 3
  },
  headStyle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: fonts.nunitoLight
  },
  image: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 70
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.nunitoLight
  },
  footer_title: {
    alignItems: "flex-end",
    marginRight: 5,
    marginTop: 5,
  },
  title:{

  },
  title_text:{
    position: 'absolute',
    bottom: 15,
    fontWeight: "bold",
    fontSize: 10,
    flexWrap: 'wrap',
    color: "#fff",
    paddingLeft: 5,
  }

});
export default Card;
