// {/*https://facebook.github.io/react-native/docs/touchableopacity*/}

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body} from 'native-base';
import axios from 'axios';

// import Repositories from 'Repositories';
// import Following from 'Following';
// import Follower from 'Follower';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            profileImage: '',
            name: '',
            username: '',
            bio: '',
            website: '',
            email: '',
            publicReposCount: '',
            followersCount: '',
            followingCount: '',
            createDate: ''
        }
    }
    componentDidMount() {
        axios.get('https://api.github.com/users/jessiekc')
            .then((response) => {
                this.setState({
                    profileImage: response.data.avatar_url,
                    name: response.data.name,
                    username: response.data.login,
                    email: response.data.email,
                    publicReposCount: response.data.public_repos,
                    followersCount: response.data.followers,
                    followingCount: response.data.following,
                    bio: response.data.bio,
                    website: response.data.blog,
                    createdDate: response.data.created_at
                });
                console.log(response.data);
            });
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
                    <Text style={{color:'lightslategrey'}} > Created on {this.state.createdDate}</Text>

                    <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: '#f3f3f3'}}>
                        <View>
                        </View>
                        <Avatar
                            xlarge
                            source={{uri: this.state.profileImage}}
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
                                email: kle11@illinois.edu
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
                        <TouchableOpacity style={{ padding: 15}} onPress={()=> this.props.navigation.navigate('Following')}>
                            <Text>
                                <Text >{this.state.followingCount} </Text>
                                <Text> Following</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 15 }} onPress={()=> this.props.navigation.navigate('Follower')}>
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

const styles = StyleSheet.create({
});
