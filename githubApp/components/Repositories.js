// https://www.youtube.com/watch?v=32ZM72CKtTE
// https://www.youtube.com/watch?v=IuYo009yc8w
// https://react-native-training.github.io/react-native-elements/docs/listitem.html
import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, ScrollView,AsyncStorage } from 'react-native';

import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';

import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

class SingleRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star: "ios-sync"
        };
        console.log("star");
        console.log(this.props);
        this.isStarred(this.props.repoItem);
        this._storeData(this.props.repoItem.full_name,JSON.stringify(this.props.repoItem));
    }
    //store data
    _storeData = async (name, user) => {
        try {
            await AsyncStorage.setItem(name, user);
        } catch (error) {
            // Error saving data
        }
    }
    //set icon based on if repo is starred or not
    isStarred(repoItem) {
        console.log(repoItem.owner.login);
        console.log(repoItem.name);
        console.log("28")
        axios.get(`/starred/${repoItem.owner.login}/${repoItem.name }`).then(function (response) {
            if(response.status===204){
                console.log("204");
                this.setState({
                    star: "ios-star"
                });
            }
            else{
                this.setState({
                    star: "ios-star-outline"
                });
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
            this.setState({
                star: "ios-star-outline"
            });
        }.bind(this));
    }

    //send request to star or unstar repo
    unStar(repoItem) {
        if(this.state.star=="ios-star") {
            axios.delete(`/starred/${repoItem.owner.login}/${repoItem.name }`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        star: "ios-star-outline"
                    });
                }
            }.bind(this))
        }
        else{
            axios.put(`/starred/${repoItem.owner.login}/${repoItem.name }`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        star: "ios-star"
                    });
                }
            }.bind(this))
        }
    }
    render() {
        return(
            <ListItem
                onPress={() => { Linking.openURL(this.props.repoItem.html_url) }}
                title={this.props.repoItem.name}
                subtitle={this.props.repoItem.owner.login + "\n" + this.props.repoItem.description}
                subtitleNumberOfLines={2}
                rightIcon={<Icon name={this.state.star} onPress={()=>this.unStar(this.props.repoItem)} size={25}/>}
            >
                {/*{console.log("85")}*/}
                {/*{console.log(this.props.navigation)}*/}
                {/*{console.log("87")}*/}
            </ListItem>
        )
    }
}

const RepoList = props => {
    console.log("95");
    console.log(props.repoList);
    const RepoItems = props.repoList.map(repoItem => {
        return (
            <SingleRepo
                key = {repoItem.id}
                repoItem={repoItem}
            />
        );
    });
    return (
        <List>
            {RepoItems}
        </List>
    );
};

class Repositories extends Component {
    /**
     * constructor for repos
     */
    constructor() {
        super();
        this.state = {
            searchContent:'',
            searchCategory: '',
            repoList: []
        }
        this._storeData = this._storeData.bind(this)
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+token;
    }

    //store data
    _storeData = async (name, user) => {
        try {
            await AsyncStorage.setItem(name, user);
        } catch (error) {
            // Error saving data
        }
    }

    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        axios.get('/repos')
            .then((response) => {
                this._storeData('repoList',JSON.stringify(response.data));
                this.setState({repoList: response.data});
                console.log(this.state.repoList);
            })
    }
    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('jessiekc/CS225');
            let repo = JSON.parse(value);
            if (repo !== null) {
                // We have data!!
                console.log(" We have data!!");
                console.log(repo.full_name);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    searchByCategory() {
        console.log("132");
        if(this.state.searchCategory == "users" || this.state.searchCategory == ""){
            this.props.navigation.push('SearchUserList', {'searchContent': this.state.searchContent});
        }
        else if (this.state.searchCategory == "repos"){
            this.props.navigation.push('SearchRepoList', {'searchContent': this.state.searchContent});
        }
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
                    <View >
                        <View searchBar style={{flex: 1, alignItems: 'auto', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>

                            <Item>
                                <Icon name="ios-search" style={{ fontSize: 25 }} />
                                <Input placeholder="Search" onChangeText={(text) => this.setState({searchContent: text})}/>
                                <Picker
                                    mode={"dropdown"}
                                    iosIcon={<Icon name="ios-arrow-down" />}
                                    placeholder="Category"
                                    selectedValue={this.state.searchCategory}
                                    onValueChange={(itemValue, itemIndex) => this.setState({searchCategory: itemValue})}>
                                    <Picker.Item label="Users" value="users" />
                                    <Picker.Item label="Repositories" value="repos" />
                                </Picker>
                                <Button transparent onPress={()=>this.searchByCategory()} >
                                    <Text>Search</Text>
                                </Button>
                            </Item>
                        </View>
                    </View>
                    {/*<Button onPress={this._retrieveData}><Text>Show Data</Text></Button>*/}

                    <RepoList repoList={this.state.repoList}/>

                </ScrollView>
            </View>
        );
    }
}
export default Repositories;

