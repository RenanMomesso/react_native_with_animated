import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated as AnimatedRN,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import MainLayout from "../pages/MainLayout";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
  images,
  theme,
} from "../constants";
import Animated from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: SIZES.base,
        alignItems: "center",
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null
      }}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: COLORS.white }}
      />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation, selectedTab }) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{ height: 35, width: 35, tintColor: COLORS.white }}
            />
          </TouchableOpacity>

          {/* PROFILE */}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              alignItems: "center",
            }}
            onPress={() => console.log("PROFILE")}
          >
            <Image
              source={dummyData?.myProfile?.profile_image}
              style={{ width: 50, height: 50, borderRadius: SIZES.radius }}
            />
            <View style={{ marginLeft: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                RenanProgramming
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                View your profile
              </Text>
            </View>
          </TouchableOpacity>

          {/* DRAWER ITENS */}

          <View style={{ flex: 1, marginTop: SIZES.padding }}>
            <CustomDrawerItem
              label={constants.screens.home}
              icon={icons.home}
              isFocused={selectedTab == constants.screens.home}
              onPress={() => {
                dispatch(setSelectedTab(constants.screens.home))
                navigation.navigate("MainLayout")
              }}
            />
            <CustomDrawerItem
              label={constants.screens.myWallet}
              icon={icons.wallet}
              isFocused={selectedTab == constants.screens.myWallet}
              onPress={() => {
                dispatch(setSelectedTab(constants.screens.myWallet))
                navigation.navigate("MainLayout")
              }}
            />
            <CustomDrawerItem
              label={constants.screens.notification}
              icon={icons.notification}
              isFocused={selectedTab == constants.screens.notification}
              onPress={() => {
                dispatch(setSelectedTab(constants.screens.notification))
                navigation.navigate("MainLayout")
              }}
            />
            <CustomDrawerItem
              label={constants.screens.favourite}
              icon={icons.favourite}
              isFocused={selectedTab == constants.screens.favourite}
              onPress={() => {
                dispatch(setSelectedTab(constants.screens.favourite))
                navigation.navigate("MainLayout")
              }}
            />

            <View
              style={{
                height: 1,
                marginVertical: SIZES.radius,
                marginLeft: SIZES.radius,
                backgroundColor: COLORS.lightGray1,
              }}
            />
            <CustomDrawerItem
              label={"Track your Order"}
              icon={icons.location}
            />
            <CustomDrawerItem label={"Coupons"} icon={icons.coupon} />
            <CustomDrawerItem label={"Settings"} icon={icons.setting} />
            <CustomDrawerItem label={"Invite a friend"} icon={icons.profile} />
            <CustomDrawerItem label={"Help a friend"} icon={icons.help} />
          </View>
        </View>
        <View
          style={{
            marginBottom: SIZES.padding,
            position: "absolute",
            bottom: 0,
            marginLeft: SIZES.radius + 5,
          }}
        >
          <CustomDrawerItem label="logout" icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const selectedTab = useSelector((state) => state.tabReducer.selectedTab);

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.83],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const drawerAnimation = { borderRadius, transform: [{ scale }] };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        initialRouteName="transparent"
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: "65%",
          paddingRight: 20,
          backgroundColor: "transparent",
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return <CustomDrawerContent {...props} selectedTab={selectedTab} />;
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={drawerAnimation} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
