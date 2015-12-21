/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TabBar = require('./iOSApp/TabBar');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var News = React.createClass({
  render : function (){
    return (<TabBar style = {styles.container} />);
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
});

AppRegistry.registerComponent('News', () => News);
