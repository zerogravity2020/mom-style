import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

class Button extends Component {
    render() {
        const {caption, onPress, customStyle, disabled, loading, theme} = this.props

        return (
            <View style={[styles.buttonWrap, customStyle, disabled && styles.buttonDisabled]}>
                {disabled && <View style={styles.buttonOverlay} />}
                {loading && <ActivityIndicator size="large" color="white" style={styles.buttonLoader} />}
                <Ripple onPress={onPress}
                        style={styles.button}>
                    <Text style={styles.buttonText}>{caption}</Text>
                </Ripple>
            </View>
        )
    }
}

export default Theme(Button)