import React, { Component } from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';

import PropTypes from 'prop-types';

class Item extends Component {
  static defaultProps = {
    switchOn: false,
    onPress: () => {},
    containerStyle: {
      width: 72,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgb(227,227,227)',
      padding: 3,
    },
    circleStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'white', // rgb(102,134,205)
    },
    backgroundColorOn: 'rgb(227,227,227)',
    backgroundColorOff: 'rgb(215,215,215)',
    circleColorOff: 'white',
    circleColorOn: 'rgb(102,134,205)',
    duration: 300,
  };

  static propTypes = {
    switchOn: PropTypes.boolean,
    onPress: PropTypes.func,
    containerStyle: PropTypes.any,
    circleStyle: PropTypes.any,
    backgroundColorOff: PropTypes.string,
    backgroundColorOn: PropTypes.string,
    circleColorOff: PropTypes.string,
    circleColorOn: PropTypes.string,
    duration: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      circlePosXStart: 0,
      circlePosXEnd: this.props.containerStyle.width - (this.props.circleStyle.width + this.props.containerStyle.padding * 2),
      animXValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.5}
      >
        <Animated.View
          style={[
            styles.container,
            this.props.containerStyle,
            {
              backgroundColor: this.state.animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.backgroundColorOff, this.props.backgroundColorOn],
              }),
            },
          ]}
        >
          <Animated.View
            style={[
              this.props.circleStyle,
              {
                backgroundColor: this.state.animXValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.circleColorOff, this.props.circleColorOn],
                }),
              },
              {
                transform: [
                  {
                    translateX: this.state.animXValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [this.state.circlePosXStart, this.state.circlePosXEnd],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  onPress = () => {
    this.runAnimation();
    this.props.onPress();
  }

  runAnimation = () => {
    // this.state.anim.setValue(0);
    const animValue: any = {
      fromValue: this.props.switchOn ? 1 : 0,
      toValue: this.props.switchOn ? 0 : 1,
      duration: this.props.duration,
    };
    Animated.timing(this.state.animXValue, animValue).start();
    // Animated.timing(this.state.anim, animValue).start(() => this.runAnimation());
  }
}

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Item;
