import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useEffect, useState } from 'react/cjs/react.development'
import { Life, Life_empty } from '../../assets/images'

const CampusLife = ({ campusName, life }) => {
  const logoUrl = 'https://ifh.cc/g/oSrubm.png'
  const LIFE = 3
  const [lifeXml, setLifeXml] = useState([])

  useEffect(() => {
    const xml = []
    for (let i = 1; i <= LIFE; i++) {
      if (i <= life) {
        xml.push(Life)
      } else {
        xml.push(Life_empty)
      }
    }
    setLifeXml(xml)
  }, [life])

  return (
    <View style={styles.infoBox}>
      <View style={styles.logoBox}>
        <Image source={{ uri: logoUrl }} style={styles.logoStyle} />
      </View>
      <View style={styles.nameLife}>
        <View style={styles.textBox}>
          <Text style={styles.campusName} numberOfLines={1}>
            {campusName}
          </Text>
        </View>
        <View style={styles.lifeStyle}>
          {lifeXml.map((xml, index) => (
            <SvgXml
              key={index}
              xml={xml}
              width={20}
              height={20}
              style={{ marginRight: 5 }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

export default CampusLife

const styles = StyleSheet.create({
  infoBox: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
  },
  logoBox: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  logoStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  nameLife: {
    flex: 4,
  },
  textBox: {
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  campusName: {
    fontSize: 20,
    fontFamily: 'BMHANNA_11yrs_ttf',
    color: '#505050',
  },
  lifeStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    left: 5,
  },
})
