import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icons } from "@/constants";
import { t } from "@/lib";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = t("Global.search") }) => (
  <View style={styles.container}>
    <Icons.search color="#999" width={20} height={20} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#684735"
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
      autoCorrect={false}
      autoCapitalize="none"
      clearButtonMode="while-editing"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7B299", // brownColor-300
     paddingHorizontal: 16,
    height: 44,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
     justifyContent: "center"
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#684735",
    paddingLeft: 8,
    paddingVertical: 0,
    backgroundColor: "transparent"
  }
});

export default SearchInput;