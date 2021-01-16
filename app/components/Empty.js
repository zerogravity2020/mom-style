import React, { Component } from 'react'
import { View, Text } from 'react-native'
import constants from '../constants'
import styles from '../styles/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import Theme from '../theme'

class Empty extends Component {
	render() {
		const {icon, caption, theme} = this.props
		return (
			<View style={styles.empty}>
				<Icon name={icon} size={100} color={constants.palette.main} />
				<Text style={[styles.emptyText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{caption}</Text>
			</View>
		)
	}
}

export default Theme(Empty)