
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,  FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import { Header, Body, Left, Right, Thumbnail, Button } from 'native-base';
import axios from 'axios';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";




class Following extends Component {
    /**
     * constructor for following
     */
    constructor() {
        super();
        this.state = {
            following: [],
            follow: "follow"
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
    // componentDidMount() {
    //     login =this.props.navigation.getParam('login');
    //     console.log("27");
    //     console.log(this.props.navigation.state.params);
    //     console.log("28");
    //     axios.get(this.props.navigation.state.params)
    //         .then((response) => {
    //             this.setState({following: response.data});
    //             console.log(this.state.following);
    //         })
    // }
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
