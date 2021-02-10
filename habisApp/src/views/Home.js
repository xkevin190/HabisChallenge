import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { pizzas } from '../utils/constants/'


export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  

  handleSelect = (data) => {
    this.props.navigation.navigate('newOrder', {
      ...data,
      order: this.props.order.length
    })
  }
  render() {

    return (
      <View>
        <ScrollView>
          <Header order={this.props.order} signOff={this.props.signOff} navigation={this.props.navigation} />
          <View style={styles.imageContainer}>
            {pizzas.map((data, key) => (
              <TouchableOpacity key={key} style={styles.boxImage} onPress={() => this.handleSelect(data)}>
                <ImageBackground
                  source={data.image}
                  style={styles.imageBackground}>
                  <Text style={styles.text}>{data.flavor}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 170,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  boxImage: {
    width: '50%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8
  },

  imageContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
