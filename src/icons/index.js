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
import { COLORS, ICONS } from '../constants/walkingmode'

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
      <IconContainer backgroundColor={COLORS.PENCIL} bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name={ICONS.PENCIL}
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
      <IconContainer backgroundColor={COLORS.COMPUTER} bgSize={bgSize}>
        <MaterialIcon
          style={rotate}
          name={ICONS.COMPUTER}
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
      <IconContainer backgroundColor={COLORS.BOOK} bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name={ICONS.BOOK}
          size={iconSize}
          color="black"
        />
      </IconContainer>
    </>
  )
}

export const Calculator = ({ badge, bgSize = 50, iconSize = 38 }) => {
  return (
    <>
      {badge ? <IconBadge num={badge} /> : <></>}
      <IconContainer backgroundColor={COLORS.CALCULATOR} bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name={ICONS.CALCULATOR}
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
      <IconContainer backgroundColor={COLORS.STETHOSCOPE} bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name={ICONS.STETHOSCOPE}
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
      <IconContainer backgroundColor={COLORS.PILL} bgSize={bgSize}>
        <MaterialCommunityIcon
          style={rotate}
          name={ICONS.PILL}
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
      <IconContainer backgroundColor={COLORS.MICROSCOPE} bgSize={bgSize}>
        <AwesomeIcon
          style={rotate}
          name={ICONS.MICROSCOPE}
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
        backgroundColor: COLORS.LAB,
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
          name={ICONS.LAB}
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
          <AwesomeIcon name={ICONS.PAPER} size={iconSize} color="white" />
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
        color={COLORS.REDPAPER}
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
        color={COLORS.BLUEPAPER}
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
        color={COLORS.WHITEPAPER}
        name={name}
        iconSize={iconSize}
        width={bgSize}
        height={bgSize - 10}
        text={text}
      />
    </>
  )
}
