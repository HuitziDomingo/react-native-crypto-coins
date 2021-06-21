import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';


export default ({ coin }) => {
    return (
        <View style={styles.container}>
            <View style={styles.coinNames}>
                <Image style={styles.image} source={{ uri: coin.image }} />
                <View style={styles.containerNames}>
                    <Text style={styles.text}>{coin.name}</Text>
                    <Text style={styles.textsymbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textPrice}>${coin.current_price}</Text>
                <Text style={[
                    styles.pricePercentage,
                    coin.price_change_percentage_24h > 0
                        ? styles.priceUp
                        : styles.priceDown]}
                >${coin.price_change_percentage_24h}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerNames: {
        marginLeft: 10
    },
    text: {
        color: '#fff'
    },
    textsymbol: {
        color: '#aaa',
        textTransform: 'uppercase'
    },
    image: {
        width: 30,
        height: 30,
    },
    coinNames: {
        flexDirection: 'row',
    },
    pricePercentage: {
        textAlign: 'right',
    },
    textPrice: {
        color: '#fff',
        textAlign: 'right'
    },
    priceUp: {
        color: '#00b5b9'
    },
    priceDown: {
        color: '#fc4422'
    }
});
