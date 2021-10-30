import React from 'react'
import {
  Computer,
  Pencil,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  WLab,
  BLab,
  RLab,
} from '../../assets/icons/index'

const maapingIcon = {
  Pencil: Pencil,
  Computer: Computer,
  Microscope: Microscope,
  Book: Book,
  Calculator: Calculator,
  Stethoscope: Stethoscope,
  Pill: Pill,
  공과: RLab,
  자연과학: RLab,
  인문: BLab,
  경영: BLab,
  의과: WLab,
  약학: WLab,
}

const ImageComponent = (name) => {
  return maapingIcon[name]
}

export default ImageComponent
