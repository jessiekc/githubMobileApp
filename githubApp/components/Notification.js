import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, AsyncStorage} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body, Left, Right } from 'native-base';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";


/**
 * class for each follower user, store if he/she is followed by updating follow
 */
class SingleNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            read: "ios-sync"
        };
        console.log("singlenotification");
        console.log(this.props.notification);
        this.isRead(this.props.notification);
    }

    //set icon based on if the notification is read or unread
    isRead(notification) {
        if(notification.unread == true){
            this.state.read = "ios-eye";
        }
        else{
            this.state.read = "ios-eye-off";
        }
    }
    render() {
        return(
            <ListItem
                title ={this.props.notification.repository.full_name}
                subtitle={this.props.notification.subject.title}
                rightIcon={<Icon name={this.state.read} size={25}/>}
            >
            </ListItem>
        )
    }
}


/**
 * the list contains SingleNotification objects
 * @param props
 * @returns {XML} return a list view  of single notification objects
 * @constructor
 */
const NotificationList = props => {
    const notificationItems = props.notifications.map(notificationItem => {
        return (
            <SingleNotification
                key = {notificationItem.id}
                notification={notificationItem}
            />
        );
    });
    return (
        <List>
            {notificationItems}
        </List>
    );
};


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
        axios.defaults.headers.common['Authorization'] = "token "+"f539042ef9de47ce08f1d9c8bc50673a5da980e0";
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        axios.get("/notifications?all=true&since=2018-11-07T20:01:45Z")
            .then((response) => {
                this.setState({notifications: response.data});
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
                    {/*<List>*/}
                        {/*<FlatList*/}
                            {/*data={this.state.notifications}*/}
                            {/*keyExtractor={item => item.id}*/}
                            {/*renderItem={({ item }) => (*/}
                                {/*<ListItem*/}
                                    {/*title ={item.repository.full_name}*/}
                                    {/*subtitle={item.subject.title}*/}
                                {/*/>*/}
                            {/*)}*/}
                        {/*/>*/}
                    {/*</List>*/}
                    <NotificationList notifications={this.state.notifications}/>
                </ScrollView>
            </View>
        );
    }
}
export default Notification;
