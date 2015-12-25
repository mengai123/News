
'use strict';
var React = require('react-native');
var Lodash = require('lodash');

var LargeImage = require('./LargeImage');

var {
  StyleSheet,
  View,
  Text,
  Navigator,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');
var Image_Detail_URL = 'http://apis.baidu.com/tngou/gallery/show';

var ShowImageDetail = React.createClass({

  getInitialState: function () {
    return {
      images: null,
      loaded: false,
      screenWidth: width,
      screenHeight: height,
    };
  },

  render: function () {
    if (!this.state.loaded) {
      return (
        <View style = {styles.loadingContainer}>
          <Text>{'加载美图中 ... '}</Text>
        </View>
      );
    } else  {
      return (
        <ScrollView
          contentContainerStyle = {styles.scrollViewContent}
          style = {styles.scrollViewContainer} >
            {this.renderImagesRow(this.state.images)}
        </ScrollView>
      );
    }
  },

  componentDidMount : function () {
    this.fetchData();
  },

  renderImagesRow: function (images) {
    return images.map((img,index) => {
        return(
          <TouchableOpacity onPress = {() => this.pressImage(img)}>
            <Image
              style = {[this.calculateImageSize(), styles.img]}
              source = {{uri: 'http://tnfs.tngou.net/image' + img.src}}
              defaultSource = {require('image!placeholder')} />
          </TouchableOpacity>
        );
      });
  },

  pressImage: function (img) {
    this.props.navigator.push({
      //title: image.title,
      passProps: {img : img},
      component: LargeImage,
    });
  },

  calculateImageSize: function () {
    var IMAGE_ROW_COUNT = 4;
    var size = this.state.screenWidth / IMAGE_ROW_COUNT;
    return {
      width: size,
      height: size,
    };
  },

  fetchData: function () {
    var obj = {
			method: "GET",
      headers:{
        'apikey' : '4f1dbfd91e07e653f07f974543895bb6',
      },
		};

    var requestURL = Image_Detail_URL + '?id=' + this.props.image.id;
    fetch(requestURL,obj)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
          images: responseData.list,
          loaded: true,
				});
			})
			.done();
  },
});

var styles = StyleSheet.create({
  loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
  },

  scrollViewContainer: {
    flex : 1,
    marginTop: 64,
    marginBottom: 49,
  },

  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    borderWidth: 0.5,
    borderColor: '#ffffff',
  },
});


module.exports = ShowImageDetail;
