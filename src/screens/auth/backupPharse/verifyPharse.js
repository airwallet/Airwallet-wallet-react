import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { randomizeArray } from '../../../utils'
import { colors, fonts } from "../../../constants/variables";
import ShakingText from '../../../components/shakingText';
import {Languages} from '../../../components/Languages/All_languages'

 export default class VerifyPharse extends Component {
       constructor(props) {
        super(props);
        const backupPhrase = props.backupPhrase.map(item => item)
        this.state = {
            secretWord: randomizeArray(backupPhrase),
            selectedWords: [],
            match: false,
            error: false,
        }
        Languages.setLanguage(global.code) 
    }

    matchWords = () => {
      const { selectedWords } = this.state;
      const { backupPhrase } = this.props;
        let error = false;
        let match = false;
        selectedWords.map((word, index)=> {
          if(backupPhrase[index] != word){
            error = true;
            match = false
          }else{
            match = ((selectedWords.length === backupPhrase.length) && !error)
          }
        })
        this.props.matchWords(match, selectedWords)
        this.setState({error})
    }

    onSelectWord = (word, index) => {
      const secretWord = this.state.secretWord;
      const selectedWords = this.state.selectedWords;
      secretWord.splice(index, 1);
      selectedWords.push(word);
      this.setState({secretWord, selectedWords}, () => this.matchWords())
    }

    onRemoveWord = (word, index) => {
      const secretWord = this.state.secretWord;
      const selectedWords = this.state.selectedWords;
      selectedWords.splice(index, 1);
      secretWord.splice(index, 0, word);
      this.setState({secretWord, selectedWords}, () => this.matchWords())
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.errorShake !== this.props.errorShake){
        this.error.shake();
      }
    }
   
    render() {
      const { secretWord, selectedWords, error } = this.state;
     
      return (
       <View>         
          <DropArea 
            onRemoveWord={this.onRemoveWord}
            selectedWords={selectedWords} 
          />
              <View style={[styles.row]}>
                {secretWord.map((item, i) => {
                  return <Draggy 
                            key={i}
                            word={item}
                            index={i}
                            onSelectWord={this.onSelectWord}
                        />
                })}
              </View>

              <View style={styles.error}>
              <ShakingText
                  ref={(instance) => { this.error = instance; }}
                  style={styles.errorTxt(error)}>
                  {error ? Languages.INVALID_ORDER_TRY_AGAIN : ''}
              </ShakingText>
              </View>
        </View>
      );
    }
  }

  const Draggy = ({word, index, onSelectWord}) => (
    <Text style={[styles.wordStyle]} onPress={() => onSelectWord(word, index)}>
      {word}
    </Text>
  )
  
  const DropArea = ({selectedWords, onRemoveWord}) => (
    <View style={styles.dropZone}>
        {selectedWords.length ? 
          selectedWords.map((item, i) => {
            return <Draggy 
                      key={i}
                      word={item}
                      index={i}
                      onSelectWord={onRemoveWord}
                  />
        })
          : null}
        </View>
  )
  

let styles = StyleSheet.create({
  
  row: {
    borderRadius: 5,
    borderColor: colors.borderGrey,
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 20,
    minHeight: 30,
  },  

  dropZone: {
    height: 100,
    backgroundColor: "rgba(229, 229, 299, 0.2)",
    flexDirection: 'row',

    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  wordStyle: {
      borderColor: colors.borderGrey,
      borderWidth: 1,
      padding: 2,
      paddingHorizontal: 8,
      marginHorizontal: 4,
      marginVertical: 3,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      height: 25,
      fontFamily: fonts.nunitoLight,
  },

  error: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
  },

  errorTxt: (error) => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5',
    
  }),
});
