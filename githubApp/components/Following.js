
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,  FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import { Header, Body, Left, Right } from 'native-base';
import axios from 'axios';

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
        axios.get('https://api.github.com/users/jessiekc/following')
            .then((response) => {
                this.setState({following: response.data});
                console.log(this.state.following);
            })
    }

    render() {
        const {navigate} = this.props.navigation;
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
                                <ListItem
                                    onPress={() => {
                                        this.props.navigation.navigate({
                                            routeName:'Profile',
                                            params:{'login':item.login},
                                            key: item.login})
                                     }}
                                    title={item.login}
                                    avatar={{uri: item.avatar_url}}


                                />
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
