
'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Navigator,
	Image,
	ListView,
	TouchableOpacity,
} = React;

var Image_Category_URL = 'http://apis.baidu.com/tngou/gallery/classify?apikey=4f1dbfd91e07e653f07f974543895bb6'

var ImagesListView = React.createClass({

	getInitialState: function () {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false,
		};
	},

	render: function () {

		if (!this.state.loaded) {
			return (
				<View style = {styles.container}>
					<Text>Loading ...</Text>
				</View>
			);
		} else {
			return (
				<ListView
				dataSource = {this.state.dataSource}
				renderRow = {this.renderImageRow}
				style = {styles.listView}/>
			);
		}
	},

	renderImageRow: function (image) {
		return (
			<TouchableOpacity style = {styles.container}>
				<Text>{image.title}</Text>
			</TouchableOpacity>
		);
	},

	componentDidMount: function () {
		this.fetchData();
	},

	fetchData: function () {

		var obj = {
			method: "GET",
			headers: {
			'apikey' : '4f1dbfd91e07e653f07f974543895bb6',
			},
		};

		fetch(Image_Category_URL,obj)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	},
});

var styles = StyleSheet.create({
    pageContainer: {
        marginLeft : 10,
        marginRight : 10,
    },
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height : 44,
        backgroundColor: '#fffff1',
    },
    rightContainer: {
        flex: 1,
    },
    newsItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
    },
    listView: {
    	marginTop: 64,
        backgroundColor: '#ffffff',
    },
    newsPic : {
        width : 90,
        height : 60,
        margin: 10,
        marginLeft: 0,
    },
    newsTitle : {
        color : '#4f4f4f',
        fontSize : 16,
        textAlign : 'left',
    },
    newsSummary : {
        color : '#bababa',
        fontSize : 14,
        textAlign : 'left',
    },
});

module.exports = ImagesListView;
