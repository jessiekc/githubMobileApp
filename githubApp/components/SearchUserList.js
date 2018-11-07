import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Icon, Item, Input, Text } from 'native-base';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";
class SearchUserList extends Component {
    /**
     * constructor for SearchUserList
     */
    constructor() {
        super();
        this.state = {
            searchResult: [],
            sortOrder: "",
            order: "",
        }
        axios.defaults.baseURL = 'https://api.github.com';
        axios.defaults.headers.common['Authorization'] = "token "+token;
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        let searchContent = '';
        if(this.props.navigation.getParam('searchContent')){
            searchContent = this.props.navigation.getParam('searchContent')
        }
        axios.get(`/search/users?q=${searchContent}`)
            .then((response) => {
                this.setState({searchResult: response.data.items});
                console.log(this.state.searchResult);
            })
    }

    /**
     * filter : function to display changes of the list
     */
    displayChange(){
        if (this.state.sortOrder != "" && this.state.order == "") {
            axios.get("/search/users?q="+this.state.input+"&sort="+this.state.sortOrder)
                .then(function(response){
                    console.log(response);
                    this.setState({
                        searchResult:response.data.items
                    });
                }.bind(this));
        }
        else if(this.state.sortOrder == "" && this.state.order != ""){
            axios.get("/search/users?q="+this.state.input+"&order="+this.state.order)
                .then(function(response){
                    console.log(response);
                    this.setState({
                        searchResult:response.data.items
                    });
                }.bind(this));
        }
        else if(this.state.sortOrder != "" && this.state.order != ""){
            axios.get("/search/users?q="+this.state.input+"&sort="+this.state.sortOrder+"&order="+this.state.order)
                .then(function(response){
                    console.log(response);
                    this.setState({
                        searchResult:response.data.items
                    });
                }.bind(this));
        }
    }
    /**
     * filter : function to store new sort to state
     */
    sortChange(sortValue) {
        this.setState({
            sortOrder: sortValue,
        },this.displayChange);
    }

    /**
     * filter : function to store new order to state
     */
    orderChange(orderValue) {
        this.setState({
            order:orderValue
        }, this.displayChange);
    }

    render() {
        return (
            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}>Search Result -- User</Text>
                    </Body>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>
                        <Picker
                            mode={"dropdown"}
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="Sort by: "
                            selectedValue={this.state.sortOrder}
                            onValueChange={(itemValue, itemIndex) => this.sortChange(itemValue)}>
                            <Picker.Item label="Followers" value = "followers" />
                            <Picker.Item label="Repositories" value = "repositories" />
                        </Picker>
                        <Picker
                            mode={"dropdown"}
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="Ascending/Descending"
                            selectedValue={this.state.order}
                            onValueChange={(itemValue, itemIndex) => this.orderChange(itemValue)}>
                            <Picker.Item label="Ascending" value="asc" />
                            <Picker.Item label="Descending" value="desc" />
                        </Picker>
                    </View>
                    <List>
                        <FlatList
                            data={this.state.searchResult}
                            keyExtractor={item => item.node_id}
                            renderItem={({ item }) => (
                                <ListItem
                                    title ={item.login}
                                    avatar={{uri: item.avatar_url}}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default SearchUserList;

