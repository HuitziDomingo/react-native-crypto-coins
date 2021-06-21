import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, StatusBar } from 'react-native';
import { CoinItem } from './components';

export default () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    let res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    let data = await res.json()
    //Rellenamos el arreglo del Hook con los datos de la api, rellenando asi la constante "coins"
    setCoins(data)
    console.log(data)
  }

  useEffect(() => {
    loadData()
  }, [])



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0df2c9" />
      <View style={styles.header}>
        <Text style={styles.title}>Cripto Marker</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#aaa"
          onChangeText={(t) => {
            setSearch(t)
          }}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coins.filter(coin => coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search) ||
            coin.name.includes(search) ||
            coin.symbol.toLowerCase().includes(search))
        }
        renderItem={({ item }) => {
          return <CoinItem coin={item}></CoinItem>
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657ce',
    borderBottomWidth: 1,
    width: '45%'
  },
});
