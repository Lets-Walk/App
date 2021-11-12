import React from 'react'
import {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhose,
  Mission,
} from '../../assets/images'

const maapingImage = {
  Onepair,
  Twopair,
  Triple,
  Fourcard,
  Flush,
  Straight,
  Fullhose,
  Mission,
}

const getMissionImage = (name) => {
  return maapingImage[name]
}

export default getMissionImage
