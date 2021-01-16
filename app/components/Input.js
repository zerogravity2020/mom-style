import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

class Input extends Component {
	constructor(props) {
		super(props)

		this.state = {
			focus: false
		}
	}

	onChange(value) {
		this.props.onChangeText(value)
	}

	onFocus = () => {
		const {focus} = this.state
		this.setState({focus: true})
	}

	onBlur = () => {
		const {focus} = this.state
		this.setState({focus: false})
	}

	render() {
		const {type, theme, onChangeText, placeholder, value, multiline, textContentType, editable, returnKeyLabel, autoFocus, secureTextEntry, addStyle, keyboardType, textAlignVertical} = this.props
		const {focus} = this.state
		
		if (type == 'phone') {
			return (
				<TextInputMask placeholder={placeholder}
							   placeholderTextColor={constants.palette.gray}
							   value={value}
							   onFocus={() => this.onFocus()}
						   	   onBlur={() => this.onBlur()}
							   style={[styles.input, addStyle, theme === 'dark' && styles.inputDark, focus && styles.inputFocus]}
							   textContentType={textContentType ?? 'none'}
							   keyboardType={keyboardType ?? 'default'}
							   type="custom"
			               	   options={{
			                        mask: '+38(999)999-99-99',
			                        validator: function(value, settings) {
			                            return true
			                        },
			                        getRawValue: function(value, settings) {
			                        	return value;
			                        },
			                   }}
			                   onChangeText={value => this.onChange(value)} />
		    )
		}
		
		else {
				return (
			    <TextInput value={value}
			    		   placeholder={placeholder}
						   placeholderTextColor={constants.palette.gray}
						   textContentType={textContentType ?? 'none'}
						   onFocus={() => this.onFocus()}
						   onBlur={() => this.onBlur()}
						   onChangeText={value => this.onChange(value)}
						   editable={editable ?? true}
						   style={[styles.input, addStyle, theme === 'dark' && styles.inputDark, focus && styles.inputFocus]}
						   autoCorrect={false}
						   keyboardType={keyboardType ?? 'default'}
						   textAlignVertical={textAlignVertical ?? null}
						   multiline={multiline ?? false}
						   autoFocus={autoFocus ?? false}
						   returnKeyLabel={returnKeyLabel}
						   secureTextEntry={secureTextEntry ?? false} />
			)
		}
	}
}
export default Theme(Input)