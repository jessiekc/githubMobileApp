
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body, Left, Right } from 'native-base';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';

class Follower extends Component {
    /**
     * constructor for followers
     */
    constructor() {
        super();
        this.state = {
            followers: []
        }
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        axios.get('https://api.github.com/users/jessiekc/followers')
            .then((response) => {
                this.setState({followers: response.data});
                console.log(this.state.following);
            })
    }
    render() {
        return (
            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}>Followers</Text>
                    </Body>
                </Header>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    <List>
                        <FlatList
                            data={this.state.followers}
                            keyExtractor={item => item.url}
                            renderItem={({ item }) => (
                                <ListItem
                                    title={item.login}
                                    avatar={{uri: item.avatar_url}}
                                />
                            )}
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default Follower;

const styles = StyleSheet.create({
});
