import React from 'react'
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

  페이퍼
  <RedPaper name="공과" />
  <WhitePaper name="의학" />
*/

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
