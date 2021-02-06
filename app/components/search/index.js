import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../../styles/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CartModule from '../../store/cart'
import constants from '../../constants'
import * as navigator from '../../navigator'
import Theme from '../../theme'

class Field extends Component {

    render() {
        const {item, theme} = this.props

        return (
            <Ripple onPress={() => {CartModule.setItem(`revise-${item.id}`, item); navigator.navigate('Product', {screen: 'Card', params: {productId: item.id, categoryId: item.categories[0].id}})}}
                    style={styles.field}
                    rippleColor={constants.palette.main}>
                <View style={styles.fieldDetails}>
                    <Text style={[styles.fieldCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                </View>
                <Icon name="navigate-next" size={28} color={constants.palette.gray} />
            </Ripple>
        )
    }
}

export default Theme(Field)