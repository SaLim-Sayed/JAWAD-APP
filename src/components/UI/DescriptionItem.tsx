import AppText from '@/components/UI/AppText';
import Col from '@/components/UI/Col';
import Row from '@/components/UI/Row';
import React from 'react';

type Props = {
    label: string;
    description: string;
    extra?: string;
    isRow?: boolean;
    className?: string;
};

const DescriptionItem: React.FC<Props> = ({
    label,
    description,
    className = '',
}) =>
(
    <Col className={`mb-1 ${className}`}>
        <AppText className="text-black tajawal-semibold-16">{label}</AppText>
        <Row className="justify-between">
            <AppText className="text-black tajawal-light-16">{description}</AppText>

        </Row>
    </Col>
);

export default DescriptionItem;