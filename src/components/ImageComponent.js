import React from 'react'
import {
  Computer,
  Pencil,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  Lab,
} from '../../assets/icons/index'

const maapingIcon = {
  Pencil: Pencil,
  Computer: Computer,
  Microscope: Microscope,
  Book: Book,
  Calculator: Calculator,
  Stethoscope: Stethoscope,
  Pill: Pill,
  공과: Lab,
  자연과학: Lab,
  인문: Lab,
  경영: Lab,
  의과: Lab,
  약학: Lab,
}

const ImageComponent = (name) => {
  return maapingIcon[name]
}

export default ImageComponent
