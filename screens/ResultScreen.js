import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to_text: '',
      from_text: ''
    }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View>
            
        </View>
    )
    }

}