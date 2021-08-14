import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLORS, FONTS, SIZES } from "../constants";

const TwoPointerSlider = ({
  values,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={SIZES.width - SIZES.padding * 2 - 20}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: COLORS.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={10}
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: COLORS.white,
                backgroundColor: COLORS.primary,
                ...styles.shadow,
              }}
            >
              <Text
                style={{
                  marginTop: 25,
                  color: COLORS.darkGray,
                  fontSize: 12,
                  width: 35,
                }}
              >
                {prefix}
                {e.currentValue} {postfix}
              </Text>
            </View>
          </View>
        );
      }}
      onValuesChange={(values) => onValuesChange(values)}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default TwoPointerSlider;
