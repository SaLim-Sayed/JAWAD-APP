import React from 'react';
import { ScrollView, View } from 'react-native';
import AppText from '@/components/UI/AppText';
import AppButton from '@/components/UI/AppButton';
import Divider from '@/components/UI/Divider';
import { Icons } from '@/assets/icons/icons';
import Image from '@/components/UI/Image';
import SummaryItem from './SummaryItem';
 
type GroupBookingSummaryProps = {
    type: string;
    date: string;
    riders: number;
    gender: string;
    promo?: string;
    hasFemaleRiders?: boolean;
    perPerson: number;
    taxes: number;
    total: number;
    onNext: () => void;
};

const currency = '$';

const GroupBookingSummary: React.FC<GroupBookingSummaryProps> = ({
    type,
    date,
    riders,
    gender,
    promo,
    hasFemaleRiders,
    perPerson,
    taxes,
    total,
    onNext,
}) => {
    return (
        <View className="p-5 w-full">
            <ScrollView  className="bg-[#FAF7F3] rounded-2xl h-[75%] p-5  mb-6 w-full">
                <SummaryItem
                    label="States"
                    description={type === 'group' ? 'Group' : 'My'}
                />
                <Divider />

                <SummaryItem
                    label="Date"
                    description={date}
                />
                <Divider />

                <SummaryItem
                    label="Number of riders"
                    description={String(riders).padStart(2, '0')}
                    extra={gender === 'mixed' ? 'Mixed Group' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                />
                <Divider />

                
 
                {hasFemaleRiders && (
                    <>
                        <View className="flex-row items-center justify-start gap-2 mb-1">
                            <AppText className="text-brownColor-400 tajawal-semibold-16">
                                Female riders
                            </AppText>
                            <Image source={Icons.warning2} resizeMode="contain" />
                            <AppText className="text-orange-400 tajawal-light-16">
                                {currency} 250 $ Per Person
                            </AppText>
                        </View>
                     </>
                )}

                <SummaryItem
                    label="Riders Number"
                    description={String(riders).padStart(2, '0')}
                    isRow
                />
                <SummaryItem
                    label="Per Person"
                    description={`${perPerson} ${currency}`}
                    isRow
                />
                <SummaryItem
                    label="Taxes"
                    description={`${taxes} ${currency}`}
                    isRow
                />
                <Divider />

                <SummaryItem
                    label="Total"
                    description={`${total} ${currency}`}
                    isRow
                />
                <View className="h-10" />
            </ScrollView>
            <AppButton
                title="Next"
                onPress={onNext}
                className="bg-brownColor-400 mt-8 rounded-2xl"
                textClassName="text-lg font-semibold"
            />
        </View>
    );
};

export default GroupBookingSummary;