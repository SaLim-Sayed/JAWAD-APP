import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppHeader from './AppHeader';
interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBackButton?: boolean;
    isScrollable?: boolean;
}

export default function AppLayout({ children,title,showBackButton=true,isScrollable=true }: AppLayoutProps) {
     return (
        <SafeAreaView className="flex-1 bg-white">
             <StatusBar backgroundColor="white" barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 40}
            >
                <View style={{ flex: 1 }}>
                { title&&<AppHeader title={title} showBackButton={showBackButton} />}

                    {isScrollable?<KeyboardAwareScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        enableOnAndroid
                        keyboardShouldPersistTaps="handled"
                        extraScrollHeight={30}
                    >
                        
                        <View className="flex-[0.9] p-6">

                            {children}
                        </View>
                      
                    </KeyboardAwareScrollView>:
                    <View className="flex-[0.96] px-6">

                        {children}


                    </View>
}

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
