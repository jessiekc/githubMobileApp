import React, {Component} from 'react';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import {Container, Header, Body, Left,Right, Button, Picker, Item, Input, Text } from 'native-base';
import { Platform, StyleSheet, View, TouchableOpacity, ScrollView,AsyncStorage } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";


/**
 * class for each following user, store if he/she is followed by updating follow
 */
class SingleFollowing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: "ios-sync"
        };
        this.isfollowing(this.props.following);
        this._storeData(this.props.following.login, JSON.stringify(this.props.following));
    }

    //store data
    _storeData = async (name, user) => {
        try {
            await AsyncStorage.setItem(name, user);
        } catch (error) {
            // Error saving data
        }
    }

    //set icon based on if user is following user's following
    isfollowing(following) {
        axios.get(`/following/${following.login}`).then(function (response) {
            if(response.status===204){
                console.log("204");
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
    unfollow(following) {
        if(this.state.follow=="md-heart") {
            axios.delete(`/following/${following.login}`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        follow: "ios-heart-dislike"
                    });
                }
            }.bind(this))
        }
        else{
            axios.put(`/following/${following.login}`).then(function (response) {
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
                        params:{'url':this.props.following.html_url},
                        key: this.props.following.html_url})
                }}
                title={this.props.following.login}
                avatar={{uri: this.props.following.avatar_url}}
                rightIcon={<Icon name={this.state.follow} onPress={()=>this.unfollow(this.props.following)} size={25}/>}
            >
                {/*{console.log("85")}*/}
                {/*{console.log(this.props.navigation)}*/}
                {/*{console.log("87")}*/}
            </ListItem>
        )
    }
}

//the list contains SingleFollowing objects
const FollowingList = props => {
    const FollowingItems = props.following.map(followingItem => {
        return (
            <SingleFollowing
                key = {followingItem.id}
                following={followingItem}
            />
        );
    });
    return (
        <List>
            {FollowingItems}
        </List>
    );
};

class Following extends Component {
    /**
     * constructor for following
     */
    constructor() {
        super();
        this.state = {
            following: []
        }
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        let login = this.props.navigation.getParam('login');
        console.log(this.props.navigation.state.params);
        axios.get(`https://api.github.com/users/${login}/following`)
            .then((response)=>{
                // AsyncStorage.setItem('following',JSON.stringify(response.data));
                this.setState({following: response.data});
                console.log(this.state.following);
            });
    }

    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('sumerinlan');
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
                    <Text style={{fontWeight: "300", fontSize: 20}}> Following</Text>
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
                    <FollowingList following={this.state.following}/>
                </ScrollView>
            </View>
        );
    }
}
export default Following;

