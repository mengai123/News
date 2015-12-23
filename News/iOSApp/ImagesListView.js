
'use strict';

var React = require('react-native');
var ShowImageDetail = require('./ShowImageDetail');

var {
	StyleSheet,
	View,
	Text,
	Navigator,
	Image,
	ListView,
	TouchableOpacity,
} = React;

var Image_List_URL = 'http://apis.baidu.com/tngou/gallery/list'

var ImagesListView = React.createClass({

	getInitialState: function () {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false,
			totalCount: 0,
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
				style = {styles.listViewContainer}/>
			);
		}
	},

	renderImageRow: function (image) {
		return (
			<TouchableOpacity
				onPress = {() => {this.didSelectImage(image)}}
				style = {styles.listRowcontainer}>

				<Image
					style = {styles.picContainer}
					source = {{uri: 'http://tnfs.tngou.net/image' + image.img}}
					defaultSource = {require('image!placeholder')} />
				<View style = {styles.contetContainer}>
					<Text
						numberOfLines = {2}
						style = {styles.titleContainer}>
						{image.title}
					</Text>
					<Text
						style = {styles.desContainer}>
						{'热度:' + image.count}
					</Text>
				</View>
			</TouchableOpacity>
		);
	},

	componentDidMount: function () {
		this.fetchData();
	},

	didSelectImage: function (image) {
		this.props.navigator.push({
			title: image.title,
			passProps: {image : image},
			component: ShowImageDetail,
		});
	},

	fetchData: function () {
		var obj = {
			method: "GET",
			headers: {
			'apikey' : '4f1dbfd91e07e653f07f974543895bb6',
			'id' : this.props.imageCategory.id,
			'page' : '1',
			'rows' : '20',
			},
		};

		fetch(Image_List_URL,obj)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					totalCount: responseData.total,
					dataSource: this.state.dataSource.cloneWithRows(responseData.tngou),
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
		contetContainer: {
			flex: 1,
			marginLeft: 15,
		},
		titleContainer: {
			marginTop: 10,
			fontSize: 18,
		},
		desContainer: {
			fontSize: 15,
			position: 'absolute',
			bottom: 10,
			right:0,
			color:'#999999'
		},
		picContainer: {
			height: 80,
			width: 60,
			marginTop: 10,
		},
});

module.exports = ImagesListView;
