import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { deck } from '../constants/deck'

const Card = ({ rank, suit, index }) => {
  const [zIndex, setZIndex] = useState(0)
  const cardImage = (rank, suit) => {
    let temp = ''
    deck.forEach((el) => {
      if (el.suit === suit && el.rank === rank) {
        temp = el
      }
    })
    return temp
  }
  const card = cardImage(rank, suit)

  return (
    <TouchableOpacity style={[index === 0 ? '' : styles.card]}>
      <Image
        source={card.img}
        style={{ width: 48, height: 80 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    // marginLeft: -20
  }
})
