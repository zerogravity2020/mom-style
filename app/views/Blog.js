import React, { Component } from 'react'
import { FlatList, View, Text, Modal, ScrollView } from 'react-native'
import { observer, Observer } from "mobx-react"
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment/min/moment-with-locales'
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html'
import Ripple from 'react-native-material-ripple'
import Empty from '../components/Empty'
import PostsModule from '../store/posts'
import Loader from '../components/Loader'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class Blog extends Component {
	componentDidMount() {
		moment.locale('uk')
		PostsModule.loadPosts()
	}

	_renderItem = ({item, index}) => {
		const {theme} = this.props
		return (
    		<Observer>{() => 
	    		<Ripple style={[styles.post, index == 0 && styles.first, theme === 'dark' && styles.postDark]}
	    				onPress={() => PostsModule.loadPost(item.id)}
						rippleColor={constants.palette.main}>
	    			<Text style={[styles.postTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{item.title.rendered}</Text>
	    			<HTML html={item.excerpt.rendered}
	    				  baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}
			              tagsStyles={{a: styles.link, p: styles.p, ul: styles.ul, li: styles.li, img: styles.img}} />
					<Text style={styles.postDate}>{moment(item.date).format('L')}</Text>
				</Ripple>
			}</Observer>
    	)
    	
	}

	_renderEmpty = () => {
		const {theme} = this.props
		return <Empty icon="newspaper-o" caption="Постів ще немає" />
	}

	render() {
		const {postsList, loading, postData, modalVisible} = PostsModule
		const {theme} = this.props

		if (loading) return <Loader />
		else return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<FlatList data={postsList}
						  keyExtractor={(item, index) => `post-${item.id}`}
						  renderItem={this._renderItem}
						  ListEmptyComponent={this._renderEmpty}
						  initialNumToRender={6}
						  removeClippedSubviews={false}
						  showsVerticalScrollIndicator={false} />
				{modalVisible &&
			    	<Modal visible={true}
						   animationType='fade'
						   transparent={true}>
						<SafeAreaView style={theme === 'dark' ? styles.pageDark : styles.page}>
							<ScrollView showsVerticalScrollIndicator={false}>
								<Ripple rippleColor={constants.palette.main}
										rippleCentered={true}
										onPress={() => PostsModule.openModal(false)}
										style={[styles.headerBtn, styles.modalBtn]}>
			                		<Icon name="remove" color={constants.palette.gray} size={22} />
			                	</Ripple>
			                	<View style={styles.content}>
			                		<Text style={[styles.modalTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{postData.title.rendered}</Text>
				                	<HTML html={postData.content.rendered}
										  baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}
				                          tagsStyles={{a: styles.link, p: styles.p, ul: styles.ul, li: styles.li, img: styles.img}} />
								</View>
							</ScrollView>
						</SafeAreaView>
					</Modal>
				}
			</View>
		)
	}
}

export default Theme(Blog)