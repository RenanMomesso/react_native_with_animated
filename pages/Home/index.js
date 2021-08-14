import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import {
  SIZES,
  COLORS,
  FONTS,
  dummyData,
  icons,
  images,
  theme,
} from "../../constants";
import { HorizontalFoodCard, VerticalFoodCard } from "../../components";
import FilterModal from "./FilterModal";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* header; */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
          >
            Show All
          </Text>
        </TouchableOpacity>
      </View>
      {/* content; */}
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [popular, setPopular] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    handleChangeCategory(selectedCategory, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    // Retrive the Popular menu
    let selectedPopular = dummyData.menu.find((a) => a.name == "Popular");

    setPopular(
      selectedPopular?.list.filter((item) =>
        item.categories.includes(categoryId)
      )
    );

    // Retrive the commended menu
    let selectedRecommend = dummyData.menu.find((a) => a.name == "Recommended");

    // Find the menu based on the category
    let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId);

    // set the recommended menu based on the categoryId
    setRecommends(
      selectedRecommend?.list.filter((a) => a.categories.includes(categoryId))
    );

    // Set the menu based on the category
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* icons */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        {/* Text Input */}
        <TextInput
          placeholder="Search food..."
          style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}
        />
        {/* Filter Button */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{ height: 20, width: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          marginBottom: 30,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index == dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategory(selectedMenuType, item.id);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}{" "}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderRecommendedSection() {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log("Show All Recomended")}
      >
        <FlatList
          data={recommends}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  with: SIZES.width * 0.85,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  padding: 18,
                  marginRight:
                    index == recommends.length - 1 ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: "center",
                }}
                imageStyle={{
                  marginTop: 35,
                  height: 150,
                  width: 150,
                }}
                item={item}
                onPress={() => console.log("Horizontal Food Card")}
              />
            );
          }}
        />
      </Section>
    );
  }

  function renderPopularSection() {
    return (
      <Section
        title="Popular near you"
        onPress={() => console.log("Show all popular items")}
      >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  padding: 13,
                  marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() => console.log("Vertical Food Card")}
              />
            );
          }}
        />
      </Section>
    );
  }

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: 55,
                marginTop: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategory == item.id
                    ? COLORS.primary
                    : COLORS.lightGray2,
              }}
              onPress={() => {
                setSelectedCategory(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}
            >
              <Image
                source={item.icon}
                style={{ marginTop: 5, height: 50, width: 50 }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginRight: SIZES.base,
                  color:
                    selectedCategory == item.id
                      ? COLORS.white
                      : COLORS.darkGray,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{dummyData?.myProfile?.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Search */}
      {renderSearch()}

      {/* Filter */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* list */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery To */}
            {renderDeliveryTo()}
            {/* Food categories */}
            {renderFoodCategories()}
            {/* renderpopularSection */}
            {renderPopularSection()}
            {/* recommends */}
            {renderRecommendedSection()}
            {/* menuType */}
            {renderMenuTypes()}
          </View>
        }
        ListFooterComponent={<View style={{ height: 200 }}></View>}
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 100,
              }}
              item={item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
