import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import chip from '../assets/chip.png'
import avatar from '../assets/avatar.png'

const Avatar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.Img} source={avatar} />
        <Text>You</Text>
      </View>
      <View style={styles.wrapper}>
        <Text>12</Text>
        <Image style={styles.Img} source={chip} resizeMode="cover" />
      </View>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Img: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  chipWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
