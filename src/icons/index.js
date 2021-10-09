import React from 'react'
import IconContainer from './IconConatiner'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'

const IconStyle = {
  transform: [{ rotate: '-135deg' }],
}

export const Pencil = ({ size }) => {
  return (
    <IconContainer backgroundColor="#F8EA8C" borderColor="black">
      <AwesomeIcon
        style={IconStyle}
        name="pencil-alt"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Computer = ({ size }) => {
  return (
    <IconContainer backgroundColor="#4CD7D0" borderColor="black">
      <MaterialIcon
        style={IconStyle}
        name="computer"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Book = ({ size }) => {
  return (
    <IconContainer backgroundColor="#E1C340" borderColor="black">
      <EntypoIcon style={IconStyle} name="book" size={size} color="black" />
    </IconContainer>
  )
}

export const Calculator = ({ size }) => {
  return (
    <IconContainer backgroundColor="#868B8E" borderColor="black">
      <AwesomeIcon
        style={IconStyle}
        name="calculator"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Stethoscope = ({ size }) => {
  return (
    <IconContainer backgroundColor="#E7D2CC" borderColor="black">
      <AwesomeIcon
        style={IconStyle}
        name="stethoscope"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Pill = ({ size }) => {
  return (
    <IconContainer backgroundColor="#FFA384" borderColor="black">
      <MaterialCommunityIcon
        style={IconStyle}
        name="pill"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Microscope = ({ size }) => {
  return (
    <IconContainer backgroundColor="#81B622" borderColor="black">
      <AwesomeIcon
        style={IconStyle}
        name="microscope"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Lab = ({ size }) => {
  return (
    <View
      style={{
        backgroundColor: '#122620',
        borderBottomStartRadius: 100,
        borderBottomEndRadius: 100,
        borderTopLeftRadius: 100,
        transform: [{ rotate: '135deg' }],
        width: '20%',
        height: '12%',
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: '80%',
          height: '80%',
          borderBottomStartRadius: 100,
          borderBottomEndRadius: 100,
          borderTopLeftRadius: 100,
          backgroundColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AwesomeIcon
          style={{
            transform: [{ rotate: '-135deg' }],
          }}
          name="award"
          size={size}
          color="#122620"
        />
      </View>
    </View>
  )
}

const PaperContainer = ({ color, size }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: '20%',
        height: '12%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          borderRadius: 15,
          width: '90%',
          height: '90%',
          borderWidth: 2,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AwesomeIcon name="scroll" size={size} color="white" />
      </View>
    </View>
  )
}

export const RedPaper = ({ size }) => {
  return <PaperContainer color="#AA1945" size={size} />
}

export const BluePaper = ({ size }) => {
  return <PaperContainer color="#059DC0" size={size} />
}

export const WhitePaper = ({ size }) => {
  return <PaperContainer color="#868B8E" size={size} />
}
