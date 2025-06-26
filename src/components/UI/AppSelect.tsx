import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, View, useWindowDimensions, I18nManager, ViewStyle } from 'react-native';
import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';

type SelectOption = {
  label: string;
  value: string;
  icon?: any; // You can type this to ImageSourcePropType if you want strict typing
};

interface SelectProps {
    label: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  dropdownWidth?: any;
  style?: ViewStyle;
}

const SelectOptionRow = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: any;
}) => (
  <Pressable
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    onPress={onPress}
    className="w-full py-2 px-3 flex-row gap-4 items-center justify-between rounded-lg"
  >
    <AppText className="text-lg text-brownColor-400 text-left">{label}</AppText>
    {icon && <Image source={icon} style={{ width: 16, height: 16 }} />}
  </Pressable>
);

const AppSelect: React.FC<SelectProps> = ({
    label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  buttonClassName = "",
  dropdownWidth = 120,
  style
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<View>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { width, height } = useWindowDimensions();

  const selectedOption = options.find(o => o.value === value);
  const isRTL = I18nManager.isRTL;

  // Open/close modal
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  // Handle select and close
  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // Measure button position for dropdown
  useEffect(() => {
    if (isOpen) {
      ref.current?.measureInWindow((x, y, _w, h) => {
        setOffset(prev => {
          if (prev.x !== x || prev.y !== y + h) {
            return { x, y: y + h };
          }
          return prev;
        });
      });
    }
  }, [isOpen, isRTL, width, height]);

  return (
    <View ref={ref} collapsable={false} style={style}>
        <AppText className="text-brownColor-400 mb-2">{label}</AppText> 
      <Pressable
        onPress={toggleModal}
        className={`rounded-xl border border-slate-300 bg-white h-[42px] w-[${dropdownWidth}px] flex-row items-center justify-between px-2 gap-2 ${buttonClassName}`}
      >
        <AppText className="text-base text-brownColor-400">
          {selectedOption?.label || placeholder}
        </AppText>
        <Image source={require('@/constants').Icons.arrowCircleDown} />
      </Pressable>
      <Modal transparent visible={isOpen} animationType="none">
        <Pressable
          onPress={toggleModal}
          className="absolute top-0 left-0 w-full h-full"
        >
          <View
            className="absolute bg-white border border-slate-300 rounded-xl"
            style={{
              width: dropdownWidth,
              top: offset.y + 8,
              [isRTL ? 'right' : 'left']: offset.x,
              gap: 2,
              padding: 0,
            }}
          >
            {options.map((option, idx) => (
              <React.Fragment key={option.value}>
                <SelectOptionRow
                  label={option.label}
                  onPress={() => handleSelect(option.value)}
                  icon={option.icon}
                />
                {idx === 0 && options.length > 1 && (
                  <View className="h-px bg-slate-200 w-full my-1" />
                )}
              </React.Fragment>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AppSelect;