import React from 'react'
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native'
import OnBoard from 'react-native-onboarding-swiper'

const OnBoarding = ({ navigation }) => {
  const BACKGROUND_COLOR = '#ffffff'

  return (
    <OnBoard
      pages={[
        {
          backgroundColor: '#ffffff',
          image: (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/welcome_icon.png')}
                style={styles.logoImage}
              />
            </View>
          ),
          title: '워크투게더에 오신 것을 환영합니다!',
          subtitle:
            '워크투게더는 대학교 공식 이메일 계정을 가지고\n계신 분이라면 누구나 무료로 이용가능합니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/home.png')}
                style={[styles.image, { aspectRatio: 1751 / 2010 }]}
              />
            </View>
          ),
          title: '홈(Home)',
          subtitle:
            '홈 화면에서는 내 정보, 나의 걸음수, 배틀 결과를\n한눈에 확인하실 수 있습니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/matching.png')}
                style={[styles.image]}
              />
            </View>
          ),
          title: '크루 매칭(Crew Matching)',
          subtitle:
            "'매칭 시작'을 누르면 '나'와 배틀에 참여할 같은 학교\n학생들과 크루 매칭을 시작합니다.(본인 포함 4명)",
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/battlematching.png')}
                style={[styles.image, { aspectRatio: 1612 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 매칭(Battle Matching)',
          subtitle:
            '크루 매칭이 완료되면 나의 크루와 배틀을 할\n다른 학교의 크루와 배틀을 매칭합니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/battle.png')}
                style={[styles.image, { aspectRatio: 1612 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드(Battle Mode)',
          subtitle:
            '배틀 매칭이 완료되면 배틀이 시작됩니다.\n 지도 화면으로 전환되며 잠시 후 미션이 시작됩니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_now_mission.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-1. 현재 진행중인 미션',
          subtitle:
            '현재 진행중인 미션 내용을 확인할 수 있습니다.\n 미션은 배틀의 승부가 날 때까지 계속 주어집니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_item.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-2. 아이템',
          subtitle:
            '미션을 위해 획득해야 할 아이템입니다.\n50m 이내로 접근해서 터치하면 획득할 수 있습니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_inventory.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-3. 인벤토리',
          subtitle:
            '획득한 아이템들을 볼 수 있습니다.\n인벤토리는 크루원들간에 실시간으로 공유됩니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_chatting.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-4. 채팅',
          subtitle:
            '크루원들과 채팅을 주고받을 수 있습니다.\n크루원들과 미션을 위한 전략을 세워보세요.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_life.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-5. 라이프',
          subtitle:
            '미션을 상대보다 빨리 성공 못하면 하나씩 차감됩니다.\n먼저 모두 소진되는 크루는 배틀에서 패배하게 됩니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/intro_mission.png')}
                style={[styles.image, { aspectRatio: 1630 / 2010 }]}
              />
            </View>
          ),
          title: '배틀 모드-6. 현재 시작된 미션 내용',
          subtitle:
            '한 미션이 종료되면 새로운 미션이 주어집니다.\n이때, 주변 아이템들과 인벤토리는 초기화됩니다.',
        },
        {
          backgroundColor: BACKGROUND_COLOR,
          image: (
            <View style={styles.imageBg}>
              <Image
                source={require('../../assets/images/ranking.png')}
                style={[styles.image, { aspectRatio: 1612 / 2010 }]}
              />
            </View>
          ),
          title: '랭킹(Ranking)',
          subtitle:
            '실시간으로 대학들의 랭킹을 확인할 수 있습니다.\n화살표를 누르면 유저들의 기여도를 확인할 수 있습니다.',
        },
        {
          backgroundColor: '#FFFFFF',
          image: (
            <Image
              source={require('../../assets/images/start.png')}
              style={[styles.image, { aspectRatio: 1613 / 2010 }]}
            />
          ),
          title: '',
          subtitle: '',
        },
      ]}
      titleStyles={styles.titleText}
      subTitleStyles={styles.subtitleText}
      imageContainerStyles={styles.imageContainer}
      bottomBarColor={'#ffffff'}
      SkipButtonComponent={({ ...props }) => (
        <Pressable
          {...props}
          style={{
            width: '70%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: '#37688B' }}>Skip</Text>
        </Pressable>
      )}
      DotComponent={({ selected }) => (
        <View
          style={{
            width: 6,
            height: 6,
            marginHorizontal: 3,
            borderRadius: 6,
            backgroundColor: selected ? '#37688B' : 'gray',
          }}
        ></View>
      )}
      NextButtonComponent={({ ...props }) => (
        <Pressable
          {...props}
          style={{
            width: '80%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: '#293241' }}>Next</Text>
        </Pressable>
      )}
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
    />
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 23,
    fontFamily: 'ONEMobileBold',
  },
  subtitleText: {
    fontFamily: 'ONEMobileRegular',
  },
  logoImage: {
    width: 250,
    height: 250,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageBg: {
    width: '80%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
