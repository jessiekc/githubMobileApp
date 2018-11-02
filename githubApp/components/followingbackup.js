
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,  FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import { Header, Body, Left, Right, Thumbnail, Button } from 'native-base';
import axios from 'axios';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";



class SingleFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: "md-heart"
        };
        console.log("follow");
        console.log(this.props);
        this.isfollowing(this.props.follower);
        AsyncStorage.setItem(this.props.follower.login, JSON.stringify(this.props.follower));
    }

    //set icon based on if user is following user's followers
    isfollowing(follower) {
        axios.get(`/following/${follower.login}`).then(function (response) {
            if(response.status===204){
                console.log("204");
                this.setState({
                    follow: "md-heart"
                });
            }
            else{
                this.setState({
                    follow: "md-heart-outline"
                });
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
            this.setState({
                follow: "md-heart-outline"
            });
        }.bind(this));
    }

    //send request to d
    unfollow(follower) {
        if(this.state.follow=="md-heart") {
            axios.delete(`/following/${follower.login}`).then(function (response) {
                if(response.status===204){
                    this.setState({
                        follow: "md-heart-outline"
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
                rightIcon={<Icon name={this.state.follow} onPress={()=>this.unfollow(this.props.follower)} size={20}/>}
            >
                {console.log("85")}
                {console.log(this.props.navigation)}
                {console.log("87")}
            </ListItem>
        )
    }
}

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

class Following extends Component {
    /**
     * constructor for following
     */
    constructor() {
        super();
        this.state = {
            following: []
        }
        // this._retrieveData = this._retrieveData.bind(this);
        // this.unfollow = this.unfollow.bind(this);
        // axios.defaults.baseURL = 'https://api.github.com/user';
        // axios.defaults.headers.common['Authorization'] = "token "+token;
        // this.getFollowings();

    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        console.log("here");
        let login = this.props.navigation.getParam('login');
        console.log(this.props.navigation.state.params);
        axios.get(`https://api.github.com/users/${login}/following`)
            .then((response)=>{
                // AsyncStorage.setItem('following',JSON.stringify(response.data));
                this.setState({following: response.data});
                console.log(this.state.following);
            });
    }
    // unfollow(item) {
    //     axiosAPI.delete(`/following/${item.login}`)
    //         .then((response)=>{
    //             if (response.status == 204) {
    //                 console.log('successfully deleted');
    //             }
    //         })
    //     console.log(item)
    // }

    /**
     * get data stored
     * @returns {Promise<void>}
     */
    // async _retrieveData(key) {
    //     try {
    //         const value = await AsyncStorage.getItem(key);
    //         if (value !== null) {
    //             console.log('hello',value);
    //             return JSON.parse(value)
    //         }
    //     } catch (error) {
    //     }
    // }
    render() {
        return (
            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}> Following</Text>
                    </Body>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <FlatList
                        data={this.state.following}
                        keyExtractor={item => item.url}
                        renderItem={({ item }) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate({
                                    routeName:'Profile',
                                    params:{'url':item.url},
                                    key: item.url})
                            }}
                                      title={item.login}
                                      avatar={{uri: item.avatar_url}}>
                                {console.log(item)}
                            </ListItem>
                            // <ListItem onPress={() => {
                            //         this.props.navigation.navigate({
                            //             routeName:'Profile',
                            //             params:{'url':item.url},
                            //             key: item.url})
                            //      }}
                            //           title={item.login}
                            //           avatar={{uri: item.avatar_url}}>
                            //     {console.log(item)}
                            //
                            // </ListItem>
                        )}
                    />
                </ScrollView>
            </View>
        );
    }
}
export default Following;

const styles = StyleSheet.create({
});
