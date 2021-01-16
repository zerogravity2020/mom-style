import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from 'react-native'
import { observer } from "mobx-react"
import UserModule from '../store/user'
import Button from '../components/Button'
import Input from '../components/Input'
import styles from '../styles/styles'
import * as navigator from '../navigator'
import Theme from '../theme'

@observer
class SignIn extends Component {
	
	render() {
		const {formLogin, loadingLoginForm, formLoginDisabled} = UserModule
		const {theme} = this.props

		return (
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "75"}
								  style={theme === 'dark' ? styles.pageDark : styles.page}
								  keyboardVerticalOffset={70}>
				<ScrollView style={styles.content}
							showsVerticalScrollIndicator={false}>
					<Input placeholder="Логін або Email"
						   value={formLogin.username}
						   keyboardType="email-address"
						   onChangeText={value => UserModule.changeInput('login', value, 'username')} />
					<Input placeholder="Пароль"
						   value={formLogin.password}
						   secureTextEntry={true}
						   onChangeText={value => UserModule.changeInput('login', value, 'password')} />
					<TouchableOpacity onPress={() => navigator.navigate('Restore')}>
						<Text style={styles.link}>Забули пароль?</Text>
					</TouchableOpacity>
				</ScrollView>
				<View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
					<Button caption="Вхід"
							disabled={formLoginDisabled || loadingLoginForm}
							loading={loadingLoginForm}
							onPress={() => UserModule.signIn()} />
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default Theme(SignIn)