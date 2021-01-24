import React, { Component } from 'react'
import { FlatList, ScrollView, View, Text, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { observer } from "mobx-react"
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals'
import { SafeAreaView } from 'react-native-safe-area-context'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import HTML from 'react-native-render-html'
import Ripple from 'react-native-material-ripple'
import Menu, { MenuItem } from 'react-native-material-menu'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProductModule from '../store/product'
import CategoriesModule from '../store/categories'
import CartModule from '../store/cart'
import Store from '../store/index'
import Loader from '../components/Loader'
import Radio from '../components/Radio'
import Button from '../components/Button'
import Input from '../components/Input'
import Empty from '../components/Empty'
import Product from '../components/product/index'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'
import * as navigator from '../navigator'

const bar = Platform.OS === 'android' ? 30 : 0

const modal = {
	width: (Dimensions.get('window').width - 60),
	height: Dimensions.get('window').height + bar,
	marginRight: -60,
	borderRadius: 0
}

const rangeWidth = (Dimensions.get('window').width - 120)

@observer

class Products extends Component {

	constructor(props) {
		super(props)

		this.state = {
			display: 'grid',
			sort: 'новинки',
			filterModal: false,
			categoryId: this.props.route.params.categoryId
		}
	}

	componentDidMount() {
		const {categoryId} = this.state
		ProductModule.loadProductsCategory(`category=${categoryId}`)
		ProductModule.changeOther('category', categoryId)
    }

	_renderItem = ({item, index}) => {
		const {display} = this.state
		const {theme} = this.props
		return <Product 
					item={item}
					onPress={() => {CartModule.setItem(`revise-${item.id}`, item); navigator.navigate('Product', {screen: 'Card', params: {productId: item.id, categoryId: item.categories[0].id}})}}
					index={index}
					listView={display == 'list'}
					theme={theme}
			   />
    }

    _renderEmpty = () => {
    	const {theme} = this.props
    	return <Empty icon="search-minus" caption="Нічого не знайдено" theme={theme} />
    }

    changeDisplay(value) {
    	const {display} = this.state
    	this.setState({display: value})
    }

	hideMenu = (type, params) => {
		const {sort, categoryId} = this.state
		const {filterQuery} = ProductModule
		this.setState({sort: type})
		this.refs.menu.hide()
		ProductModule.setFilter(params)
		ProductModule.loadProductsCategory(filterQuery)
	}

	showMenu = (type) => {
		this.refs.menu.show();
	}

	openFilter(value) {
		const {openFilter} = this.state
		this.setState({filterModal: value})
	}

	render() {
		const {display, sort, filter, filterModal, categoryId} = this.state
		const {productsCategoryList, loadingProductsCategory, filterData, attributesList, filterQuery} = ProductModule
		const {categoriesList} = CategoriesModule
		const {theme} = this.props

		return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<View style={[styles.actions, theme === 'dark' && styles.actionsDark]}>
					<Ripple style={[styles.actionsBtn, styles.actionBtnWide]}
							rippleColor={constants.palette.main}
							rippleCentered={true}
							onPress={this.showMenu}>
						<Icon name="sort" size={20} color={constants.palette.gray} />
						<View style={styles.actionsTextWrap}>
							<Menu ref="menu"
								  button={<Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Сортування</Text>}
								  style={theme === 'dark' ? styles.menuDark : styles.menu}>
								<MenuItem textStyle={theme === 'dark' ? styles.textColorDark : styles.textColor} onPress={() => this.hideMenu('новинки', {orderby: 'date', order: null})}>новинки</MenuItem>
								<MenuItem textStyle={theme === 'dark' ? styles.textColorDark : styles.textColor} onPress={() => this.hideMenu('від дешевих до дорогих', {orderby: 'price', order: 'asc'})}>від дешевих до дорогих</MenuItem>
								<MenuItem textStyle={theme === 'dark' ? styles.textColorDark : styles.textColor} onPress={() => this.hideMenu('від дорогих до дешевих', {orderby: 'price', order: 'desc'})} >від дорогих до дешевих</MenuItem>
							</Menu>
							<Text style={styles.actionsSmallText} numberOfLines={1} ellipsizeMode="tail">{sort}</Text>
						</View>
					</Ripple>
					<Ripple onPress={() => this.openFilter(true)}
							style={[styles.actionsBtn, styles.actionBtnWide]}
							rippleColor={constants.palette.main}
							rippleCentered={true}>
						<Icon name="filter" size={20} color={constants.palette.gray} />
						<View style={styles.actionsTextWrap}>
							<Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Фільтр</Text>
						</View>
					</Ripple>
					<View style={styles.actionBtnSmall}>
						<Ripple onPress={() => {display == 'list' ? this.changeDisplay('grid') : this.changeDisplay('list')}}
								style={styles.actionsBtn}
								rippleColor={constants.palette.main}
								rippleCentered={true}>
							<Icon name={display == 'list' ? 'th-large' : 'th-list'} size={20} color={constants.palette.gray} />
						</Ripple>
					</View>
				</View>
				{loadingProductsCategory ?
					<Loader />
					:
					<FlatList data={productsCategoryList}
							  keyExtractor={(item, index) => `product-${item.id}`}
							  renderItem={this._renderItem}
							  ListEmptyComponent={this._renderEmpty}
							  numColumns={display == 'grid' ? '2' : '1'}
				              initialNumToRender={6}
							  removeClippedSubviews={true}
							  disableVirtualization={true}
							  showsVerticalScrollIndicator={false}
							  onEndReached={() => ProductModule.onLoadMore()}
	        			      onEndReachedThreshold={0.5}
							  key={display} />
				}
				<Modal visible={filterModal}
					   onTouchOutside={() => this.openFilter(false)}
					   modalAnimation={new SlideAnimation({ slideFrom: 'right' })}
					   swipeDirection={['right']}
					   onSwipeOut={() => this.openFilter(false)}
					   modalStyle={[modal, theme === 'dark' ? styles.modalDark : styles.modalLight]}>
					<ModalContent style={styles.main}>
			            <SafeAreaView style={styles.main}>
				            <View style={styles.modalFilterContent}>
					            <Text style={[styles.modalFilterTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Фільтр</Text>
					            <ScrollView style={styles.modalFilterBody}>
					            	<View style={styles.modalFilterBlock}>
						            	<Text style={[styles.modalFilterCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Категорії</Text>
						            	<View style={styles.modalFilterList}>
						            		<TouchableOpacity key="category-all"
						            						  style={styles.modalFilterListLink}
						            						  onPress={() => ProductModule.changeOther('category', null)}>
						            			<Text style={[styles.modalFilterListText, theme === 'dark' ? styles.textColorDark : styles.textColor, filterData.category === null && {color: constants.palette.main}]}>Всі</Text>
						            		</TouchableOpacity>
							            	{categoriesList.map(category => 
							            		<TouchableOpacity key={`category-${category.id}`}
							            						  style={styles.modalFilterListLink}
							            						  onPress={() => ProductModule.changeOther('category', category.id)}>
							            			<Text style={[styles.modalFilterListText, theme === 'dark' ? styles.textColorDark : styles.textColor, filterData.category === category.id && {color: constants.palette.main}]}>{category.name}</Text>
							            		</TouchableOpacity>
							            	)}
						            	</View>
					            	</View>
					            	{attributesList.map(attribute => 
							    		<View key={`attribute-${attribute.id}`} style={styles.modalFilterBlock}>
							    			<Text style={[styles.modalFilterCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{attribute.name}</Text>
							    			<View style={[styles.cardAttributesList, {marginTop: 10}]}>
								    			{attribute.options.map(option => 
								    				<Ripple key={`attribute-${attribute.id}-option-${option.slug}`}
								    						style={[styles.cardAttribute, ProductModule.checkAttribute(option.id) && styles.cardAttributeActive]}
								    						rippleCentered={true}
								    						onPress={() => ProductModule.changeAttribute(attribute.slug, option.id)}>
								    					<Text style={styles.cardAttributeText}>{option.name}</Text>
								    				</Ripple>
								    			)}
								    		</View>
							    		</View>
							    	)}
							    	<View style={[styles.modalFilterBlock, {marginBottom: 10}]}>
							    		<Text style={[styles.modalFilterCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Врахувати</Text>
							    		<Radio title="акційні"
							    			   checked={filterData.on_sale}
							    			   onPress={() => ProductModule.changeOther('on_sale')} />
							    		<Radio title="популярні"
							    			   checked={filterData.featured}
							    			   onPress={() => ProductModule.changeOther('featured')} />
							    	</View>
									<View style={styles.modalFilterBlock}>
						            	<Text style={[styles.modalFilterCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Ціна</Text>
						            	<View style={styles.modalFilterRow}>
							            	<View style={styles.modalFilterCol}>
							            		<Input placeholder="Від"
							            			   value={filterData.min_price.toString()}
							            			   keyboardType="phone-pad"
							            			   onChangeText={value => ProductModule.changePrice(value, 'min_price')} />
							            		<HTML html={`<b>${Store.getCurrency}</b>`} tagsStyles={{b: {fontSize: 24, color: constants.palette.gray}}} containerStyle={styles.price}/>
							            	</View>
							            	<View style={styles.modalFilterCol}>
							            		<Input placeholder="До"
							            			   value={filterData.max_price.toString()}
							            			   keyboardType="phone-pad"
							            			   onChangeText={value => ProductModule.changePrice(value, 'max_price')} />
							            		<HTML html={`<b>${Store.getCurrency}</b>`} tagsStyles={{b: {fontSize: 24, color: constants.palette.gray}}} containerStyle={styles.price}/>
							            	</View>
						            	</View>
						            	<View style={styles.range}>
				                            <MultiSlider min={50}
				                            			 max={10000}
				                                         values={[filterData.min_price, filterData.max_price]}
				                                         sliderLength={rangeWidth}
				                                         enableOne={true}
				                                         enableTwo={true}
				                                         isMarkersSeparated
				                                         onValuesChange={(values) => {
				                                             ProductModule.changePrice(values, 'range')
				                                         }}
				                                         customMarkerLeft={() => <View style={styles.marker} />}
				                                         customMarkerRight={() => <View style={styles.marker} />}
				                                         selectedStyle={{backgroundColor: constants.palette.main}}
				                            />
				                        </View>
					            	</View>
					            </ScrollView>
					            <View style={[styles.modalFilterRow, {marginBottom: 0}]}>
				            		<Button caption="Очистити"
						           			customStyle={[styles.modalFilterCol, styles.buttonDisabled]}
						            		onPress={() => ProductModule.resetFilter()} />
						            <Button caption="Застосувати"
				            				customStyle={styles.modalFilterCol}
					            			onPress={() => {this.openFilter(false); ProductModule.loadProductsCategory(filterQuery)}} />
					            </View>
					        </View>
				        </SafeAreaView>
			        </ModalContent>
				</Modal>
			</View>
		)
	}
}

export default Theme(Products)