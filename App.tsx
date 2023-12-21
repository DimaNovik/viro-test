/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere,
  ViroSpotLight,
  ViroQuad,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';

function App(): JSX.Element {
  const [data, setData] = useState({
    texture: 'white',
    playAnim: true,
    animateCar: true,
    tapWhite: false,
    tapBlue: false,
    tapGrey: false,
    tapRed: false,
    tapYellow: false,
  });

  function _onAnchorFound() {
    setData({
      animateCar: true,
    });
  }
  function _toggleButtons() {
    setData({
      animName: data.animName == 'scaleUp' ? 'scaleDown' : 'scaleUp',
      playAnim: true,
    });
  }
  function _selectWhite() {
    setData({
      texture: 'white',
      tapWhite: true,
    });
  }
  function _selectBlue() {
    setData({
      texture: 'blue',
      tapBlue: true,
    });
  }
  function _selectGrey() {
    setData({
      texture: 'grey',
      tapGrey: true,
    });
  }
  function _selectRed() {
    setData({
      texture: 'red',
      tapRed: true,
    });
  }
  function _selectYellow() {
    setData({
      texture: 'yellow',
      tapYellow: true,
    });
  }
  function _animateFinished() {
    setData({
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
    });
  }

  const InitialScene = () => {
    console.log(data);

    ViroMaterials.createMaterials({
      white: {
        lightingModel: 'PBR',
        diffuseTexture: require('./assets/img/tesla/object_car_main_Base_Color.png'),
        metalnessTexture: require('./assets/img/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('./assets/img/tesla/object_car_main_Roughness.png'),
      },
      blue: {
        lightingModel: 'PBR',
        diffuseTexture: require('./assets/img/tesla/object_car_main_Base_Color_blue.png'),
        metalnessTexture: require('./assets/img/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('./assets/img/tesla/object_car_main_Roughness.png'),
      },
      grey: {
        lightingModel: 'PBR',
        diffuseTexture: require('./assets/img/tesla/object_car_main_Base_Color_grey.png'),
        metalnessTexture: require('./assets/img/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('./assets/img/tesla/object_car_main_Roughness.png'),
      },
      red: {
        lightingModel: 'PBR',
        diffuseTexture: require('./assets/img/tesla/object_car_main_Base_Color_red.png'),
        metalnessTexture: require('./assets/img/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('./assets/img/tesla/object_car_main_Roughness.png'),
      },
      yellow: {
        lightingModel: 'PBR',
        diffuseTexture: require('./assets/img/tesla/object_car_main_Base_Color_yellow.png'),
        metalnessTexture: require('./assets/img/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('./assets/img/tesla/object_car_main_Roughness.png'),
      },
      white_sphere: {
        lightingModel: 'PBR',
        diffuseColor: 'rgb(231,231,231)',
      },
      blue_sphere: {
        lightingModel: 'PBR',
        diffuseColor: 'rgb(19,42,143)',
      },
      grey_sphere: {
        lightingModel: 'PBR',
        diffuseColor: 'rgb(75,76,79)',
      },
      red_sphere: {
        lightingModel: 'PBR',
        diffuseColor: 'rgb(168,0,0)',
      },
      yellow_sphere: {
        lightingModel: 'PBR',
        diffuseColor: 'rgb(200,142,31)',
      },
    });

    ViroARTrackingTargets.createTargets({
      logo: {
        source: require('./assets/img/logo.png'),
        orientation: 'Up',
        physicalWidth: 0.165, // real world width in meters
      },
    });

    ViroAnimations.registerAnimations({
      scaleUp: {
        properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
        duration: 500,
        easing: 'bounce',
      },
      scaleDown: { properties: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 200 },
      scaleCar: {
        properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
        duration: 500,
        easing: 'bounce',
      },
      scaleSphereUp: {
        properties: { scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8 },
        duration: 50,
        easing: 'easeineaseout',
      },
      scaleSphereDown: {
        properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
        duration: 50,
        easing: 'easeineaseout',
      },
      tapAnimation: [['scaleSphereUp', 'scaleSphereDown']],
    });

    return (
      <ViroARScene>
        <ViroLightingEnvironment
          source={require('./assets/img/tesla/garage_1k.hdr')}
        />

        <ViroARImageMarker
          target={'logo'}
          onAnchorFound={_onAnchorFound}
          pauseUpdates={data.pauseUpdates}>
          <ViroNode
            scale={[0, 0, 0]}
            transformBehaviors={['billboardY']}
            animation={{ name: data.animName, run: data.playAnim }}>
            <ViroSphere
              materials={['white_sphere']}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[-0.2, 0.25, 0]}
              onClick={_selectWhite}
              animation={{
                name: 'tapAnimation',
                run: data.tapWhite,
                onFinish: _animateFinished,
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={['blue_sphere']}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[-0.1, 0.25, 0]}
              onClick={_selectBlue}
              animation={{
                name: 'tapAnimation',
                run: data.tapBlue,
                onFinish: _animateFinished,
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={['grey_sphere']}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0, 0.25, 0]}
              onClick={_selectGrey}
              animation={{
                name: 'tapAnimation',
                run: data.tapGrey,
                onFinish: _animateFinished,
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={['red_sphere']}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0.1, 0.25, 0]}
              onClick={_selectRed}
              animation={{
                name: 'tapAnimation',
                run: data.tapRed,
                onFinish: _animateFinished,
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={['yellow_sphere']}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0.2, 0.25, 0]}
              onClick={_selectYellow}
              animation={{
                name: 'tapAnimation',
                run: data.tapYellow,
                onFinish: _animateFinished,
              }}
              shadowCastingBitMask={0}
            />
          </ViroNode>

          <Viro3DObject
            scale={[0, 0, 0]}
            source={require('./assets/img/tesla/object_car.obj')}
            resources={[require('./assets/img/tesla/object_car.mtl')]}
            type="OBJ"
            materials={data.texture}
            onClick={_toggleButtons}
            animation={{ name: 'scaleCar', run: data.animateCar }}
          />

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={0.7}
          />

          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={2.5}
            height={2.5}
            arShadowReceiver={true}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <ViroARSceneNavigator
        initialScene={{ scene: InitialScene }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Verdana',
    fontSize: 50,
    color: 'yellow',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
