import React, { Component } from 'react'
import { View, Image, Dimensions, Modal } from 'react-native'
import { observer } from "mobx-react"
import { SafeAreaView } from 'react-native-safe-area-context'
import Slick from 'react-native-slick'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple'
import ImageZoom from 'react-native-image-pan-zoom'
import CardModule from '../../store/card'
import styles from '../../styles/styles'
import constants from '../../constants'

const photoSize = Dimensions.get('window').width

@observer
class ProductCardPreview extends Component {

	render() {
		const {data} = this.props
		const {modalOpen, getCurrentSlide} = CardModule

		return (
			<>
				<Slick
					style={{height: photoSize}}
					loop={false}
					dotColor={constants.palette.gray}
					activeDotColor={constants.palette.main}
					onIndexChanged={index => CardModule.changeSlider(index)}>
		    		{data.map((image) => 
			    		<Ripple key={`photo-${image.id}`}
			    				onPress={() => CardModule.openModal(true)}
			    				rippleColor={constants.palette.main}
								rippleCentered={true}>
			    			<Image source={{uri: image.src}} style={{width: photoSize, height: photoSize}} />
			    		</Ripple>
			    	)}
		    	</Slick>
		    	<Modal visible={CardModule.modalOpen}
		    		   animationType='fade'
					   transparent={true}>
					<SafeAreaView style={styles.page}>
						<View style={[styles.main, styles.pageCenter]}>
							<Ripple rippleColor={constants.palette.main}
									rippleCentered={true}
									onPress={() => CardModule.openModal(false)}
									style={[styles.headerBtn, styles.modalBtn]}>
		                		<Icon name="remove" color={constants.palette.gray} size={22} />
		                	</Ripple>
	                		<ImageZoom cropWidth={Dimensions.get('window').width}
				                       cropHeight={Dimensions.get('window').height}
				                       imageWidth={photoSize}
				                       imageHeight={photoSize}
				                       enableSwipeDown={true}
	                        		   onSwipeDown={() => CardModule.openModal(false)}>
				    			<Image source={{uri: getCurrentSlide.src}} style={{width: photoSize, height: photoSize}} />
				    		</ImageZoom>
				    	</View>
					</SafeAreaView>
				</Modal>
			</>
		)
	}
}

export default ProductCardPreview