import React from 'react';
import Root from './src/components/Root'
import Register from './src/components/Register'
import {Font} from "expo";
import {Container} from "native-base";
import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator(
    {
        Home: Root,
        Register:Register
    },
    {
        initialRouteName: 'Home',
        headerLayoutPreset:'center',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',

            },
        }
    }
);




export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isReady:false
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }

    render() {

        if (!this.state.isReady)
            return <Container/>;


        return (
            <RootStack />

        );


    }

}