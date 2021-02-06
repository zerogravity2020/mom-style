import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Ripple from 'react-native-material-ripple'
import styles from '../../styles/styles'
import constants from '../../constants'
import * as navigator from '../../navigator';

const categorySize = (Dimensions.get('window').width - 30)

class Category extends Component {

    render() {
        const {item, index} = this.props

        return (
            <Ripple onPress={() => {navigator.navigate('Products', {categoryId: item.id})}}
                    style={[styles.category, {height: categorySize}, index == 0 && styles.first]}
                    rippleColor={constants.palette.main}>
                <Image source={{uri: item.image.src}} style={{width: categorySize, height: categorySize}} />
                <View style={styles.categoryOverlay}/>
                <View style={styles.categoryDetails}>
                    <Text style={styles.categoryCaption}>{item.name}</Text>
                    <Text style={styles.categoryDescription}>{item.description}</Text>
                </View>
            </Ripple>
        )
    }
}

export default Category