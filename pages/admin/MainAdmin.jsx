import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageAdmin from "./HomePageAdmin";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import axios from "axios";
import BASE_API_URL from "../../constant/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubsPage from "./SubsPage";
import ListKelas from "./ListKelas";

const MainAdmin = () => {
  const Tab = createBottomTabNavigator();
  const [subsData, setsubsData] = useState([]);

  const getSubsData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_API_URL}admin-sekolah`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setsubsData(response.data.data);
      console.log('ini subs dat',subsData);
    } catch (error) {
      console.log('ini subs data',subsData);
    }
  };
  useEffect(() => {
    getSubsData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {subsData.length === 0 ? (
        <SubsPage />
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="ListKelas"
            component={ListKelas}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({}) => (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="HomePageAdmin"
            component={HomePageAdmin}
            options={{
              headerShown: false,
              tabBarLabel: "Link",
              tabBarIcon: ({}) => (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};

export default MainAdmin;
