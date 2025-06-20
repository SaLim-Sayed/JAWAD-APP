import { cn } from '@/lib/utils';
import { Text, TextProps, View } from 'react-native';

type AppTextProps = {
    children: React.ReactNode;
    className?: string;
    color?: string;
    size?: string;
} & TextProps;

const AppText: React.FC<AppTextProps> = ({ children, className, color, size, ...rest }) => (
    <View><Text className={cn('text-white text-[16px] font-[500] ', color, size, className)} {...rest}>{children}</Text></View>
);

export default AppText;
