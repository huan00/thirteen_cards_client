import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { socket } from '../utilities/services'
import { background, white } from '../constants/theme'
import Navbar from '../components/Navbar'
import horizontalCover from '../assets/horizontalCover.png'
import verticalLeft from '../assets/verticalLeft.png'
import verticalRight from '../assets/verticalRight.png'
import Avatar from '../components/Avatar'
import { DraxProvider, DraxView, DraxList } from 'react-native-drax'
import Card from '../components/Card'
import CardSlot from '../components/CardSlot'

const PlayScreen = ({ navigation }) => {
  const route = useRoute()
  const { roomId, player } = route.params
  const [playerHand, setPlayerHand] = useState(null)
  const [setHand, setSetHand] = useState([])
  const [topSet, setTopSet] = useState(['', '', ''])
  const [midSet, setMidSet] = useState(['', '', '', '', ''])
  const [bottomSet, setBottomSet] = useState(['', '', '', '', ''])
  const [draggable, setDraggable] = useState(true)

  const handleBack = () => {
    navigation.goBack()
  }

  socket.on(player, (hand) => {
    setPlayerHand(hand)
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Navbar timer={2} roomId={roomId} handlePress={handleBack} />
        <View style={styles.otherPlayer}>
          <Image style={styles.topHand} source={horizontalCover} />
          <Image style={styles.leftHand} source={verticalLeft} />
          <Image style={styles.rightHand} source={verticalRight} />
          <View style={styles.ad}>
            <Text>Ad</Text>
          </View>
        </View>

        {/* Player card logic  */}
        <DraxProvider>
          <CardSlot
            playHand={playerHand}
            setPlayHand={setPlayerHand}
            setCard={setTopSet}
            cards={topSet}
          />
          <CardSlot
            playHand={playerHand}
            setPlayHand={setPlayerHand}
            setCard={setMidSet}
            cards={midSet}
          />
          <CardSlot
            playHand={playerHand}
            setPlayHand={setPlayerHand}
            setCard={setBottomSet}
            cards={bottomSet}
          />
          {/* LIST OF CARDS */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {playerHand && (
              <DraxList
                style={{}}
                numColumns={13}
                longPressDelay={0}
                scrollEnabled={false}
                data={playerHand}
                keyExtractor={(item) => item}
                onItemReorder={({ fromIndex, toIndex }) => {
                  const newData = playerHand.slice()
                  newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0])
                  setPlayerHand(newData)
                }}
                renderItemContent={({ item, index }) => (
                  <DraxView
                    draggingStyle={styles.dragging}
                    dragInactiveStyle={{}}
                    style={index === 0 ? '' : { marginLeft: -20 }}
                    payload={[
                      { suit: item.suit, rank: item.rank },
                      { setCard: setPlayerHand, cards: playerHand, index }
                    ]}
                    onDragDrop={(event) => {
                      const newData = playerHand.slice()
                      newData.splice(index, 1)
                      setPlayerHand(newData)
                    }}
                  >
                    <Card suit={item.suit} rank={item.rank} />
                  </DraxView>
                )}
              />
            )}
          </View>
        </DraxProvider>

        <View style={styles.playerHand}>
          <View></View>
          <Avatar />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PlayScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background
  },
  wrapper: {
    flex: 1,
    position: 'relative'
  },
  otherPlayer: {
    flex: 1
  },
  topHand: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 4 }]
  },
  leftHand: {
    position: 'absolute',
    top: 100
  },
  rightHand: {
    position: 'absolute',
    right: 0,
    top: 100
  },
  ad: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: white,
    position: 'absolute',
    left: '50%',
    top: 100,
    transform: [{ translateX: -Dimensions.get('window').width / 4 }]
  },

  startingHand: {},
  dragging: {
    opacity: 0
  }
})
