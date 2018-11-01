// {/*https://facebook.github.io/react-native/docs/touchableopacity*/}
// https://www.youtube.com/watch?v=TnQUb-ACqWs&t=348s
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView,AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Header, Body, Button} from 'native-base';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import ScalingButton from '../components/ScalingButton';
var animations = [
    ['bounce', '#62B42C'],
    ['flash', '#316BA7'],
    ['jello', '#A0A0A0'],
    ['pulse', '#FFC600'],
    ['rotate', '#1A7984'],
    ['rubberBand', '#435056'],
    ['shake', '#FF6800'],
    ['swing', '#B4354F'],
    ['tada', '#333333']
];
token = "f539042ef9de47ce08f1d9c8bc50673a5da980e0";

class Home extends Component {
    /**
     * constructor for person profile
     */
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
        this._storeData = this._storeData.bind(this)
        // axios.defaults.baseURL = 'https://api.github.com/user';
        // axios.defaults.headers.common['Authorization'] = "token "+token;
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
        // let login = '';
        // if(this.props.navigation.getParam('login')){
        //     login ="/users/"+this.props.navigation.getParam('login')
        // }
        // console.log(login);
        // console.log("43");
        axios.get("https://api.github.com/user?access_token=f539042ef9de47ce08f1d9c8bc50673a5da980e0")
            .then((response) => {
                this._storeData('user',JSON.stringify(response.data));//store own profile
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
    renderBoxes(start) {
        var selected_animations = animations.slice(start, start + 3);
        return selected_animations.map((animation, index) => {
            return (

                <ScalingButton
                    key={index}
                    onPress={this.stopAnimation.bind(this, animation[0])}
                    noDefaultStyles={true}
                >
                    <Animatable.View
                        ref={animation[0]}
                        style={[styles.box, { backgroundColor: animation[1] }]}
                        animation={animation[0]}
                        iterationCount={"infinite"}>
                        <Text style={styles.box_text}>{ animation[0] }</Text>
                    </Animatable.View>
                </ScalingButton>

            );
        });
    }
    stopAnimation(animation) {
        this.refs[animation].stopAnimation();
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
                    {/*<Button onPress={this._retrieveData}><Text>Show Data</Text></Button>*/}
                    <View style={styles.container}>
                        {/*<View style={styles.row}>*/}
                            {/*{ this.renderBoxes(0) }*/}
                        {/*</View>*/}

                        {/*<View style={styles.row}>*/}
                            {/*{ this.renderBoxes(3) }*/}
                        {/*</View>*/}

                        {/*<View style={styles.row}>*/}
                            {/*{ this.renderBoxes(6) }*/}
                        {/*</View>*/}

                    </View>
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
                        <ScalingButton
                            key={1}
                            onPress={()=> this.props.navigation.navigate('Repositories')}
                            noDefaultStyles={true}
                        >
                            <Animatable.View
                                ref={animations[6][0]}
                                style={[styles.box, { backgroundColor: animations[2][1] }]}
                                animation={animations[6][0]}
                                iterationCount={"infinite"}>
                                <Text style={styles.box_text}>{this.state.publicReposCount}</Text>
                                <Text > Repos</Text>
                            </Animatable.View>
                        </ScalingButton>
                        <ScalingButton
                            key={2}
                            onPress={()=> this.props.navigation.push('Following',
                                {'login': this.state.username}
                            )}
                            noDefaultStyles={true}
                        >
                            <Animatable.View
                                ref={animations[6][0]}
                                style={[styles.box, { backgroundColor: animations[2][1] }]}
                                animation={animations[6][0]}
                                iterationCount={"infinite"}>
                                <Text style={styles.box_text}>{this.state.followingCount}</Text>
                                <Text > Following</Text>
                            </Animatable.View>
                        </ScalingButton>
                        <ScalingButton
                            key={3}
                            onPress={()=> this.props.navigation.push('Follower',
                                {'url': this.state.followers_url}
                            )}
                            noDefaultStyles={true}
                        >
                            <Animatable.View
                                ref={animations[6][0]}
                                style={[styles.box, { backgroundColor: animations[2][1] }]}
                                animation={animations[6][0]}
                                iterationCount={"infinite"}>
                                <Text style={styles.box_text}>{this.state.followersCount}</Text>
                                <Text > Follower</Text>
                            </Animatable.View>
                        </ScalingButton>
                        {/*<TouchableOpacity style={{ padding: 15 }} onPress={()=> this.props.navigation.navigate('Repositories')}>*/}
                            {/*<Text>*/}
                                {/*<Text > {this.state.publicReposCount} </Text>*/}
                                {/*<Text > Repos</Text>*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={{ padding: 15}}*/}
                                          {/*onPress={()=> this.props.navigation.push('Following',*/}
                                             {/*{'login': this.state.username}*/}
                                          {/*)}>*/}
                            {/*<Text>*/}
                                {/*<Text >{this.state.followingCount} </Text>*/}
                                {/*<Text> Following</Text>*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={{ padding: 15 }}*/}
                                          {/*onPress={()=> this.props.navigation.push('Follower',*/}
                                              {/*{'url': this.state.followers_url}*/}
                                          {/*)}>*/}
                            {/*<Text>*/}
                                {/*<Text>{this.state.followersCount}</Text>*/}
                                {/*<Text> Follower</Text>*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
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
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        backgroundColor: '#ccc'
    },
    box_text: {
        color: '#FFF'
    }
});