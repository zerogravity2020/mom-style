import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from "mobx-react"
import UserModule from '../store/user'
import Button from '../components/Button'
import Input from '../components/Input'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class Restore extends Component {
	render() {
		const {theme} = this.props
		const {restoreData, loadingRestoreForm, restoreFormStep} = UserModule

		return (
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "75"}
								  style={theme === 'dark' ? styles.pageDark : styles.page}
								  keyboardVerticalOffset={90}>
				<SafeAreaView style={styles.main}>
					<ScrollView style={styles.content}
								showsVerticalScrollIndicator={false}>
						{restoreFormStep == 'reset-password' &&
							<Input placeholder="Email"
								   value={restoreData.email}
								   textContentType="emailAddress"
								   keyboardType="email-address"
								   onChangeText={value => UserModule.changeInput('restore', value, 'email')} />
						}
						{restoreFormStep == 'validate-code' &&
							<Input placeholder="Код"
								   value={restoreData.code}
								   keyboardType="phone-pad"
								   onChangeText={value => UserModule.changeInput('restore', value, 'code')} />
						}
						{restoreFormStep == 'set-password' &&
							<Input placeholder="Пароль"
								   value={restoreData.password}
								   secureTextEntry={true}
								   onChangeText={value => UserModule.changeInput('restore', value, 'password')} />
						}
					</ScrollView>
					<View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
						{restoreFormStep == 'reset-password' &&
							<Button caption="Скинути пароль"
									disabled={restoreData.email.length == 0 || loadingRestoreForm}
									loading={loadingRestoreForm} 
									onPress={() => UserModule.resetPassword('reset-password')} />
						}
						{restoreFormStep == 'validate-code' &&
							<Button caption="Відправити код"
									disabled={restoreData.code.length == 0 || loadingRestoreForm}
									loading={loadingRestoreForm} 
									onPress={() => UserModule.resetPassword('validate-code')} />
						}
						{restoreFormStep == 'set-password' &&
							<Button caption="Змінити пароль"
									disabled={restoreData.password.length < 5 || loadingRestoreForm}
									loading={loadingRestoreForm} 
									onPress={() => UserModule.resetPassword('set-password')} />
						}
					</View>
				</SafeAreaView>
			</KeyboardAvoidingView>
		)
	}
}

export default Theme(Restore)