import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CustomButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonStyle}>
      <Image
        source={imgUrl}
        resizeMode="cover"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buttonStyle: {
    // backgroundColor: 'black'
  }
})
