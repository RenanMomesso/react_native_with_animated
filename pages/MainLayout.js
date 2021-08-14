import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { setSelectedTab } from "../stores/tab/tabActions";
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  dummyData,
  theme,
  images,
  constants,
} from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components";
import LinearGradient from "react-native-linear-gradient";
import Home from "./Home";
import TabButton from "../components/TabIcons";
import Search from "./Search";
import Notification from "./Notification";
import Favourite from "./Favourite";
import Cart from "./Cart";

const MainLayout = ({ drawerAnimationStyle, navigation }) => {
  const selectedTab = useSelector((state) => state.tabReducer.selectedTab);
  const dispatch = useDispatch();

  const flatlistRef = useRef();

  // REANIMATED SHARED VALUE

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);
  const favoriteTabFlex = useSharedValue(1);
  const favoriteTabColor = useSharedValue(COLORS.white);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  const testHomeTextColor = useSharedValue("white");

  const homeTestTextColor = useAnimatedStyle(() => {
    return {
      color: testHomeTextColor.value,
    };
  });

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });

  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });

  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favoriteTabFlex.value,
    };
  });

  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favoriteTabColor.value,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });

  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    };
  });

  useEffect(() => {
    dispatch(setSelectedTab(constants.screens.home));
  }, []);

  useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatlistRef?.current.scrollToIndex({
        index: 0,
        animated: false,
      });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      testHomeTextColor.value = withTiming("red", { duration: 1000 });
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }

    if (selectedTab == constants.screens.search) {
      flatlistRef?.current.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }

    if (selectedTab == constants.screens.cart) {
      flatlistRef?.current.scrollToIndex({
        index: 2,
        animated: false,
      });
      cartTabFlex.value = withTiming(4, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }

    if (selectedTab == constants.screens.favourite) {
      flatlistRef?.current.scrollToIndex({
        index: 3,
        animated: false,
      });
      favoriteTabFlex.value = withTiming(4, { duration: 500 });
      favoriteTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      favoriteTabFlex.value = withTiming(1, { duration: 500 });
      favoriteTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }

    if (selectedTab == constants.screens.notification) {
      flatlistRef?.current.scrollToIndex({
        index: 4,
        animated: false,
      });
      notificationTabFlex.value = withTiming(4, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }
  }, [selectedTab]);

  return (
    <Animated.View
      style={{
        flex: 1,

        backgroundColor: COLORS.white,
        ...drawerAnimationStyle,
      }}
    >
      {/* HEADER */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={dummyData?.myProfile?.profile_image}
              style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />
      {/* content */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          key={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.cart && <Cart />}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.favourite && <Favourite />}
                {item.label == constants.screens.notification && (
                  <Notification />
                )}
              </View>
            );
          }}
        />
      </View>

      {/* footer */}
      <View style={{ height: 100, alignItems: "center" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.gray]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 85,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            border:15,
            borderBottomLefttRadius:15,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            elevation:1,
          }}
        />
        <View
          style={{
            height: 50,
            marginTop: 40,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius:20,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab == constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            changeTextColor={homeTestTextColor}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.home));
            }}
          />
          <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab == constants.screens.search}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.search))}
          />
          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab == constants.screens.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.cart))}
          />
          <TabButton
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab == constants.screens.favourite}
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
            onPress={() =>
              dispatch(setSelectedTab(constants.screens.favourite))
            }
          />
          <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab == constants.screens.notification}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
            onPress={() =>
              dispatch(setSelectedTab(constants.screens.notification))
            }
          />
        </View>
      </View>
      {/* footer */}
    </Animated.View>
  );
};

export default MainLayout;
