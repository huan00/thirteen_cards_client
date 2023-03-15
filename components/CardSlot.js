import { View, StyleSheet } from 'react-native'
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
    const payload = event.dragged.payload[0]
    if (cards[index] === '') {
      let newData = cards.slice()
      newData[index] = event.dragged.payload[0]

      const temp = checkDupCard(newData, payload, index)

      setCard(temp)
    } else if (cards[index] !== '') {
      swapCard(event, setCard, cards, index)
    }
  }
  const onDrop = (index) => {
    const tempCard = cards.slice()
    tempCard[index] = ''
    setCard(tempCard)
  }

  const checkDupCard = (cards, payload, index) => {
    const temp = cards.map((card, idx) => {
      if (
        card.suit === payload.suit &&
        card.rank === payload.rank &&
        idx !== index
      ) {
        return ''
      } else return card
    })
    return temp
  }

  const swapCard = (event, setCards, cards, index) => {
    const payload = event.dragged.payload[0]
    const fromSet = event.dragged.payload[1]
    const fromCards = fromSet['cards'].slice()
    const replaceCard = cards[index]

    //receiving set handled
    const receiveSet = cards.slice()
    receiveSet.splice(index, 1, payload)
    const temp = checkDupCard(receiveSet, payload, index)
    setCards(temp)
    //swap on same row
    if (checkSameRowSwap(fromCards, replaceCard)) {
      receiveSet.splice(fromSet.index, 1, replaceCard)
      setCards(receiveSet)
    } else {
      //swap from playHand
      fromCards.splice(fromSet.index, 1, replaceCard)
      fromSet.setCard(fromCards)
    }
  }

  const checkSameRowSwap = (set, replaceCard) => {
    for (let i = 0; i < set.length; i++) {
      const card = set[i]
      if (card.suit === replaceCard.suit && card.rank === replaceCard.rank) {
        return true
      }
    }
    return false
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSetContainer}>
        {cards.map((_, index) => (
          <View style={styles.singleCard} key={index}>
            <DraxView
              style={styles.transition}
              draggingStyle={styles.draggingStyle}
              draggable
              onReceiveDragDrop={(event) => {
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
              payload={[{ ...cards[index] }, { setCard, cards, index }]}
              onDragDrop={() => onDrop(index)}
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
    opacity: 0
  }
})
