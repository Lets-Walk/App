import Toast from 'react-native-toast-message'

const engToKor = (name) => {
  result = name.replace('Spade', '스페이드')
  result = result.replace('Clover', '클로버')
  result = result.replace('Diamond', '다이아몬드')
  result = result.replace('Heart', '하트')

  return result
}

const getItemColor = (name) => {
  let color = 'black'
  if (name.indexOf('Spade') !== -1) {
    color = '#BBADFF'
  } else if (name.indexOf('Clover') !== -1) {
    color = '#606C38'
  } else if (name.indexOf('Diamond') !== -1) {
    color = '#468FAF'
  } else if (name.indexOf('Heart') !== -1) {
    color = '#E5989B'
  }
  return color
}

const showToast = ({ type, logo, userName, item }) => {
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
