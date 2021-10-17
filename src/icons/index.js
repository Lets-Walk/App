import React from 'react'
import IconContainer from './IconConatiner'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { View, Text } from 'react-native'

const IconStyle = {
  transform: [{ rotate: '-135deg' }],
}

/*
  Icon 사용 Example.

  1. 아이템
  <Computer bgSize='small' size={20} />
  <Pencil bgSize='normal' size={25} />
  <Book bgSize='large' size={30} />

  2. 연구실
  <Lab size={40}/>

  3. 페이퍼
  <RedPaper name="공과" />
  <WhitePaper name="의학" />
*/

export const Pencil = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#F8EA8C" borderColor="black" size={bgSize}>
      <AwesomeIcon
        style={IconStyle}
        name="pencil-alt"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Computer = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#4CD7D0" borderColor="black" size={bgSize}>
      <MaterialIcon
        style={IconStyle}
        name="computer"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Book = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#E1C340" borderColor="black" size={bgSize}>
      <EntypoIcon style={IconStyle} name="book" size={size} color="black" />
    </IconContainer>
  )
}

export const Calculator = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#868B8E" borderColor="black" size={bgSize}>
      <AwesomeIcon
        style={IconStyle}
        name="calculator"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Stethoscope = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#E7D2CC" borderColor="black" size={bgSize}>
      <AwesomeIcon
        style={IconStyle}
        name="stethoscope"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Pill = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#FFA384" borderColor="black" size={bgSize}>
      <MaterialCommunityIcon
        style={IconStyle}
        name="pill"
        size={size}
        color="black"
      />
    </IconContainer>
  )
}

export const Microscope = ({ bgSize = 'normal', size = 38 }) => {
  return (
    <IconContainer backgroundColor="#81B622" borderColor="black" size={bgSize}>
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

const PaperContainer = ({ color, size, name, width, height }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: width,
        height: height,
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AwesomeIcon name="scroll" size={size} color="white" />
          {name ? (
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {name}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  )
}

export const RedPaper = ({ name, size = 35, width = 70, height = 60 }) => {
  return (
    <PaperContainer
      color="#AA1945"
      name={name}
      size={size}
      width={width}
      height={height}
    />
  )
}

export const BluePaper = ({ name, size = 35, width = 70, height = 60 }) => {
  return (
    <PaperContainer
      color="#059DC0"
      name={name}
      size={size}
      width={width}
      height={height}
    />
  )
}

export const WhitePaper = ({ name, size = 35, width = 70, height = 60 }) => {
  return (
    <PaperContainer
      color="#868B8E"
      name={name}
      size={size}
      width={width}
      height={height}
    />
  )
}
