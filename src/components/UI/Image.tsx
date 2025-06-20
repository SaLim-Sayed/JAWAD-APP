import React from 'react';
import { Image as RNImage, ImageBackground, ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

type ImageProps = {
    source: ImageSourcePropType | string | React.ReactNode | React.FC<any>;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    style?: StyleProp<ViewStyle> | any;
    background?: boolean;
    [key: string]: any;
};

const isRemoteImage = (src: string) =>
    /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i.test(src);

const isSvgXml = (src: string) =>
    typeof src === 'string' && src.trim().startsWith('<svg');

const isSvgUri = (src: string) =>
    /^https?:\/\/.*\.svg$/i.test(src);

const Image: React.FC<ImageProps> = ({
    source,
    resizeMode = 'cover',
    style,
    background = false,
    ...rest
}) => {
    // 0. If source is a React component type (function), render it as an element
    if (typeof source === 'function') {
        const Component = source as React.FC<any>;
        return <View style={style}><Component {...rest} /></View>;
    }

    // 1. SVG React element/component (from SVGR or similar)
    if (React.isValidElement(source)) {
        return <View style={style}>{source}</View>;
    }

    // 2. SVG XML string
    if (typeof source === 'string' && isSvgXml(source)) {
        return <SvgXml xml={source} width="100%" height="100%" {...rest} />;
    }

    // 3. Remote SVG (not supported directly)
    if (typeof source === 'string' && isSvgUri(source)) {
        return null;
    }

    // 4. Remote image (jpg/png/webp/gif)
    if (typeof source === 'string' && isRemoteImage(source)) {
        const resolvedSource = { uri: source };
        if (background) {
            return (
                <ImageBackground source={resolvedSource} resizeMode={resizeMode} style={style} {...rest}>
                    {rest.children}
                </ImageBackground>
            );
        }
        return <RNImage source={resolvedSource} resizeMode={resizeMode} style={style} {...rest} />;
    }

    // 5. Static image (require)
    if (typeof source === 'number') {
        if (background) {
            return (
                <ImageBackground source={source} resizeMode={resizeMode} style={style} {...rest}>
                    {rest.children}
                </ImageBackground>
            );
        }
        return <RNImage source={source} resizeMode={resizeMode} style={style} {...rest} />;
    }

    // fallback
    return null;
};

export default Image;