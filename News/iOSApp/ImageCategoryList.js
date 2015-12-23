
'use strict';

var React = require('react-native');

var ImagesListView = require('./ImagesListView');

var {
  StyleSheet,
  View,
  Text,
  Navigator,
  ListView,
  TouchableOpacity,
} = React;

var Image_Category_URL = 'http://apis.baidu.com/tngou/gallery/classify';
var ImageCategoryList = React.createClass({
    getInitialState : function () {
      return{
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loaded: false,
      };
    },

    render : function () {
      if (!this.state.loaded) {
        return (
          <View style = {styles.loadingContainer}>
            <Text>Loading ...</Text>
          </View>
        );
      } else {
        return(
          <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow}
          style = {styles.listViewContainer}
          />
        );
      }
    },

    componentDidMount: function (){
      this.fetchData();
    },

    _renderRow: function (imageCategory) {
      return (
        <TouchableOpacity
        onPress = {() => this.didSelectedImageCategory(imageCategory)}
        style = {styles.listRowContainer}>
          <Text style = {styles.titleContainer}>{imageCategory.title}</Text>
        </TouchableOpacity>
      );
    },

    didSelectedImageCategory: function (imageCategory) {
      this.props.navigator.push({
        title: imageCategory.title,
        passProps: {imageCategory : imageCategory},
        component: ImagesListView,
      });
    },

    fetchData : function () {
      var obj = {
        method: "GET",
  			headers: {
  			'apikey': '4f1dbfd91e07e653f07f974543895bb6',
  			},
      };

      fetch(Image_Category_URL,obj)
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
          });
        })
        .done();
    },
});

var styles = StyleSheet.create({
  listViewContainer: {
    marginTop: 64,
    marginBottom: 49,
    backgroundColor: '#ffffff',
  },
  listRowContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center', //左右居中
    alignItems: 'center', //上下居中
    paddingLeft: 15,
    height: 44,
    backgroundColor: '#ffffff',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 0.5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    fontSize: 20,
  },
});

module.exports = ImageCategoryList;
