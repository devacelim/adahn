import React from 'react';
import {Image,Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header,Content,Body,Title,Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import {styles} from "./style";

export default class Root extends React.Component {

    static navigationOptions = {
        title: 'Home',
        header:null

        /* No more header config here! */
    };
    _Ok(){
        console.log("OK")
        this.props.navigation.navigate('Register')
    }
    render() {

        return (

            <Container>


                    <Grid>

                        <Row style={styles.title}>
                            <Text style={{fontSize:35}}>Hello World</Text>
                        </Row>
                        <Row style={styles.contents}>
                            <Image
                                style={{height:'100%',width:'100%',resizeMode:'contain'}}
                                source={require('../../assets/1.jpg')}/>
                        </Row>
                        <Row style={styles.footer}>
                            <Row>
                            <Button onPress={this._Ok.bind(this)}style={{margin:10,width:200,justifyContent:'center'}}rounded  info>
                                <Text>Register</Text>
                            </Button>
                            </Row>
                            <Row>
                                <Button style={{margin:10,width:200,justifyContent:'center'}}rounded  info>
                                    <Text>Cancel</Text>
                                </Button>
                            </Row>

                        </Row>

                    </Grid>


            </Container>
        );


    }
}
