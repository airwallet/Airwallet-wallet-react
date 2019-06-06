
import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/variables';

const transparent = 'transparent';

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class OverlayLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent
    };
  }


  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  close() {
    this.setState({ visible: false });
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) newState.visible = props.visible;
    if (state.textContent !== props.textContent)
      newState.textContent = props.textContent;
    return newState;
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        {this.props.customIndicator ? (
          this.props.customIndicator
        ) : (
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            color={colors.orange}
            style={[styles.activityIndicator, { ...this.props.indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    if (!this.state.visible) return null;

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={this.state.visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: transparent,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    background: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainer: {
      flex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute'
    },
    textContent: {
      top: 80,
      height: 50,
      fontSize: 20,
      fontWeight: 'bold'
    },
    activityIndicator: {
      flex: 1,

    }
  });
  