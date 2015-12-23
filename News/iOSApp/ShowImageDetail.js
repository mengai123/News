
'use strict';
var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Navigator,
  Image,
  TouchableOpacity,
} = React;

var Image_Detail_URL = 'http://apis.baidu.com/tngou/gallery/show';

var ShowImageDetail = React.createClass({

  getInitialState: function () {
    return {
      id: this.props.image.id,
      title: this.props.title,
      img: null,
      images: null,
    };
  },

  render: function () {
    return (
      <View style = {styles.container}>
        <Text>{this.state.title}</Text>
      </View>
    );
  },

  componentDidMount : function () {
    this.fetchData();
  },

  fetchData: function () {

    var obj = {
			method: "GET",
			headers: {
      'id' : this.state.id,
			'apikey' : '4f1dbfd91e07e653f07f974543895bb6',
			},
		};

    console.log(JSON.stringify(obj));

    fetch(Image_Detail_URL,obj)
			.then((response) => {
        console.log(JSON.stringify(response));
        return response.json()
      })
			.then((responseData) => {
        console.log(JSON.stringify(responseData));
				this.setState({
          id: responseData.id,
          title: responseData.title,
          images: responseData.list,
				});
			})
			.done();
  },
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
  },
});


module.exports = ShowImageDetail;
