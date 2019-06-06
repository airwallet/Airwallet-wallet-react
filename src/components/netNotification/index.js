import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  Animated,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import { setNetStatus } from '../../actions/common';
import { fonts } from '../../constants/variables';
import { ifIphoneX } from '../../utils/isIphoneX';

const { width} = Dimensions.get('window');
const barWidth = width;
// const barHeight = 20;
const height = 20
const disconnectMsg = "No Connection";
const connectedMsg = "Back Online";
let _this

class Netinfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        barColor : 'green',
        barHeight: new Animated.Value(0),
        message: disconnectMsg
      }
      _this = this
      this.hideTimer = null;
  }

  onConnect() {
    console.log('netinfo onconnect', this.props.isConnected)
    if(!this.state.isDisconnected){
        this.setState({isDisconnected: false})
        return
    } else{
        this.setState({ barColor: 'green', message: connectedMsg})
        this.hideTimer = setInterval(() => this.hideMessage(), 2000);
    }
  }

  hideMessage = () => {
      clearInterval(this.hideTimer)
    Animated.timing(                  
        this.state.barHeight,          
        {
          toValue: 0,
          duration: 1000,
        }
      ).start();
  }

  onDisconnect(){
    this.setState({ barColor: 'grey', isDisconnected: true, message: disconnectMsg})
    Animated.timing(                  
        this.state.barHeight,          
        {
          toValue: height,
          duration: 1000,
        }
      ).start();
  }

  _handleNetInfo(isConnected){
      console.log('netinfo handle', isConnected)
     isConnected ? _this.onConnect() : _this.onDisconnect();
     isConnected ? _this.props.setNetStatus(true) : _this.props.setNetStatus(false)
  }

  componentDidMount() {
      NetInfo.isConnected.addEventListener('connectionChange', this._handleNetInfo);
  }

  componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this._handleNetInfo);
  }
  
  render() {
    const { barHeight, message } = this.state;
    return (
      <Animated.View
        style={[styles.container, {
          height: barHeight,
          width: barWidth,
          backgroundColor: this.state.barColor}]} >
          <Text style={styles.msgTxt}>
            {message}
          </Text>
          </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        ...ifIphoneX({
            position: 'absolute',
            bottom: 10,
        }, {
            //
        })
    },

    msgTxt: {
        textAlign: 'center',
        color: "white",
        fontSize: 14,
        fontFamily: fonts.nunitoLight,
    }
});

const mapStateToProps = (state) => {
    return {
        isConnected: state.common.get('isConnected')
    };
};

export default connect(
  mapStateToProps,
  {setNetStatus}
)(Netinfo)