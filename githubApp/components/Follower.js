// https://reactsharing.com/3-examples-react-native-router-flux-for-beginners.html

import React, {Component} from 'react';
import { Avatar } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';
import { Platform, StyleSheet, View, TouchableOpacity, ScrollView,AsyncStorage } from 'react-native';

import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * class for each follower user, store if he/she is followed by updating follow
 */
class SingleFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: "ios-sync"
        };
        console.log("follow");
        console.log(this.props);
        this.isfollowing(this.props.follower);
        this._storeData(this.props.follower.login, JSON.stringify(this.props.follower))//store follower list
    }

    //store data
    _storeData = async (name, user) => {
        try {
            await AsyncStorage.setItem(name, user);
        } catch (error) {
            // Error saving data
        }
    }

    //set icon based on if user is following user's followers
    isfollowing(follower) {
        axios.get(`/following/${follower.login}`).then(function (response) {
            if(response.status===204){
                console.log("isfollowing");
                this.setState({
                    follow: "md-heart"
                });
            }
            else{
                this.setState({
                    follow: "ios-heart-dislike"
                });
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
            this.setState({
                follow: "ios-heart-dislike"
            });
        }.bind(this));
    }

    //send request to follow or unfollow
    unfollow(follower) {
        if(this.state.follow=="md-heart") {
            axios.delete(`/following/${follower.login}`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        follow: "ios-heart-dislike"
                    });
                }
            }.bind(this))
        }
        else{
            axios.put(`/following/${follower.login}`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        follow: "md-heart"
                    });
                }
            }.bind(this))
        }
    }
    render() {
        return(
            <ListItem
                onPress={() => {
                    this.props.navigator.navigate({
                        routeName:'Profile',
                        params:{'url':this.props.follower.html_url},
                        key: this.props.follower.html_url})
                }}
                title={this.props.follower.login}
                avatar={{uri: this.props.follower.avatar_url}}
                rightIcon={<Icon name={this.state.follow} onPress={()=>this.unfollow(this.props.follower)} size={25}/>}
            >
                {/*{console.log("85")}*/}
                {/*{console.log(this.props.navigation)}*/}
                {/*{console.log("87")}*/}
            </ListItem>
        )
    }
}


/**
 * the list contains SingleFollower objects
 * @param props
 * @returns {XML} return a list view  of single follower objects
 * @constructor
 */
const FollowerList = props => {
    const FollowerItems = props.followers.map(followerItem => {
        return (
            <SingleFollower
                key = {followerItem.id}
                follower={followerItem}
            />
        );
    });
    return (
        <List>
            {FollowerItems}
        </List>
    );
};

class Follower extends Component {
    /**
     * constructor for followers
     */
    constructor() {
        super();
        this.state = {
            searchContent:'',
            searchCategory: '',
            followers: []
        }
        axios.defaults.baseURL = 'https://api.github.com/user';
        axios.defaults.headers.common['Authorization'] = "token "+"f539042ef9de47ce08f1d9c8bc50673a5da980e0";;
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        // url =this.props.navigation.getParam('url')
        // console.log(this.props.navigation.state.params);
        // console.log("followers")
        axios.get(`/followers`)
            .then((response) => {

                this.setState({followers: response.data});
                console.log(this.state.followers);
            })
    }

    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('yren18');
            let user = JSON.parse(value);
            if (user !== null) {
                // We have data!!
                console.log(" We have data!!");
                console.log(user.login);
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
                    <Text style={{fontWeight: "300", fontSize: 20}}>Followers</Text>
                    {/*<Button onPress={this._retrieveData}><Text>Show Data</Text></Button>*/}
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
                    <List>
                        <FollowerList followers={this.state.followers}/>
                    </List>
                </ScrollView>
            </View>
        );
    }}
export default Follower;

