import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import Background from '../background';
import Container from '../Container';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Logo from '../logo'
import { colors, fonts, dimensions } from '../../constants/variables';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import FingerprintScanner from 'react-native-fingerprint-scanner'; 
import ShakingText from '../shakingText';
import BottomButton from '../bottomButton';
import {Languages} from '../../components/Languages/All_languages'

class FingurPrintScaner extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errorMessage: undefined, 
            error: false,
            success: false,
            counter: 5,
        };
        Languages.setLanguage(global.code);
    }

    onSkip = () => {
        this.props.onSkip();
    }

    componentWillMount() {
        FingerprintScanner
          .authenticate({ onAttempt: this.handleAuthenticationAttempted })
          .then(() => {
              if(this.props.type === 'verify' || this.props.sensorType === 'faceId')
                this.props.onVerify()
              this.setState({error: false, success: true})
          })
          .catch((error) => {
            this.setState({ errorMessage: error.message, error: true, counter: this.state.counter -1 });
          });
      }

      renderFingerPrint = (error, success) => {
          if(success){
              return <View style={styles.fingerPrintCont}>
                          <View style={styles.fingerPrint}>
                            <MaterialIcons name="fingerprint" size={150} color='white' />
                        </View>
                        <View style={styles.checkIcon}>
                            <MaterialIcons name="check" size={35} color= {colors.yellow}/>
                        </View>
                        
                    </View>
          }else {
              return <View style={styles.fingerPrintCont}>
              <MaterialIcons name="fingerprint" size={170} color={error ? 'red' : success ? 'green' : colors.orange } />
          </View>
          }
      }

    render() {
        const { error, success, counter } = this.state;
        const title = this.props.title || "Register Your Fingerprint";
        const { sensorType } = this.props;
        const skippable = !this.props.skippable ? false : true;
        return (
            <Background smallTopMargin type="dark" style={styles.background}>
                <View style={styles.header}>
                    {!this.props.hideBack ? <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <FontAwesomeIcon style={styles.backBtn} name="angle-left" size={35} color="black" />
                    </TouchableOpacity> : <View></View>}
                    {skippable && !success && <Text onPress={() => this.onSkip()} style={[styles.skipBtn, this.props.skipStyle]}>{Languages.SKIP}</Text>}
                </View>
                <View style={styles.logoCont}>
                    <Logo style={{height: 100}} styleTxt={{fontSize: 30}}/>
                    {/* {skippable && <Text onPress={() => this.onSkip()} style={[styles.skipBtn, this.props.skipStyle]}>skip</Text>} */}
                </View>
                <Container style={styles.container}>
                {/* {sensorType === 'faceId' ? <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{resizeMode: 'contain', height: 150}} source={require('../../images/faceId.png')} />
                        <Text style={styles.faceTxt}>Scan your face</Text>
                    </View> : null} */}
                    <View style={styles.heading}>
                        <Text style={styles.headingTxt}>{title}</Text>
                    </View>
                   {sensorType === 'touchId' ? this.renderFingerPrint(error, success) : null}
                    <View style={{height: 10}}>
                        {success &&
                            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}> 
                                <Text style={{color: 'green'}}>{Languages.FINGERPRINT_VERIFIED}</Text>
                            </View>}
                    {error && <ShakingText
                            ref={(instance) => { this.description = instance; }}
                            style={styles.description(error)}>
                            {error && counter < 1 ? Languages.YOUR_FINGERPRINT_NOT_VARIFIY : Languages.FINGERPRINT_NOT_MATCH}
                        </ShakingText>}
                    </View>
                    
                   { sensorType === 'touchId' ? <View style={styles.fingerInstruction}>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages. PLACE_AND_LEFT}</Text>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.FINGERPRINT_SCANNER}</Text>
                    </View> : null}
                    
                </Container>
                    {success && <View style={{flex:1, bottom: -2, padding: 0, height: '100%'}}>
                        <BottomButton style={{}}>
                            <TouchableOpacity onPress={this.props.onVerify} activeOpacity={0.6} style={styles.bottomButton}>
                                <Text style={styles.continueTxt}>{Languages.CONTINUE}</Text>
                                <FontAwesomeIcon style={styles.icon} name="angle-right" size={30} color="white" />
                            </TouchableOpacity>
                        </BottomButton>
                    </View>}
                    
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        padding: 0,
    },
    logoCont: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 8,
        margin: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        flexDirection: 'column',
        justifyContent: "space-between",
        width: '100%'
        // marginBottom: (dimensions.bottomButtonHeight - 10),
    },

    heading: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 13,
        // marginBottom: 20,
    },

    headingTxt: {
        fontSize: 22,
        color: '#747474',
        fontFamily: fonts.nunitoLight,
    },

    fingerPrintCont: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkIcon: {
      backgroundColor: 'white',
      height: 50, 
      width: 50, 
      borderRadius: 50, 
      borderColor: colors.gold, 
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      right: 100,
      bottom: 200,
    },

    fingerInstruction: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },

    skipBtn: {
        color:  colors.burgundy, 
        // paddingHorizontal: 15,
        paddingBottom: 3,
        fontSize: 20,
        borderRadius: 5,
        fontFamily: fonts.nunitoLight,
       
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // paddingTop: 10,
    },  

    fingerPrint: {
      marginTop: 40,
        backgroundColor: colors.gold,
        borderRadius: 200,
        height: 230,
        width: 230,
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 1,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 20,    
            },
            android: {
              elevation: 40,
            },
          }),
    },

    description: (error) => ({
        textAlign: 'center',
        color: error ? '#ea3d13' : '#a5a5a5',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
      }),

      bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: dimensions.bottomButtonHeight
    },
    
    continueTxt: {
      color:'white', 
      fontSize: 20, 
      marginRight: 20,
      fontFamily: fonts.nunitoLight
    },

    faceTxt: {
        fontFamily: fonts.nunitoLight,
        fontSize: 20,
        marginTop: 20
    }
})

export default FingurPrintScaner;