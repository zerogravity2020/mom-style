import React, { Component } from 'react';
import { View } from 'react-native'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

class Separator extends Component {
    render() {
        const {theme} = this.props
        return (
            <View style={theme === 'dark' ? styles.separatorDark : styles.separator} />
        )
    }
}

export default Theme(Separator)