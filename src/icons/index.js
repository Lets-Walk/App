import React from 'react'
import IconContainer from './IconConatiner'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { View, Text } from 'react-native'
import IconBadge from '../components/IconBadge'

const rotate = {
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

export const Pencil = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#F8EA8C" bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name="pencil-alt"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Computer = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#4CD7D0" bgSize={bgSize}>
        <MaterialIcon
          style={rotate}
          name="computer"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Book = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#E1C340" bgSize={bgSize}>
        <EntypoIcon style={rotate} name="book" size={iconSize} color="black" />
      </IconContainer>
    </>
  )
}

export const Calculator = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#868B8E" bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name="calculator"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Stethoscope = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#E7D2CC" bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name="stethoscope"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Pill = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#FFA384" bgSize={bgSize}>
        <MaterialCommunityIcon
          style={rotate}
          name="pill"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Microscope = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor="#81B622" bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name="microscope"
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
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

const PaperContainer = ({ color, iconSize, name, text, width, height }) => {
  name = name.replace('대학', '')
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
          borderRadius: 10,
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
          <AwesomeIcon name="scroll" size={iconSize} color="white" />
          {text ? (
            <Text
              style={{
                fontSize: 12,
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

export const RedPaper = ({ badge, name, text, iconSize = 25, bgSize = 70 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <PaperContainer
        color="#AA1945"
        name={name}
        iconSize={iconSize}
        width={bgSize}
        height={bgSize - 10}
        text={text}
      />
    </>
  )
}

export const BluePaper = ({
  badge,
  name,
  text,
  iconSize = 25,
  bgSize = 70,
}) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <PaperContainer
        color="#059DC0"
        name={name}
        iconSize={iconSize}
        width={bgSize}
        height={bgSize - 10}
        text={text}
      />
    </>
  )
}

export const WhitePaper = ({
  badge,
  name,
  text,
  iconSize = 25,
  bgSize = 70,
}) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <PaperContainer
        color="#868B8E"
        name={name}
        iconSize={iconSize}
        width={bgSize}
        height={bgSize - 10}
        text={text}
      />
    </>
  )
}
