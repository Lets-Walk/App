import Toast from 'react-native-toast-message'

const engToKor = (name) => {
  result = name.replace('Spade', '스페이드')
  result = result.replace('Clover', '클로버')
  result = result.replace('Diamond', '다이아몬드')
  result = result.replace('Heart', '하트')

  return result
}

const showToast = ({ type, logo, userName, item }) => {
  Toast.show({
    type: type,
    position: 'bottom',
    props: {
      logo: logo,
      userName: userName,
      item: engToKor(item),
    },
    bottomOffset: 20,
  })
}

export default showToast
