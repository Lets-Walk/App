import Toast from 'react-native-toast-message'
import getItemType from './getItemType'

const engToKor = (name) => {
  result = name.replace('Spade', '스페이드')
  result = result.replace('Clover', '클로버')
  result = result.replace('Diamond', '다이아몬드')
  result = result.replace('Heart', '하트')

  return result
}

const getItemColor = (name) => {
  let color = 'black'
  if (getItemType(name) === 'Spade') {
    color = '#BBADFF'
  } else if (getItemType(name) === 'Clover') {
    color = '#606C38'
  } else if (getItemType(name) === 'Diamond') {
    color = '#468FAF'
  } else if (getItemType(name) === 'Heart') {
    color = '#E5989B'
  }
  return color
}

const showToast = ({ type, logo, userName = '', item = '' }) => {
  Toast.show({
    type: type,
    position: 'bottom',
    props: {
      logo: logo,
      userName: userName,
      item: engToKor(item),
      itemColor: getItemColor(item),
    },
    bottomOffset: 20,
  })
}

export default showToast
