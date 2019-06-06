import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FacebookNotifications from './facebookNotification';
import TwitterNotifications from './twitterNotifications';

class Notifications extends Component {
    render() {
        return (
            <View>
                <FacebookNotifications/>
                <TwitterNotifications/>
            </View>
        );
    }
}

export default Notifications;