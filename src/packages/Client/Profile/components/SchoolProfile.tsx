import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import UpdateSchool from '@/components/UI/UpdateSchool';

export const SchoolProfile = () => {
    const { authData } = useAuthStore();

    return (
        <UpdateSchool schoolId={authData.id} />
    );
};
