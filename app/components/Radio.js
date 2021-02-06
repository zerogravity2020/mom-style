import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { observer } from "mobx-react"
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class Radio extends Component {
    
    render() {
        const {title, onPress, checked, theme} = this.props

        return (
            <TouchableOpacity onPress={() => onPress(title)}
                              style={styles.checkbox}>
                <View style={[styles.checkboxIcon, theme === 'dark' && styles.checkboxIconDark, checked && styles.checkboxIconChecked]} />
                <View style={styles.checkboxWrapText}>
                    <Text style={[styles.checkboxText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default Theme(Radio)