import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CreatePin from './createPin';
import GetName from './userDetail';
import GetEmail from './userDetail/getEmail';
import GetBirth from './userDetail/getBirth';
import GetGender from './userDetail/getGender';
import PhoneRegistration from './userDetail/phoneRegistration';
import PhoneVerification from './userDetail/phoneVerification';
import VerifyFingerPrint from './verifyFingerPrint';
import BackupPharse from './backupPharse';
import { OpenApp } from './openApp';
import EmailVerification from './userDetail/emailVerification';
import Login from './login';
import RecoveryPhrase from './backupPharse/recoveryPhrase';
import ResetPassword from './resetPassword';
import AuthStatus from './authStatus';
import CreateAirWallet from '../../screens/auth/createAirWallet'
import EmailVerifyMessage from './userDetail/emailVerifyMessage';
import ResetPasswordInput from './resetPassword/resetPasswordInput';

export const AuthNavigation = createStackNavigator(
    { 
     // authStatus: AuthStatus,
      createWallet: CreateAirWallet,
      getName: GetName,
      getBirth: GetBirth,
      getEmail: GetEmail,
      getGender: GetGender,
      login: Login,
      phoneRegistration: PhoneRegistration,
      phoneVerification: PhoneVerification,
      backupPharse: BackupPharse,
      verifyFingerPrint: VerifyFingerPrint,
      createPin: CreatePin,
      emailVerification: EmailVerifyMessage,
      openApp: OpenApp,
      recoveryPhrase: RecoveryPhrase,
      resetPassword: ResetPassword,
      emailVerifyMessage: EmailVerifyMessage,
      resetPasswordInput: ResetPasswordInput
    },
    {
      initialRouteName: 'createWallet',
      navigationOptions: {
      header: null
      },
    }
  );


