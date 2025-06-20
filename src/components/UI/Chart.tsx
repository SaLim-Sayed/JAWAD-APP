import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const Chart = () => {
    return (
        <LinearGradient
            colors={['#FFA500', '#fff', '#FF4500', '#FF4500']} // التدرج: من برتقالي إلى برتقالي غامق
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                padding: 2, // عرض التدرج (سُمك البوردر)
                borderRadius: 16,
                margin: 16,
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 14,
                    padding: 16,
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
                    My rents overview
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#5B3A29' }}>2.568</Text>
                <Text style={{ color: 'red', marginBottom: 4 }}>↓ 2.1% Vs Last Week</Text>
                <Text style={{ color: '#999', marginBottom: 8 }}>from 1–6 Dec, 2020</Text>

                <LineChart
                    data={{
                        labels: ['01', '02', '03', '04', '05', '06'],
                        datasets: [
                            {
                                data: [1.5, 1.2, 2.0, 1.9, 1.6, 2.5],
                                color: () => '#FFA500',
                                strokeWidth: 2,
                            },
                            {
                                data: [2.0, 2.5, 1.7, 2.2, 2.1, 2.3],
                                color: () => '#aaa',
                                strokeWidth: 2,
                            },
                        ],
                        legend: ['Last Week', 'Last Month'],
                    }}
                    width={screenWidth - 64}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: '#ffa726',
                        },
                    }}
                    style={{
                        borderRadius: 8,
                    }}
                />
            </View>
        </LinearGradient>
    );
};

export default Chart;
