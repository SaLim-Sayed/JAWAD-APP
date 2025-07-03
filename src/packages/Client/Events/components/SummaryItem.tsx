import React from 'react';
import AppText from '@/components/UI/AppText';
import Row from '@/components/UI/Row';
import Col from '@/components/UI/Col';

type SummaryRowProps = {
    label: string;
    description: string;
    extra?: string;
    isRow?: boolean;
    className?: string; // Optional for custom styling
};

const SummaryItem: React.FC<SummaryRowProps> = ({
    label,
    description,
    extra,
    isRow = false,
    className = '',
}) =>
    isRow ? (
        <Row className={`justify-between mb-1 ${className}`}>
            <AppText className="text-brownColor-300 tajawal-semibold-16">{label}</AppText>
            <AppText className="text-brownColor-100 tajawal-light-16">{description}</AppText>
        </Row>
    ) : (
        <Col className={`mb-1 ${className}`}>
            <AppText className="text-brownColor-300 tajawal-semibold-16">{label}</AppText>
            <Row className="justify-between">
                <AppText className="text-brownColor-100 tajawal-light-16">{description}</AppText>
                {extra && (
                    <AppText className="text-brownColor-100 tajawal-light-16">{extra}</AppText>
                )}
            </Row>
        </Col>
    );

export default SummaryItem;