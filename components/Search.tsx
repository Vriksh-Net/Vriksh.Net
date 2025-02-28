import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  //! This function debounces the search input to avoid excessive API calls
  const debounceSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  //! This function handles changes to the search input field
  const handleSearch = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        
        {/*//todo Search icon */}
        <Image source={icons.search} 
        className="size-5" 
        />

        {/*//todo Search input field */}
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search task..."
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      {/*//todo Filter button */}
      <TouchableOpacity>
        {/* <Image source={icons.filter} className="size-5" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default Search;
