import { fetchUrl } from "@/common/utils/fetch";
import { generateUUID } from "@/common/utils/uuid";
import { CrossIcon, TikIcon } from "@/components/svg";
import { bdixServerList } from "@/data";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  Linking,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { SafeAreaView } from "react-native-safe-area-context";

type ServerList = {
  id: string | number[];
  url: string;
  status: string;
};

const checkSiteAccessibility = async (url: string) => {
  try {
    const response = await fetchUrl(url);
    return response.status;
  } catch (error: any) {
    return false;
  }
};

const HomePage = () => {
  const [data, setData] = useState<{
    active: ServerList[];
    inactive: ServerList[];
    length: number;
  }>({
    active: [],
    inactive: [],
    length: 0,
  });

  const [urlStatus, setUrlStatus] = useState<string>("all");

  const handleStart = async () => {
    setData({
      active: [],
      inactive: [],
      length: 0,
    });

    for (let url of bdixServerList) {
      const status = (await checkSiteAccessibility(url))
        ? "Active"
        : "Inactive";

      const newData = {
        id: generateUUID(),
        url,
        status,
      };

      if (status === "Active") {
        setData((preState) => ({
          ...preState,
          active: [...preState.active, newData],
          length: preState.length + 1,
        }));
      } else {
        setData((preState) => ({
          ...preState,
          inactive: [...preState.inactive, newData],
          length: preState.length + 1,
        }));
      }
    }
  };

  const listData =
    urlStatus === "active"
      ? [...data.active]
      : urlStatus === "inactive"
      ? [...data.inactive]
      : [...data.active, ...data.inactive];

  return (
    <SafeAreaView>
      <StatusBar />
      <View className="relative h-full items-center space-y-5 bg-blue-50">
        <Text className="text-3xl font-bold text-center text-gray-800 pt-10">
          BDIX Server Tester
        </Text>
        <AnimatedCircularProgress
          size={200}
          width={30}
          fill={Math.floor((data.length / bdixServerList.length) * 100)}
          tintColor="#4ade80"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#1e3a8a"
          arcSweepAngle={300}
          rotation={210}
        >
          {(fill) => (
            <Text className="text-sm font-bold text-center text-gray-800">
              {`${data.length}/${bdixServerList.length}`}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Pressable
          className="bg-blue-900 w-1/2 py-2 rounded-full"
          onPress={handleStart}
        >
          <Text className="text-white text-center text-lg uppercase">
            Start
          </Text>
        </Pressable>

        <View className="flex-row justify-center items-center space-x-4">
          <Text className="text-sm font-bold text-gray-800">
            Active: {[...data.active].length}
          </Text>
          <Text className="text-sm font-bold text-gray-800">
            Inactive: {[...data.inactive].length}
          </Text>

          <View className="flex flex-row items-center space-x-2 h-8">
            <Text className="text-sm font-bold text-gray-800">Filter:</Text>
            <Picker
              selectedValue={urlStatus}
              onValueChange={(itemValue) => setUrlStatus(itemValue)}
              style={{ width: 140, color: "#1f2937" }}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Active" value="active" />
              <Picker.Item label="Inactive" value="inactive" />
            </Picker>
          </View>
        </View>

        <View className="flex flex-row bg-blue-900 -mb-5">
          <Text className="w-[70%] px-5 py-2 text-white">Server</Text>
          <Text className="w-[30%] px-5 py-2 text-white text-center">
            Status
          </Text>
        </View>

        {listData.length > 0 ? (
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View className="flex flex-row even:bg-gray-100">
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.url)}
                  className="w-[70%] px-5 py-2"
                >
                  <Text className="truncate">
                    {index + 1}. {item.url}
                  </Text>
                </TouchableOpacity>
                <View className="w-[30%] px-5 py-2 justify-center flex-row items-center">
                  {item.status === "Active" ? (
                    <TikIcon size={30} color="green" />
                  ) : (
                    <CrossIcon size={30} color="red" />
                  )}
                </View>
              </View>
            )}
          />
        ) : (
          <Text className="text-center text-2xl text-gray-800 font-bold">
            No data found!
          </Text>
        )}

        <View className="w-full bg-blue-900 py-4 fixed bottom-0 flex-row justify-center items-center space-x-2">
          <Text className="text-sm text-white">Made by ❤️</Text>
          <Text
            onPress={() =>
              Linking.openURL("https://www.facebook.com/ibnshayed")
            }
            className="text-blue-900 font-bold bg-white px-2 py-1 rounded-full"
          >
            Emran Ibn Shayed
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
