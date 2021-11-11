import React from 'react'
import {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhose,
  Misson,
} from '../../assets/images'

const maapingImage = {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhose,
  Misson,
}

const getMissonImage = (name) => {
  return maapingImage[name]
}

export default getMissonImage
