
'use strict';

var React = require('react-native');

var ImagesListView = require('./ImagesListView');

var {
	StyleSheet,
	View,
	TabBarIOS,
	NavigatorIOS,
	Text,
} = React;

var TabBarItemIOS = TabBarIOS.Item;

var Image_New_Tag_Name = 'newTag';
var Image_Hot_Tag_Name = 'hotTag';

var TabBar = React.createClass({
	getInitialState: function () {
		return{
			selectedTab: Image_Hot_Tag_Name,
			pressed: 0,
		};
	},

	render: function() {
        
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>

                <TabBarItemIOS
                    name = {Image_Hot_Tag_Name}
                    title = '热门'
                    icon = {require('image!hot')}
                    accessibilityLabel = "Blue Tab"
                    selected = {this.state.selectedTab === Image_Hot_Tag_Name}
                    onPress = {() => {
                        this.setState({
                            selectedTab: Image_Hot_Tag_Name,
                        });
                    }}>

                    <NavigatorIOS
                        style = {[{flex : 1, marginTop : 0}]}
                        initialRoute = {{
                                title: '分类',
                                component: ImagesListView,
                            }} />
                    
                </TabBarItemIOS>

                <TabBarItemIOS
                    name = {Image_New_Tag_Name}
                    title = '最新'
                    icon = {require('image!new')}
                    accessibilityLabel = "Red Tab"
                    selected = {this.state.selectedTab === Image_New_Tag_Name}
                    onPress = {() => {
                        this.setState({
                            selectedTab: Image_New_Tag_Name,
                        });
                    }}>

					<View style = {styles.tabContent}>
	                    <Text>
	                    	最新
	                    </Text>
                    </View>

                </TabBarItemIOS>
          </TabBarIOS>
        );
    },
});

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

module.exports = TabBar;