import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { api } from "@frosh/backend/convex/_generated/api";
import { useQuery } from "convex/react";

const CoursesDashboardScreen = ({ navigation }) => {
  const user = useUser();
  const imageUrl = user?.user?.imageUrl;
  const firstName = user?.user?.firstName;

  const allCourses = useQuery(api.courses.getCourses);
  const [search, setSearch] = useState("");

  const finalCourses = search
    ? allCourses?.filter(
        (course) =>
          course.name.toLowerCase().includes(search.toLowerCase()) ||
          course.code.toLowerCase().includes(search.toLowerCase()) ||
          course.instructor.toLowerCase().includes(search.toLowerCase()),
      )
    : allCourses;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("InsideCourseScreen", {
          item: item,
        })
      }
      activeOpacity={0.5}
      style={styles.courseItem}
    >
      <View>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.courseDetails}>
          {item.code} • {item.instructor} • {item.credits} credits
        </Text>
        <Text style={styles.courseSemester}>
          {item.semester} {item.year}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo2small.png")} // Replace with your logo image file
          style={styles.logo}
        />
      </View>

      <View style={styles.yourCoursesContainer}>
        {/* @ts-ignore, for css purposes */}
        <Image style={styles.avatarSmall} />
        <Text style={styles.title}>Your Courses</Text>
        {imageUrl ? (
          <Image style={styles.avatarSmall} source={{ uri: imageUrl }} />
        ) : (
          <Text>{firstName ? firstName : ""}</Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search courses..."
          style={styles.searchInput}
        />
      </View>
      {!finalCourses || finalCourses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Add your first course to{"\n"}get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={finalCourses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.coursesList}
          contentContainerStyle={{
            marginTop: 19,
            borderTopWidth: 0.5,
            borderTopColor: "rgba(0, 0, 0, 0.59)",
          }}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateCourseScreen")}
        style={styles.newCourseButton}
      >
        <AntDesign name="pluscircle" size={20} color="#fff" />
        <Text style={styles.newCourseButtonText}>Add New Course</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0D87E1",
    height: 67,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: RFValue(17.5),
    fontFamily: "MMedium",
    alignSelf: "center",
  },
  yourCoursesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    marginTop: 19,
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: RFValue(15),
    fontFamily: "MRegular",
    color: "#2D2D2D",
  },
  coursesList: {
    flex: 1,
  },
  courseItem: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.59)",
    backgroundColor: "#F9FAFB",
  },
  courseName: {
    fontSize: 16,
    fontFamily: "MMedium",
    color: "#2D2D2D",
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 14,
    fontFamily: "MLight",
    color: "#6B7280",
    marginBottom: 2,
  },
  courseSemester: {
    fontSize: 12,
    fontFamily: "MLight",
    color: "#6B7280",
  },

  newCourseButton: {
    flexDirection: "row",
    backgroundColor: "#0D87E1",
    borderRadius: 7,
    width: Dimensions.get("window").width / 1.6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    position: "absolute",
    bottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  newCourseButtonText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "MMedium",
    marginLeft: 10,
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  emptyStateText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: RFValue(15),
    color: "grey",
    fontFamily: "MLight",
  },
  emptyState: {
    width: "100%",
    height: "35%",
    marginTop: 19,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.59)",
  },
});

export default CoursesDashboardScreen;
