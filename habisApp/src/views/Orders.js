import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, Body } from 'native-base';
import Header from '../components/Header'
import { imageName } from '../utils/constants'
import { connect } from 'react-redux'
import { deleteOrder } from '../store/AplicationAction'
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleDelete = (id) => {
    Alert.alert(
      'Delete order',
      'Are you sure you want to delete the order?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => this.props.deleteOrder(id, () => {
            ToastAndroid.showWithGravityAndOffset(
              'Delete successful',
              1,
              ToastAndroid.BOTTOM,
              25,
              60,
            );
          })
        }
      ],
      { cancelable: false }
    );
  }

  /**
   * return to home view
   */
  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    console.log(this.props.order)
    return (
      <View style={{ flex: 1 }}>
        <Header title='Orders' navigation={this.props.navigation} back={this.handleBack} />
        <Content padder>
          {this.props.order.map((order, key) => (
            <Card key={key} >
              <View style={styles.cardContainer}>
                <Image style={styles.image} source={imageName[order.Flavor]} />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={styles.title}>{order.Flavor}</Text>
                  <Text style={styles.subtitle}><Text style={{ color: 'gray' }}>Crust: </Text> {order.Crust}</Text>
                  <Text style={styles.subtitle}><Text style={{ color: 'gray' }}>Size:</Text>  {order.Size}</Text>
                  <Text style={styles.subtitle} s><Text style={{ color: 'gray' }}>Table:</Text> {order.Table_No}</Text>
                </View>
              </View>
              <CardItem bordered>
              </CardItem>
              <CardItem
                style={{ alignItems: 'flex-end', justifyContent: 'center' }}
                footer
                bordere
                button
                onPress={() => this.handleDelete(order.Order_ID)}
              >
                <Icon style={{ color: 'red' }} name='trash' />
              </CardItem>
            </Card>
          ))}
        </Content>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    backgroundColor: 'red',
    width: 150,
    height: 150
  },
  subtitle: {
    paddingTop: 10
  },
  title: {
    paddingBottom: 10,
    color: '#039343'
  },
  cardContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  }
})

const mapStateToProps = (state) => state.app;
export default connect(mapStateToProps, { deleteOrder })(Orders)