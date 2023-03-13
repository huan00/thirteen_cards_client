import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
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
import { event } from 'react-native-reanimated'

const PlayScreen = ({ navigation }) => {
  const [playerHand, setPlayerHand] = useState(null)
  const [setHand, setSetHand] = useState([])
  const [topSet, setTopSet] = useState([])
  const [midSet, setMidSet] = useState([])
  const [bottomSet, setBottomSet] = useState([])
  const route = useRoute()
  const { roomId, player } = route.params

  const handleBack = () => {
    navigation.goBack()
  }

  socket.on(player, (hand) => {
    setPlayerHand(hand)
  })

  console.log(setHand)
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
          <View style={styles.playArea}>
            {/* Top Set Drop Area */}
            <View style={styles.setArea}>
              <DraxView
                style={[styles.topSet]}
                onReceiveDragEnter={() => {
                  console.log('enter')
                }}
                receivingStyle={styles.receiving}
                renderContent={() => {
                  return (
                    <DraxList
                      scrollEnabled={false}
                      numColumns={3}
                      data={topSet}
                      renderItemContent={({ item, index }) => (
                        <DraxView
                          onDragEnd={(e) => {
                            setTopSet([...topSet, e.dragged.payload])
                          }}
                          dragPayload={item}
                          onDragDrop={(e) => {
                            const newData = topSet.slice()
                            newData.splice(index, 1)
                            setTopSet(newData)
                          }}
                        >
                          {item}
                        </DraxView>
                      )}
                    />
                  )
                }}
                onReceiveDragDrop={(event) => {
                  console.log('drop')
                  console.log(event)
                  if (topSet.length < 5) {
                    setTopSet([...topSet, event.dragged.payload])
                  } else {
                    setPlayerHand([...playerHand, event.dragged.payload])
                  }
                }}
              />

              {/* MidSET Area */}
              <DraxView
                style={[styles.mid_bottom_Set]}
                receivingStyle={styles.receiving}
                renderContent={(item) => {
                  return (
                    <DraxList
                      scrollEnabled={false}
                      numColumns={5}
                      data={midSet}
                      renderItemContent={({ item, index }) => (
                        <DraxView
                          dragPayload={item}
                          onDragEnd={(e) => {
                            setMidSet([...topSet, e.dragged.payload])
                          }}
                          onDragDrop={(e) => {
                            const newData = topSet.slice()
                            newData.splice(index, 1)
                            setMidSet(newData)
                          }}
                        >
                          {item}
                        </DraxView>
                      )}
                    />
                  )
                }}
                onReceiveDragDrop={(event) => {
                  if (midSet.length < 5) {
                    setMidSet([...midSet, event.dragged.payload])
                  } else {
                    setPlayerHand([...playerHand, event.dragged.payload])
                  }
                }}
              />
              {/* BottomSet area */}
              <DraxView
                style={[styles.mid_bottom_Set]}
                receivingStyle={styles.receiving}
                renderContent={() => {
                  return (
                    <DraxList
                      scrollEnabled={false}
                      numColumns={5}
                      data={bottomSet}
                      renderItemContent={({ item, index }) => (
                        <DraxView
                          dragPayload={item}
                          onDragEnd={(e) => {
                            setBottomSet([...topSet, e.dragged.payload])
                          }}
                          onDragDrop={(e) => {
                            const newData = topSet.slice()
                            newData.splice(index, 1)
                            setBottomSet(newData)
                          }}
                        >
                          {item}
                        </DraxView>
                      )}
                    />
                  )
                }}
                onReceiveDragDrop={(event) => {
                  if (bottomSet.length < 5) {
                    setBottomSet([...bottomSet, event.dragged.payload])
                  } else {
                    setPlayerHand([...playerHand, event.dragged.payload])
                  }
                }}
              />
            </View>

            <View style={styles.playerHandArea}>
              <DraxList
                scrollEnabled={false}
                numColumns={13}
                data={playerHand}
                renderItemContent={({ item, index }) => (
                  <DraxView
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    onDrag={(e) => {
                      console.log(e.dragged.payload)
                    }}
                    onDragDrop={(card) => {
                      if (card.dragged.parentId === card.receiver.parentId)
                        return
                      const newData = playerHand.slice()
                      newData.splice(index, 1)
                      setPlayerHand(newData)
                    }}
                    longPressDelay={0}
                    dragPayload={
                      <Card suit={item.suit} rank={item.rank} index={index} />
                    }
                  >
                    <View style={index !== 0 ? { marginLeft: -20 } : ''}>
                      <Card suit={item.suit} rank={item.rank} index={index} />
                    </View>
                  </DraxView>
                )}
                keyExtractor={(item) => item + Math.random()}
              />
            </View>
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
  playArea: {
    flex: 1,
    display: 'flex'
    // alignItems: 'center'
    // position: 'absolute'
    // left: 20
  },
  cardPlacementRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  singleCard: {
    width: 60,
    height: 90,
    backgroundColor: 'rgba(0,0,0, .2)',
    marginHorizontal: 5
  },
  playerHand: {
    flex: 0.4,
    backgroundColor: 'rgba(255,0,0, .5)'
  },
  text: {},
  rowItem: {},
  receiving: {
    borderColor: 'red',
    borderWidth: 2
  },
  dragging: {
    opacity: 0
  },
  topSet: {
    width: 150,
    height: 80,
    backgroundColor: 'rgba(0,0,255,.2)',
    marginBottom: 10,
    borderRadius: 10
  },
  mid_bottom_Set: {
    width: 240,
    height: 80,
    backgroundColor: 'rgba(0, 255, 0,.5)',
    marginBottom: 10,
    borderRadius: 10
  },
  setArea: {
    height: 240,
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: 'center'
  },
  setAreaCard: {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,255,0,.5)'
  },
  cardSlot: {
    width: 40,
    height: 80
  },
  playerHandArea: {
    width: Dimensions.get('window').width,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  }
})
