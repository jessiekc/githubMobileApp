import React from "react";
import { StyleSheet, View,Text } from "react-native";
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryGroup } from 'victory-native';

import { Header, Body, Left, Right, Button } from 'native-base';

export default class Visualization extends React.Component {
    /**
     * constructor for SearchRepoList
     */
    constructor() {
        super();
        this.state = {
            Week1: [],
            Week2: [],
            Week3: [],
            Week4: [],
            total: []
        }
    }
    /**
     * function to fetch data from github api
     */
    componentDidMount() {
        let fullname = '';
        if(this.props.navigation.getParam('fullname')){
            fullname = this.props.navigation.getParam('fullname')
        }
        console.log(fullname);
        axios.get("https://api.github.com/repos/"+fullname+"/stats/commit_activity")
            .then(function(response){
                // console.log(response);
                // console.log("https://api.github.com/repos/"+fullname+"/stats/commit_activity");
                this.setState({
                    Week1:  [{x: "Sun.", y: response.data[0]['days'][0]},
                        {x: "Mon.", y: response.data[0]['days'][1]},
                        {x: "Tue.", y: response.data[0]['days'][2]},
                        {x: "Wed.", y: response.data[0]['days'][3]},
                        {x: "Thur.", y:response.data[0]['days'][4]},
                        {x: "Fri.", y: response.data[0]['days'][5]},
                        {x: "Sat.", y: response.data[0]['days'][6]}],
                    Week2:  [{x: "Sun.", y: response.data[1]['days'][0]},
                        {x: "Mon.", y: response.data[1]['days'][1]},
                        {x: "Tue.", y: response.data[1]['days'][2]},
                        {x: "Wed.", y: response.data[1]['days'][3]},
                        {x: "Thur.", y:response.data[1]['days'][4]},
                        {x: "Fri.", y: response.data[1]['days'][5]},
                        {x: "Sat.", y: response.data[1]['days'][6]}],
                    Week3:  [{x: "Sun.", y: response.data[2]['days'][0]},
                        {x: "Mon.", y: response.data[2]['days'][1]},
                        {x: "Tue.", y: response.data[2]['days'][2]},
                        {x: "Wed.", y: response.data[2]['days'][3]},
                        {x: "Thur.", y:response.data[2]['days'][4]},
                        {x: "Fri.", y: response.data[2]['days'][5]},
                        {x: "Sat.", y: response.data[2]['days'][6]}],
                    Week4:  [{x: "Sun.", y: response.data[3]['days'][0]},
                        {x: "Mon.", y: response.data[3]['days'][1]},
                        {x: "Tue.", y: response.data[3]['days'][2]},
                        {x: "Wed.", y: response.data[3]['days'][3]},
                        {x: "Thur.", y:response.data[3]['days'][4]},
                        {x: "Fri.", y: response.data[3]['days'][5]},
                        {x: "Sat.", y: response.data[3]['days'][6]}],
                    total:[{x: "Week1", y: response.data[0]['total']},
                        {x: "Week2", y: response.data[1]['total']},
                        {x: "Week3", y: response.data[2]['total']},
                        {x: "Week4", y: response.data[3]['total']}]
                })
                console.log(this.state.total);
            }.bind(this));

    }
    render() {
        return (

            <View>
                <Header>
                    <Body>
                    <Text style={{fontWeight: "300", fontSize: 20}}>Visualization</Text>
                    </Body>
                </Header>
                <VictoryChart theme={VictoryTheme.material} domainPadding={25}>
                    <VictoryGroup offset={20}  colorScale={"qualitative"} >
                        <VictoryBar data={this.state.Week1}/>
                        <VictoryBar data={this.state.Week2}/>
                        <VictoryBar data={this.state.Week3}/>
                        <VictoryBar data={this.state.Week4}/>
                    </VictoryGroup>
                </VictoryChart>
                    <VictoryPie colorScale="qualitative" data={this.state.total}/>
            </View>
        );
    }
}

