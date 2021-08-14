import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert
} from "react-native";
import {
  IconButton,
  TextButton,
  TextButtonIcon as TextIconButton,
} from "../../components";
import TwoPointerSlider from "../../components/TwoPointerSlider";
import { COLORS, FONTS, constants, icons, SIZES } from "../../constants";
import InputRange from "../../components/Inputrange";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3 }}> {title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({ isVisible, onClose }) => {
  const modalAnimationValue = useRef(new Animated.Value(0)).current;

  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [ratings, setRatings] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);


  function handleBackButtonClick() {

alert("ok")
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  const modalY = modalAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  function renderDistance() {
    return (
      <Section title="Distance">
        <View style={{ alignItems: "center" }}>
          <TwoPointerSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    );
  }

  function renderDeliveryTime() {
    return (
      <Section title="Delivery Time" containerStyle={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery_time-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  width: "30%",
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => setDeliveryTime(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  const renderPriceRange = () => {
    return (
      <Section title="Pricing Range">
        <View style={{ alignItems: "center" }}>
          <TwoPointerSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix="$"
            postfix=""
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    );
  };

  const renderRatings = () => {
    return (
      <Section title="Ratings" containerStyle={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {constants.ratings.map((item, index) => {
            return (
              <TextIconButton
                key={`Ratings-${index}`}
                containerStyle={{
                  flex: 1,
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                }}
                label={item.label}
                labelStyle={{
                  color: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                icon={icons.star}
                iconStyle={{
                  tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                onPress={() => setRatings(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  const renderTags = () => {
    return (
      <Section title="Tags">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {constants.tags.map((item, index) => {
            return (
              <TextButton
                key={`Tags-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == tags ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  height: 50,
                  margin: 5,
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == tags ? COLORS.primary : COLORS.lightGray2,
                }}
                onPress={() => setTags(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        <TouchableWithoutFeedback
          style={{ borderWidth: 1, borderColor: "white" }}
          onPress={() => setShowFilterModal(false)}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Header; */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter your search
            </Text>

            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            {/* Distance */}
            {renderDistance()}
            <View style={{ marginTop: 50, marginBottom: 20 }}>
              <InputRange
                minValue={0}
                maxvalue={100}
                onChangeMin={(v) => console.log(v)}
                onChangeMax={(v) => console.log(v)}
              />
            </View>
            {/* DeliveryTime */}
            {renderDeliveryTime()}

            {/* Pricing Range */}
            {renderPriceRange()}

            {/* renderRatings() */}
            {renderRatings()}

            {/* renderTags */}
            {renderTags()}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              label="Apply Filters"
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log("Apply filters")}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
