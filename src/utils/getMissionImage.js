import React from 'react'
import {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhouse,
  Mission,
} from '../../assets/images'

const maapingImage = {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhouse,
  Mission,
}

const getMissionImage = (name) => {
  return maapingImage[name]
}

export default getMissionImage
