import React from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import Animated from "react-native-reanimated";
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    dummyData,
    theme,
    images,
    constants,
  } from '../../constants'

const TabButton = (props) => {
  const { isFocused, label, icon, outerContainerStyle, innerContainerStyle } =
    props;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Animated.View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
          },
          outerContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}
        >
          <Image
            source={icon}
            style={{
              width: 22,
              height: 22,
              tintColor: isFocused ? COLORS.white : COLORS.gray,
            }}
          />
          {isFocused && (
            <Animated.Text
              numberOfLines={1}
              style={[
                {
                  marginLeft: SIZES.base,
                  color: isFocused ? COLORS.white : COLORS.gray,
                  ...FONTS.h3,
                },
              ]}
            >
              {label}
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TabButton;