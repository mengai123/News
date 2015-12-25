'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Image,
  Navigator,
  Text,
  ScrollView,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var LargeImage = React.createClass({

    getInitialState: function () {
      return {
        screenWidth: width,
        screenHeight: height,
      };
    },

    render: function () {
      return (
        // <ScrollView
        //   contentContainerStyle = {styles.scrollViewContent}
        //   style = {styles.scrollViewContainer} >
        // </ScrollView>

        <Image
        style = {styles.img}
        source = {{uri: 'http://tnfs.tngou.net/image' + this.props.img.src}}
        />

      );
    },
});

var styles = StyleSheet.create({

  // scrollViewContainer: {
  //   flex : 1,
  //   marginTop: 64,
  //   marginBottom: 49,
  // },
  //
  // scrollViewContent: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  img: {
    flex: 1,
  },
});


module.exports = LargeImage;
