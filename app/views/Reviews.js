import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Dimensions } from 'react-native'
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals'
import { AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple'
import { observer, Observer } from "mobx-react"
import moment from 'moment/min/moment-with-locales'
import HTML from 'react-native-render-html'
import Loader from '../components/Loader'
import Empty from '../components/Empty'
import Input from '../components/Input'
import Button from '../components/Button'
import ReviewsModule from '../store/reviews'
import CardModule from '../store/card'
import Store from '../store/index'
import constants from '../constants'
import styles from '../styles/styles'
import Theme from '../theme'

const modal = {
	width: (Dimensions.get('window').width - 30)
}

@observer
class Reviews extends Component {
	componentDidMount() {
		moment.locale('uk')
    }

    _renderItem = ({item, index}) => {
    	const {theme} = this.props

    	if (item.status == 'approved') {
	    	return (
	    		<Observer>{() => 
		    		<View style={[styles.review, index == 0 && styles.first, theme === 'dark' && styles.reviewDark]}>
		    			<View style={styles.reviewTop}>
		    				<View style={styles.reviewTextWrap}>
		    					<Text style={[styles.reviewName, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{item.reviewer}</Text>
		    					{item.verified && <Text style={[styles.reviewName, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Вже придбав даний товар</Text>}
		    				</View>
		    				<Text style={styles.reviewDate}>{moment(item.date_created).format('L')}</Text>
		    			</View>
						<HTML html={item.review}
							  baseFontStyle={theme === 'dark' ? styles.reviewTextDark : styles.reviewText}
	                          onLinkPress={() => {}}
	                          tagsStyles={{a: styles.link, p: styles.p}} />
		    			{item.rating !== 0 &&
		    				<View style={styles.reviewRating}>
			    				<AirbnbRating count={5}
											  size={12}
											  defaultRating={item.rating}
											  showRating={false}
											  isDisabled={true}
									/>
							</View>
						}
					</View>
				}</Observer>
			)
	    }
    	
	}

	_renderEmpty = () => {
		return <Empty icon="comments" caption="Відгуків ще немає" />
	}

	render() {
		const {loading, items, refreshing, formData, isFormVisible, formLoading} = ReviewsModule
		const {theme} = this.props
		if (loading) return <Loader />
		else return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<FlatList data={items}
						  keyExtractor={(item, index) => `review-${item.id}`}
						  renderItem={this._renderItem}
						  ListEmptyComponent={this._renderEmpty}
						  initialNumToRender={10}
						  ref="reviewsList"
						  onEndReached={() => ReviewsModule.onLoadMore()}
        			      onEndReachedThreshold={0.5}
        			      onRefresh={() => ReviewsModule.onRefresh()}
    					  refreshing={refreshing}
						  removeClippedSubviews={false}
						  showsVerticalScrollIndicator={false} />
				<View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
					<Button caption={'Залишити відгук'}
							onPress={() => ReviewsModule.changeVisibleForm(true)} />
				</View>
				<Modal visible={isFormVisible}
					   onTouchOutside={() => ReviewsModule.changeVisibleForm(false)}
					   modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
					   swipeDirection={['down']}
					   onSwipeOut={() => ReviewsModule.changeVisibleForm(false)}
					   modalStyle={[modal, theme === 'dark' ? styles.modalDark : styles.modalLight]}>
					<ModalContent>
						<Ripple rippleColor={constants.palette.main}
								rippleCentered={true}
								onPress={() => ReviewsModule.changeVisibleForm(false)}
								style={[styles.headerBtn, styles.modalBtnRight]}>
	                		<Icon name="remove" color={constants.palette.gray} size={22} />
	                	</Ripple>
        				<Text style={[styles.modalTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Залишити відгук</Text>
						<Input placeholder="Імя"
							   value={formData.reviewer}
							   onChangeText={value => ReviewsModule.changeInput(value, 'reviewer')} />
						{!Store.isAuth &&
							<Input placeholder="Email"
								   value={formData.reviewer_email}
								   keyboardType="email-address"
								   onChangeText={value => ReviewsModule.changeInput(value, 'reviewer_email')} />
						}
						<Input placeholder="Коментар"
							   addStyle={styles.textarea}
							   textAlignVertical={'top'}
							   multiline={true}
							   value={formData.review}
							   onChangeText={value => ReviewsModule.changeInput(value, 'review')} />
						<View style={styles.addReviewRating}>
							<AirbnbRating count={5}
										  size={25}
										  defaultRating={formData.rating}
										  showRating={false}
										  onFinishRating={value => ReviewsModule.changeInput(value, 'rating')} />
						</View>
						<Button caption="Залишити відгук"
								disabled={formData.reviewer_email.length == 0 || formData.reviewer.length == 0 || formData.review.length == 0 || formLoading}
								loading={formLoading}
								onPress={() => {this.refs.reviewsList.scrollToOffset({ animated: true, offset: 0 }); ReviewsModule.createReview()}} />
					</ModalContent>
				</Modal>
			</View>
		)
	}
}

export default Theme(Reviews)