import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { showMessage } from "react-native-flash-message"
import Ripple from 'react-native-material-ripple'
import HTML from 'react-native-render-html'
import Storage from '../../store/storage'
import CartModule from '../../store/cart'
import styles from '../../styles/styles'
import constants from '../../constants'
import Theme from '../../theme'

class Product extends Component {

	isActive = () => {
		const data = Storage.getStore()
		if (data.has(`favorite-${this.props.item.id}`)) {
            return true
        } else {
            return false
        }
	}
	
	render() {
		const {item, listView, cartView, orderView, additionalView, onPress, index, theme} = this.props

		let productWidth

		if (listView) productWidth = 140
		else if (additionalView) productWidth = (Dimensions.get('window').width - 80) / 2
		else productWidth = (Dimensions.get('window').width - 45) / 2

		return (
			<View style={[styles.product, (index == 0 || index == 1) && styles.first, !listView && {width: productWidth}, (index == 1 && listView) && {marginTop: 0}]}>
				<Ripple onPress={onPress}
						style={[styles.productItem, listView && styles.productListItem]}
						rippleColor={constants.palette.main}>
					{item.on_sale &&
						<View style={styles.productSale}>
							<Text style={styles.productSaleText}>SALE</Text>
						</View>
					}
					{item.featured &&
						<View style={[styles.productHit, item.on_sale && {top: 40}]}>
							<Text style={styles.productHitText}>ХІТ</Text>
						</View>
					}
					<View style={styles.productThumb}>
						<Image source={{uri: item.images[0].src}} style={{width: productWidth, height: productWidth}} />
						<View style={styles.productThumbOverlay} />
					</View>
					<View style={[styles.productDetails, listView && styles.productListDetails]}>
						<Text style={[styles.productCaption, theme === 'dark' ? styles.textColorDark : styles.textColor, cartView && {paddingRight: 30}]} numberOfLines={3} ellipsizeMode="tail">{item.name}</Text>
						{((cartView || orderView) && item.type == 'variable') &&
							<Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Розмір: {item.selected_attribute}</Text>
						}
						<View>
							<HTML html={item.price_html.replace('</del>', '</del><br>')}
								  tagsStyles={{del: styles.productOldPrice}}
								  baseFontStyle={theme === 'dark' ? styles.productPriceDark : styles.productPrice} />
						</View>
					</View>
				</Ripple>
				{(!cartView && !orderView) &&
					<Ripple onPress={this.isActive() ? () => {showMessage({type: "success", icon: "success", message: "Успіх", description: "Товар видалено із списку улюблених"}); CartModule.removeItem(`favorite-${item.id}`, item)} : () => {showMessage({type: "success", icon: "success", message: "Успіх", description: "Товар додано в список улюблених"}); CartModule.setItem(`favorite-${item.id}`, item)}}
							style={[styles.productFavorite, listView && {left: 105}]}
							rippleColor={constants.palette.main}
							rippleCentered={true}>
						<Icon name="heart" size={12} color={constants.palette.main} />
					</Ripple>
				}
				{cartView &&
					<Ripple onPress={() => CartModule.removeItem(`cart-${item.id}`)}
							style={styles.productRemove}
							rippleColor={constants.palette.white}
							rippleCentered={true}>
						<Icon name="remove" size={12} color={constants.palette.white} />
					</Ripple>
				}
			</View>
		)
	}
}

export default Theme(Product)