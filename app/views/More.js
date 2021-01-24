import React, { Component } from 'react'
import { Text, View, ScrollView, Modal, TouchableOpacity, Image, Platform, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from "mobx-react"
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple'
import Field from '../components/Field'
import Input from '../components/Input'
import Button from '../components/Button'
import PagesModule from '../store/pages'
import Store from '../store/index'
import Separator from '../components/Separator'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'
import * as navigator from '../navigator'

@observer
class More extends Component {
	render() {
		const {pagesList, pageData, modalVisible} = PagesModule
		const {isAuth, user} = Store
		const {theme} = this.props

		return (
			<ScrollView style={theme === 'dark' ? styles.pageDark : styles.page}
						showsVerticalScrollIndicator={false}>
		    	{!isAuth &&
		    		<>
		    			<View style={styles.tabs}>
				    		<TouchableOpacity style={styles.tabsLink}
				    						  onPress={() => navigator.navigate('User', {screen: 'SignIn'})}>
					    		<Text style={[styles.tabsText, {textAlign: 'right'}]}>ВХІД</Text>
					    	</TouchableOpacity>
					    	<TouchableOpacity style={[styles.tabsLink, theme === 'dark' ? styles.tabsLinkBorderDark : styles.tabsLinkBorder]}
					    					  onPress={() => navigator.navigate('User', {screen: 'SignUp'})}>
					    		<Text style={[styles.tabsText, {textAlign: 'left'}]}>РЕЄСТРАЦІЯ</Text>
					    	</TouchableOpacity>
					    </View>
					    <Separator />
					</>
				}

				{isAuth &&
					<>
						<Field 
							caption="Профіль"
							onPress={() => navigator.navigate('Customer')}
							hasIcon={true}
							icon="user"
							size={12}
							key="field-user"
						/>

						<Separator />

						<Field 
							caption="Замовлення"
							onPress={() => navigator.navigate('CustomerOrders')}
							hasIcon={true}
							icon="list"
							size={12}
							key="field-list"
						/>

						<Separator />

						<Field 
							caption="Адреса доставки"
							onPress={() => navigator.navigate('CustomerAddress')}
							hasIcon={true}
							icon="address-card"
							size={12}
							key="field-address-card"
						/>
					</>
				}

				<Separator />

				<Field 
					caption="Переглянуті товари"
					onPress={() => navigator.navigate('Revised')}
					hasIcon={true}
					icon="eye"
					size={12}
					key="field-eye"
				/>

				<Separator />

				<Field 
					caption="Блог"
					onPress={() => navigator.navigate('Blog')}
					hasIcon={true}
					icon="newspaper-o"
					size={12}
					key="field-newspaper-o"
				/>

		    	{pagesList.map(page => 
					<>
						<Separator />
						<Field 
							caption={page.title.rendered}
							onPress={() => PagesModule.loadPage(page.id)}
							hasIcon={true}
							icon="info"
							size={12}
							key={`field-${page.id}`}
						/>
					</>
				)}

		    	<Separator />
				<Field 
					caption="Знайти наш магазин на карті"
					hasIcon={true}
					icon="map-marker"
					size={12}
					onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=mom_style_ua')}
					key="field-map-marker"
				/>

				{isAuth &&
					<>
						
						<Separator />
						<Field 
							caption="Вийти з профілю"
							onPress={() => Store.logout()}
							hasIcon={true}
							icon="sign-out"
							size={12}
							key="field-sign-out"
						/>
					</>
				}

			    {modalVisible &&
			    	<Modal visible={true}
						   animationType='fade'
						   transparent={true}>
						<SafeAreaView style={theme === 'dark' ? styles.pageDark : styles.page}>
							<ScrollView showsVerticalScrollIndicator={false}>
								<Ripple rippleColor={constants.palette.main}
										rippleCentered={true}
										onPress={() => PagesModule.openModal(false)}
										style={[styles.headerBtn, styles.modalBtn]}>
			                		<Icon name="remove" color={constants.palette.gray} size={22} />
			                	</Ripple>
			                	<View style={styles.content}>
			                		<Text style={[styles.modalTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{pageData.title.rendered}</Text>
				                	<HTML html={pageData.content.rendered}
										  baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}
				                          tagsStyles={{a: styles.link, p: styles.p, ul: styles.ul, li: styles.li, img: styles.img}} />
								</View>
							</ScrollView>
						</SafeAreaView>
					</Modal>
				}
		    </ScrollView>
    	)
	}
}

export default Theme(More)