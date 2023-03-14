import { View, Text, StyleSheet } from 'react-native'
import { DraxView } from 'react-native-drax'
import Card from './Card'
import React from 'react'

const CardSlot = ({ playHand, setPlayHand, setCard, cards }) => {
  const onReceiveDrop = (
    event,
    playHand,
    setPlayHand,
    setCard,
    cards,
    index
  ) => {
    const payload = event.dragged.payload
    if (cards[index] === '') {
      let newData = cards.slice()
      newData[index] = event.dragged.payload
      setCard(newData)
    } else {
      const indexCard = cards[index]
      const newData = cards.slice()
      newData.splice(index, 1, payload)
      setCard(newData)

      let playSet = playHand.slice()

      playSet = playSet.filter((card) => {
        if (card.suit !== payload.suit || card.rank !== payload.rank)
          return card
      })
      playSet.push(indexCard)

      setPlayHand(playSet)
    }
  }

  const onDrop = (index) => {
    const tempCard = cards.slice()
    tempCard[index] = ''
    setCard(tempCard)
  }
  return (
    <View style={styles.container}>
      <View style={styles.topSetContainer}>
        {cards.map((_, index) => (
          <View style={styles.singleCard} key={index}>
            <DraxView
              draggable
              onReceiveDragDrop={(event) => {
                console.log(event)
                onReceiveDrop(
                  event,
                  playHand,
                  setPlayHand,
                  setCard,
                  cards,
                  index
                )
              }}
              renderContent={({ viewState }) => {
                return (
                  <>
                    <Card suit={cards[index].suit} rank={cards[index].rank} />
                  </>
                )
              }}
              payload={cards[index]}
              onDragDrop={() => onDrop(index)}
              draggingStyle={styles.draggingStyle}
              dragReleasedStyle={styles.draggingStyle}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

export default CardSlot

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  topSetContainer: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  singleCard: {
    width: 55,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  draggingStyle: {
    opacity: 0.2
  }
})
