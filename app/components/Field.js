import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import IconNext from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/styles'
import constants from '../constants'
import * as navigator from '../navigator'
import Theme from '../theme'

class Field extends Component {

    render() {
        const {caption, onPress, hasIcon, icon, size, theme} = this.props
        
        return (
            <Ripple onPress={onPress}
                    style={styles.field}
                    rippleColor={constants.palette.main}>
                <View style={styles.fieldDetails}>
                    {hasIcon && 
                        <View style={styles.fieldIcon}>
                            <Icon name={icon} size={size} color={constants.palette.white} />
                        </View>
                    }
                    <View style={styles.fieldWrap}>
                        <Text style={[styles.fieldCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]} numberOfLines={2} ellipsizeMode="tail">{caption}</Text>
                    </View>
                </View>
                <IconNext name="navigate-next" size={28} color={constants.palette.grayLight} />
            </Ripple>
        )
    }
}

export default Theme(Field)