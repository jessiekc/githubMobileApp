// https://www.youtube.com/watch?v=32ZM72CKtTE
// https://www.youtube.com/watch?v=IuYo009yc8w
// https://react-native-training.github.io/react-native-elements/docs/listitem.html
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Linking } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Header, Body, Left, Right } from 'native-base';
import axios from 'axios';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";

// const SCREEN_WIDTH = Dimensions.get('window').width;

class Repositories extends Component {
    /**
     * constructor for repos
     */
    constructor() {
        super();
        this.state = {
            repoList: []
        }
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+token;
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        axios.get('/repos')
            .then((response) => {
                this.setState({repoList: response.data});
                console.log(this.state.repoList);
            })
    }
    render() {
        return (
            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}> Repositories</Text>
                    </Body>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <List>
                        <FlatList
                            data={this.state.repoList}
                            keyExtractor={item => item.url}
                            renderItem={({ item }) => (
                                <ListItem
                                    title={item.name}
                                    subtitle={item.owner.login + "\n" + item.description}
                                    subtitleNumberOfLines={2}
                                    onPress={() => { Linking.openURL(item.html_url) }}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default Repositories;

const styles = StyleSheet.create({
});
