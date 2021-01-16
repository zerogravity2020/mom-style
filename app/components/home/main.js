import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import Ripple from 'react-native-material-ripple'
import Slick from 'react-native-slick'
import * as navigator from '../../navigator'
import constants from '../../constants'
import styles from '../../styles/styles'

const size = Dimensions.get('window').width * 1.4

class MainSlider extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            items: this.props.data
        }
    }
    
    render() {
        const {items} = this.state

        const slides = items.map((item) => 
            <Ripple key={`slide-${item.slug}`}
                    onPress={() => {navigator.navigate('Products', {categoryId: item.id})}}
                    style={[styles.mainSlider, {height: size}]}
                    rippleColor={constants.palette.main}>
                <Image source={{uri: item.image.src}} style={{position: 'absolute', left: '-20%', top: 0, width: size, height: size}} />
                <View style={styles.mainSliderOverlay}/>
                <View style={styles.mainSliderDetails}>
                    <Text style={styles.mainSliderCaption}>{item.name}</Text>
                    <Text style={styles.mainSliderDescription}>{item.description}</Text>
                </View>
            </Ripple>
        )

        return (
            <Slick
                style={{height: size}}
                loadMinimal={true}
                loadMinimalSize={3}
                loop={false}
                dotColor={constants.palette.gray}
                activeDotColor={constants.palette.main}>
                {slides}
            </Slick>
        )
    }
}

export default MainSlider