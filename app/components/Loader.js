import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

class Loader extends Component {
	render() {
		const {theme} = this.props

		return (
			<View style={theme === 'dark' ? styles.loaderDark : styles.loader}>
				<ActivityIndicator size="large" color={constants.palette.main} />
			</View>
		)
	}
}

export default Theme(Loader)