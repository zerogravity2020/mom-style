import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../../styles/styles'
import constants from '../../constants'
import CardModule from '../../store/card'

class ProductCardAttributes extends Component {

    render() {
        const {data, getAttribute} = this.props

        const list = data.map(attribute => 
            <View key={`attribute-${attribute.id}`}
                  style={styles.cardAttributes}>
                <View style={styles.cardAttributesList}>
                    {attribute.options.map(option => 
                        <Ripple style={styles.cardAttribute}
                                onPress={() => {getAttribute(option)}}
                                rippleCentered={true}
                                key={`option-${option}`}
                                style={[styles.cardAttribute, option == CardModule.getAciveAttribute && styles.cardAttributeActive]}>
                            <Text style={styles.cardAttributeText}>{option}</Text>
                        </Ripple>
                    )}
                </View>
            </View>
        )

        return (
            <View style={styles.cardAttributes}>
                {list}
            </View>
        )
    }
}

export default ProductCardAttributes