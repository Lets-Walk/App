import React from 'react'
import {
  Computer,
  Pencil,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  RedPaper,
  BluePaper,
  WhitePaper,
} from '../icons'

const maapingIcon = {
  Pencil,
  Computer,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  공과대학: RedPaper,
  자연과학대학: RedPaper,
  인문대학: BluePaper,
  경영대학: BluePaper,
  의과대학: WhitePaper,
  약학대학: WhitePaper,
}

const IconComponent = (props) => {
  const Icon = maapingIcon[props.name]
  return <Icon {...props}/>
}

export default IconComponent
