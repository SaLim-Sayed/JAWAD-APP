import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Menu, TextInput } from "react-native-paper";

type Option = { label: string; value: string };

interface PaperSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (val: string) => void;
}

const PaperSelect: React.FC<PaperSelectProps> = ({ label, value, options, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TextInput
            mode="outlined"
            label={label}
            value={options.find((o) => o.value === value)?.label || ""}
             editable={false}
          />
        }
      >
        {options.map((opt) => (
          <Menu.Item
            key={opt.value}
            onPress={() => {
              onChange(opt.value);
              setVisible(false);
            }}
            title={opt.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
});

export default PaperSelect;
