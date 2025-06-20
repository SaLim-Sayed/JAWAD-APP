import { cn } from '@/lib/utils'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import AppText from './AppText'
interface ButtonProps {
    title: string
    onPress: () => void
    className?: string
}
const Button = ({ title, onPress, className }: ButtonProps) => {
    return (
        <TouchableOpacity className={cn('bg-mainColor-100 flex-1 justify-center items-center border border-whit text-whiteColor-100 rounded-xl py-3 px-6', className)}
            onPress={onPress}>
            <AppText>{title}</AppText>
        </TouchableOpacity>
    )
}

export default Button