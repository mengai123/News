
'use strict';
var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Navigator,
  Image,
  TouchableOpacity,
  ListView,
} = React;

var Image_Detail_URL = 'http://apis.baidu.com/tngou/gallery/show';

var ShowImageDetail = React.createClass({

  getInitialState: function () {
    return {
      images: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
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
        <ListView
          dataSource = {this.state.images}
          renderRow = {this.renderImageRow}
          style = {styles.listViewContainer} />
      );
    }
  },

  componentDidMount : function () {
    this.fetchData();
  },

  renderImageRow: function (img) {
    return (
      <TouchableOpacity style = {styles.listRowcontainer}>
          <Image style = {styles.imageContainer}
            source = {{uri: 'http://tnfs.tngou.net/image' + img.src}} />
      </TouchableOpacity>
    );
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
          images: this.state.images.cloneWithRows(responseData.list),
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
  listViewContainer: {
    flex: 1,
    marginTop: 64,
    marginBottom: 49,
  },
  listRowcontainer: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    marginRight: 15,
    height : 100,
    backgroundColor: '#ffffff',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 0.5,
  },
  imageContainer: {
    width: 60,
    height: 80,
  },
});


module.exports = ShowImageDetail;
