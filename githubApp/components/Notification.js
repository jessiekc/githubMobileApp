import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body, Left, Right } from 'native-base';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";
class Notification extends Component {
    /**
     * constructor for followers
     */
    constructor() {
        super();
        this.state = {
            notifications: []
        }
        axios.defaults.baseURL = 'https://api.github.com';
        axios.defaults.headers.common['Authorization'] = "token "+token;
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        axios.get("/notifications?all=true")
            .then((response) => {
                this.setState({notifications: response.data});
                console.log("here");
                console.log(this.state.notifications);
            })
    }
    render() {
        return (
            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}>Notifications</Text>
                    </Body>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <List>
                        <FlatList
                            data={this.state.notifications}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ListItem
                                    title ={item.repository.full_name}
                                    subtitle={item.subject.title}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default Notification;
