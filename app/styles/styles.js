import { StyleSheet } from 'react-native'
import constants from '../constants'

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	logo: {
		width: 209,
		height: 60,
		marginVertical: 20,
		marginLeft: 15
	},
	page: {
		flex: 1,
		position: 'relative',
		backgroundColor: constants.palette.bg,
	},
	pageDark: {
		flex: 1,
		position: 'relative',
		backgroundColor: constants.paletteDark.bg,
	},
	pageCenter: {
		flexDirection: 'row',
		backgroundColor: constants.palette.black,
		alignItems: 'center'
	},
	header: {
		width: '100%',
		position: 'relative',
		paddingHorizontal: 15,
		paddingTop: 15,
		backgroundColor: constants.palette.white
	},
	headerBtn: {
		width: 40,
		height: 40,
		position: 'relative',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerBadge: {
		top: 0,
		right: 0
	},
	bottomPage: {
		padding: 15,
		backgroundColor: constants.palette.white
	},
	bottomPageDark: {
		padding: 15,
		backgroundColor: constants.paletteDark.bg
	},
	bottomPageLeft: {
		flex: 1
	},
	headerText: {
		fontSize: 28
	},
	section: {
		paddingHorizontal: 15,
		paddingBottom: 15
	},
	slider: {
		marginRight: 15,
		flexDirection: 'row'
	},
	title: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: '600'
	},
	mainSlider: {
		position: 'relative',
		overflow: 'hidden'
	},
	mainSliderOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,.4)',
		zIndex: 2
	},
	mainSliderDetails: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 3,
		padding: 20,
		flexDirection: 'column',
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainSliderCaption: {
		color: constants.palette.white,
		fontSize: 28,
		fontWeight: '600',
		textAlign: 'center'
	},
	mainSliderDescription: {
		color: constants.palette.white,
		fontSize: 16,
		textAlign: 'center',
		paddingTop: 10
	},
	content: {
		padding: 15
	},
	product: {
		marginLeft: 15,
		marginBottom: 15,
		position: 'relative'
	},
	productItem: {
		flexDirection: 'column',
		flexWrap: 'nowrap'
	},
	productListItem: {
		flexDirection: 'row'
	},
	productDetails: {
		paddingTop: 15,
		flexDirection: 'column',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		flex: 1
	},
	productListDetails: {
		paddingHorizontal: 15,
		paddingTop: 0
	},
	productThumb: {
		position: 'relative',
		borderRadius: 10,
		overflow: 'hidden'
	},
	productThumbOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,.1)',
		zIndex: 2
	},
	productCaption: {
		fontSize: 16,
		fontWeight: '600',
		paddingBottom: 5
	},
	productNewPrice: {
		color: constants.palette.red
	},
	productPrice: {
		fontSize: 20,
		fontWeight: '700',
		color: constants.palette.text
	},
	productPriceDark: {
		fontSize: 20,
		fontWeight: '700',
		color: constants.paletteDark.text
	},
	productOldPrice: {
		fontSize: 14,
		color: constants.palette.gray,
		textDecorationLine: 'line-through'
	},
	productSale: {
		position: 'absolute',
		height: 24,
		backgroundColor: constants.palette.red,
		borderRadius: 12,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		zIndex: 3,
		paddingHorizontal: 10,
		left: 10,
		top: 10
	},
	productSaleText: {
		fontSize: 10,
		color: constants.palette.white,
		textAlign: 'center'
	},
	productHit: {
		position: 'absolute',
		height: 24,
		backgroundColor: constants.palette.orange,
		borderRadius: 12,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		zIndex: 3,
		paddingHorizontal: 10,
		left: 10,
		top: 10
	},
	productHitText: {
		fontSize: 10,
		color: constants.palette.white,
		textAlign: 'center'
	},
	productCart: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: constants.palette.main,
		alignItems: 'center',
		justifyContent: 'center'
	},
	productFavorite: {
		position: 'absolute',
		right: 10,
		top: 10,
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: constants.palette.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	productRemove: {
		position: 'absolute',
		right: 15,
		top: 0,
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: constants.palette.main,
		alignItems: 'center',
		justifyContent: 'center'
	},
	search: {
		position: 'relative'
	},
	searchText: {
		borderBottomWidth: 1,
		height: 60,
		paddingHorizontal: 50,
		fontSize: 18,
		borderBottomColor: constants.palette.gray
	},
	searchTextDark: {
		borderBottomColor: constants.paletteDark.bgLight,
	},
	searchLoupe: {
		position: 'absolute',
		left: 15,
		top: 16
	},
	searchClear: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 60,
		height: 60,
		overflow: 'hidden',
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	field: {
		height: 60,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	fieldIcon: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: constants.palette.main,
		marginRight: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	fieldWrap: {
		flex: 1,
		flexDirection: 'row'
	},
	fieldDetails: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 10
	},
	fieldCaption: {
		fontSize: 16
	},
	buttonWrap: {
		width: '100%',
		position: 'relative',
		height: 45,
		borderRadius: 10,
		backgroundColor: constants.palette.main
	},
	buttonOverlay: {
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		height: '100%',
		top: 0,
		left: 0
	},
	buttonDisabled: {
		backgroundColor: constants.palette.gray
	},
	button: {
		height: 45,
		width: '100%',
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		position: 'relative'
	},
	buttonLoader: {
		position: 'absolute',
		zIndex: 3,
		top: 4,
		left: 10
	},
	buttonText: {
		fontSize: 16,
		color: constants.palette.white
	},
	checkboxGroup: {
		marginVertical: 10,
		paddingVertical: 7,
		paddingHorizontal: 15,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: constants.palette.gray
	},
	checkboxGroupDark: {
		borderColor: constants.paletteDark.bgLight
	},
	checkbox: {
		marginVertical: 8,
		flexDirection: 'row'
	},
	checkboxIcon: {
		width: 20,
		height: 20,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: constants.palette.gray,
		backgroundColor: constants.palette.white
	},
	checkboxIconDark: {
		borderColor: constants.paletteDark.bgLight,
		backgroundColor: constants.paletteDark.bg
	},
	checkboxIconChecked: {
		backgroundColor: constants.palette.main
	},
	checkboxWrapText: {
		flex: 1,
		paddingLeft: 10
	},
	checkboxText: {
		fontSize: 16
	},
	input: {
		paddingVertical: 10,
		height: 50,
		fontSize: 16,
		marginVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: constants.palette.gray,
		color: constants.palette.text
	},
	inputDark: {
		color: constants.paletteDark.text,
		borderColor: constants.paletteDark.bgLight,
	},
	inputFocus: {
		borderColor: constants.palette.main,
	},
	inputDisabled: {
		backgroundColor: constants.palette.gray
	},
	textarea: {
		height: 150,
		paddingTop: 10
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: '55%',
		paddingHorizontal: 15,
		alignItems: 'center'
	},
	emptyText: {
		fontSize: 20,
		textAlign: 'center',
		paddingVertical: 20,
		fontWeight: '600'
	},
	separator: {
		flex: 1,
		height: 1,
		backgroundColor: constants.palette.grayLight
	},
	separatorDark: {
		flex: 1,
		height: 1,
		backgroundColor: constants.paletteDark.bgLight
	},
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: constants.palette.white
	},
	loaderDark: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: constants.paletteDark.bg
	},
	category: {
		marginHorizontal: 15,
		marginBottom: 15,
		backgroundColor: 'white',
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		position: 'relative'
	},
	categoryOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,.25)',
		zIndex: 2
	},
	categoryDetails: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 3,
		padding: 20,
		flexDirection: 'column',
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	categoryCaption: {
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	categoryDescription: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		paddingTop: 10
	},
	review: {
		marginHorizontal: 15,
		backgroundColor: constants.palette.white,
		marginBottom: 15,
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		padding: 15
	},
	reviewDark: {
		backgroundColor: constants.paletteDark.bgLight,
	},
	reviewTop: {
		flexDirection: 'row',
		width: '100%',
		paddingBottom: 10
	},
	reviewTextWrap: {
		flex: 1,
		flexDirection: 'column'
	},
	reviewName: {
		fontWeight: 'bold',
		fontSize: 14
	},
	reviewDate: {
		color: constants.palette.gray,
		fontSize: 14
	},
	reviewText: {
		fontSize: 14,
		lineHeight: 19,
		color: constants.palette.text
	},
	reviewTextDark: {
		fontSize: 14,
		lineHeight: 19,
		color: constants.paletteDark.text
	},
	reviewRating: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	addReviewPane: {
		paddingHorizontal: 15,
		paddingBottom: 15,
		backgroundColor: constants.palette.white
	},
	addReviewRating: {
		marginTop: 5,
		marginBottom: 15,
		flexDirection: 'row'
	},
	badge: {
		position: 'absolute',
		width: 14,
		height: 14,
		borderRadius: 7,
		right: -12,
		top: -7,
		backgroundColor: constants.palette.main
	},
	badgeText: {
		color: '#fff',
		fontSize: 10,
		textAlign: 'center'
	},
	card: {
		padding: 15,
		position: 'relative'
	},
	cardCaption: {
		paddingRight: 35,
		fontSize: 20,
		fontWeight: 'bold'
	},
	cardHit: {
		position: 'absolute',
		zIndex: 2,
		top: 15,
		right: 15,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: constants.palette.orange
	},
	cardHitText: {
		fontSize: 14,
		color: constants.palette.white
	},
	cardSale: {
		position: 'absolute',
		zIndex: 2,
		top: 15,
		left: 15,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: constants.palette.red
	},
	cardSaleText: {
		fontSize: 14,
		color: constants.palette.white
	},
	cardTop: {
		paddingTop: 10,
		paddingBottom: 15,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},
	cardTopRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	cardBottom: {
		paddingTop: 15
	},
	cardPrice: {
		fontSize: 30,
		fontWeight: 'bold',
		color: constants.palette.text
	},
	cardPriceDark: {
		fontSize: 30,
		fontWeight: 'bold',
		color: constants.paletteDark.text
	},
	cardNewPrice: {
		color: constants.palette.red
	},
	cardOldPrice: {
		fontSize: 16,
		paddingTop: 5,
		color: constants.palette.gray,
		textDecorationLine: 'line-through'
	},
	cardAttributesList: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	cardAttribute: {
		height: 40,
		minWidth: 40,
		backgroundColor: constants.palette.grayLight,
		borderRadius: 10,
		paddingHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginRight: 5
	},
	cardAttributeActive: {
		backgroundColor: constants.palette.main
	},
	cardAttributeText: {
		fontSize: 16,
		textAlign: 'center'
	},
	cardAttributeTextActive: {
		color: constants.palette.white
	},
	cardFavorite: {
		position: 'absolute',
		right: 15,
		top: 15,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		backgroundColor: constants.palette.main
	},
	text: {
		fontSize: 16,
		lineHeight: 22
	},
	p: {
		margin: 0,
		padding: 0,
		marginBottom: 15
	},
	ul: {
		padding: 0,
		margin: 0,
		marginBottom: 5
	},
	li: {
		margin: 0,
		padding: 0
	},
	link: {
		color: constants.palette.main,
		textDecorationLine: 'none',
	},
	img: {
		margin: 0,
		width: '100%',
		marginBottom: 15
	},
	tabs: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	tabsLink: {
		paddingHorizontal: 25,
	},
	tabsLinkBorder: {
		borderLeftWidth: 1,
		borderLeftColor: constants.palette.grayLight
	},
	tabsLinkBorderDark: {
		borderLeftWidth: 1,
		borderLeftColor: constants.paletteDark.bgLight
	},
	tabsText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: constants.palette.main
	},
	modalBtn: {
		position: 'absolute',
		left: 5,
		zIndex: 99,
		top: 12
	},
	modalBtnRight: {
		position: 'absolute',
		right: 0,
		zIndex: 99,
		top: 0
	},
	modalTitle: {
		fontSize: 24,
		textAlign: 'center',
		fontWeight: '600',
		paddingBottom: 15
	},
	order: {
		marginHorizontal: 15,
		backgroundColor: constants.palette.white,
		marginBottom: 15,
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		padding: 15
	},
	orderDark: {
		backgroundColor: constants.paletteDark.bgLight,
	},
	orderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingBottom: 10
	},
	orderDate: {
		fontSize: 14,
		color: constants.palette.gray
	},
	orderText: {
		fontSize: 16,
		fontWeight: '600'
	},
	orderBlock: {
		marginTop: 10,
		borderRadius: 5,
		padding: 10,
		backgroundColor: constants.palette.grayLight
	},
	orderBlockDark: {
		backgroundColor: constants.paletteDark.bg
	},
	orderContainer: {
		marginTop: 15
	},
	orderMore: {
		height: 20,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	orderMoreText: {
		fontSize: 14,
		color: constants.palette.gray
	},
	orderTextBold: {
		fontWeight: 'bold'
	},
	first: {
		marginTop: 15
	},
	post: {
		marginHorizontal: 15,
		backgroundColor: constants.palette.white,
		marginBottom: 15,
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		padding: 15
	},
	postDark: {
		backgroundColor: constants.paletteDark.bgLight,
	},
	postTitle: {
		fontSize: 20,
		lineHeight: 25,
		paddingBottom: 10,
	},
	postDate: {
		fontSize: 14,
		color: constants.palette.gray
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: constants.palette.white,
		borderBottomWidth: 1,
		borderBottomColor: constants.palette.grayLight,
		paddingHorizontal: 5
	},
	actionsDark: {
		backgroundColor: constants.paletteDark.bg,
		borderBottomColor: constants.paletteDark.bgLight
	},
	actionsBtn: {
		borderRadius: 5,
		overflow: 'hidden',
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionBtnWide: {
		width: '42%',
	},
	actionBtnSmall: {
		width: '16%',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	actionsTextWrap: {
		paddingLeft: 10,
	},
	actionsSmallText: {
		fontSize: 12,
		color: constants.palette.gray
	},
	modalFilterContent: {
		flex: 1,
		flexDirection: 'column',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},
	modalFilterBody: {
		paddingHorizontal: 15,
		marginHorizontal: -15
	},
	modalFilterRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	modalFilterList: {
		flexDirection: 'column',
		flexWrap: 'nowrap'
	},
	modalFilterListText: {
		fontSize: 16
	},
	modalFilterListLink: {
		marginTop: 10
	},
	modalFilterBlock: {
		marginBottom: 20,
		flexDirection: 'column',
		flexWrap: 'nowrap'
	},
	modalFilterTitle: {
		fontSize: 20,
		paddingBottom: 10,
		fontWeight: 'bold',
	},
	modalFilterCaption: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	modalFilterBottom: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	modalFilterCol: {
		width: '48%',
		position: 'relative'
	},
	price: {
		position: 'absolute',
		top: 18,
		right: 10,
	},
	marker: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: constants.palette.main
	},
	range: {
		marginHorizontal: 12
	},
	textColor: {
		color: constants.palette.text
	},
	textColorDark: {
		color: constants.paletteDark.text
	},
	textBase: {
		fontSize: 16,
		lineHeight: 22,
		color: constants.palette.text
	},
	textBaseDark: {
		fontSize: 16,
		lineHeight: 22,
		color: constants.paletteDark.text
	},
	modalDark: {
		backgroundColor: constants.paletteDark.bg
	},
	modalLight: {
		backgroundColor: constants.palette.white
	},
	menuDark: {
		backgroundColor: constants.paletteDark.bgLight
	},
	menuLight: {
		backgroundColor: constants.palette.white
	}
});

export default styles