import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Icon, Item, Input, Text } from 'native-base';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
class SearchRepoList extends Component {
    /**
     * constructor for SearchRepoList
     */
    constructor() {
        super();
        this.state = {
            searchResult: [],
            sortOrder: "",
            order: "",
        }
        axios.defaults.baseURL = 'https://api.github.com';
        axios.defaults.headers.common['Authorization'] = "token "+ "f539042ef9de47ce08f1d9c8bc50673a5da980e0";
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        let searchContent = '';
        if(this.props.navigation.getParam('searchContent')){
            searchContent = this.props.navigation.getParam('searchContent')
        }
        axios.get(`/search/repositories?q=${searchContent}`)
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
            axios.get("/search/repositories?q="+this.state.input+"&sort="+this.state.sortOrder)
                .then(function(response){
                    console.log("only sort");
                    console.log(response);
                    this.setState({
                        searchResult:response.data.items
                    });
                }.bind(this));
        }
        else if(this.state.sortOrder == "" && this.state.order != ""){
            axios.get("/search/repositories?q="+this.state.input+"&order="+this.state.order)
                .then(function(response){
                    console.log("only order");
                    console.log(this.state.sort);
                    console.log(response);
                    this.setState({
                        searchResult:response.data.items
                    });
                }.bind(this));
        }
        else if(this.state.sortOrder != "" && this.state.order != ""){
            axios.get("/search/repositories?q="+this.state.input+"&sort="+this.state.sortOrder+"&order="+this.state.order)
                .then(function(response){
                    console.log("both");
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
                    <Text style={{fontWeight: "300", fontSize: 20}}>Search Result -- Repo</Text>
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
                            <Picker.Item label="Stars" value = "stars" />
                            <Picker.Item label="Forks" value = "forks" />
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
                                    title ={item.full_name}
                                    subtitle={item.description}
                                    onPress={() => {
                                        this.props.navigation.navigate({
                                            routeName:'Visualization',
                                            params:{'fullname':item.full_name},
                                            key: item.node_id})
                                    }}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default SearchRepoList;
