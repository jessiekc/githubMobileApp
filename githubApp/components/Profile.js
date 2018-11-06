// {/*https://facebook.github.io/react-native/docs/touchableopacity*/}
// https://www.youtube.com/watch?v=TnQUb-ACqWs&t=348s
// https://www.skptricks.com/2018/10/navigating-between-screens-or-activity-in-react-navigation.html
// https://facebook.github.io/react-native/docs/asyncstorage.html
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body, Button} from 'native-base';
import axios from 'axios';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";

class Profile extends Component {
    /**
     * constructor for person profile
     */
    constructor() {
        super();
        this.state = {
            profileImage: '',
            name: '',
            username: '',
            bio: '',
            website: '',
            email: '',
            publicReposCount: '',
            followersCount: '',
            followers_url: '',
            followingCount: '',
            following_url:'',
            createDate: ''
        }
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
        let url = '';
        if(this.props.navigation.getParam('url')){
            url = this.props.navigation.getParam('url')
        }
        // console.log(url);
        // console.log("43");
        axios.get(`${url}`)
            .then((response) => {
                this._storeData('user',JSON.stringify(response.data));//store user profile
                this.setState({
                    profileImage: response.data.avatar_url,
                    name: response.data.name,
                    username: response.data.login,
                    email: response.data.email,
                    publicReposCount: response.data.public_repos,
                    followersCount: response.data.followers,
                    followers_url: response.data.followers_url,
                    followingCount: response.data.following,
                    following_url:response.data.following_url,
                    bio: response.data.bio,
                    website: response.data.blog,
                    createdDate: response.data.created_at
                });
                console.log(response.data);
            });
    }

    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('user');
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

    render() {
        return (
            <View>
                <Header>
                    <Body>
                        <Text style={{fontWeight: "300", fontSize: 20}}> {this.state.name}</Text>
                    </Body>
                </Header>

                <ScrollView>
                    {/*<Button onPress={this._retrieveData}><Text>Show Data</Text></Button>*/}
                    <Text style={{color:'lightslategrey'}} > Created on {this.state.createdDate}</Text>

                    <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>
                        <View>
                        </View>
                        <Avatar
                            xlarge
                            source={{url: this.state.profileImage}}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Text style={{ margin: 10}}>
                                username: {this.state.username}
                            </Text>
                            <Text style={{ margin: 10 }}>
                                email:  {this.state.email}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', backgroundColor:'#b2dbbf'}}>
                        <TouchableOpacity style={{ padding: 15 }} onPress={()=> this.props.navigation.navigate('Repositories')}>
                            <Text>
                                <Text > {this.state.publicReposCount} </Text>
                                <Text > Repos</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 15}}
                                          onPress={()=> this.props.navigation.push('Following',
                                              {'login': this.state.username}
                                          )}>
                            <Text>
                                <Text >{this.state.followingCount} </Text>
                                <Text> Following</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 15 }}
                                          onPress={()=> this.props.navigation.push('Follower',
                                              {'url': this.state.followers_url}
                                                    )}>
                            <Text>
                                <Text>{this.state.followersCount}</Text>
                                <Text> Follower</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                    }}>
                        <View style={{padding: 15, backgroundColor: '#ffffff'}}>
                            <Text>Bio:</Text>
                            <Text  style={{ padding: 15 }}> {this.state.bio}</Text>
                        </View>
                        <View style={{ padding: 15 , backgroundColor: '#ffffff'}}>
                            <Text>Website:</Text>
                            <Text  style={{ padding: 15 }}> {this.state.website}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default Profile;

