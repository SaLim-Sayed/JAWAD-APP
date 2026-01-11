import { View, FlatList } from 'react-native';
import React from 'react';
import AppWrapper from '@/components/UI/AppWrapper';
import AppHeader from '@/components/UI/AppHeader';
import DescriptionItem from '@/components/UI/DescriptionItem';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();

  const termsData = [
    { key: "1_user_eligibility", title: t("terms.1_user_eligibility").split("\n")[0], content: t("terms.1_user_eligibility").split("\n").slice(1).join("\n") },
    { key: "2_booking_and_payments", title: t("terms.2_booking_and_payments").split("\n")[0], content: t("terms.2_booking_and_payments").split("\n").slice(1).join("\n") },
    { key: "3_cancellations_and_refunds", title: t("terms.3_cancellations_and_refunds").split("\n")[0], content: t("terms.3_cancellations_and_refunds").split("\n").slice(1).join("\n") },
    { key: "4_assumption_of_risk", title: t("terms.4_assumption_of_risk").split("\n")[0], content: t("terms.4_assumption_of_risk").split("\n").slice(1).join("\n") },
    { key: "5_partner_responsibility", title: t("terms.5_partner_responsibility").split("\n")[0], content: t("terms.5_partner_responsibility").split("\n").slice(1).join("\n") },
    { key: "6_user_conduct", title: t("terms.6_user_conduct").split("\n")[0], content: t("terms.6_user_conduct").split("\n").slice(1).join("\n") },
    { key: "7_intellectual_property", title: t("terms.7_intellectual_property").split("\n")[0], content: t("terms.7_intellectual_property").split("\n").slice(1).join("\n") },
    { key: "8_limitation_of_liability", title: t("terms.8_limitation_of_liability").split("\n")[0], content: t("terms.8_limitation_of_liability").split("\n").slice(1).join("\n") },
    { key: "9_privacy_policy", title: t("terms.9_privacy_policy").split("\n")[0], content: t("terms.9_privacy_policy").split("\n").slice(1).join("\n") },
    { key: "10_modifications_to_terms", title: t("terms.10_modifications_to_terms").split("\n")[0], content: t("terms.10_modifications_to_terms").split("\n").slice(1).join("\n") },
    { key: "11_governing_law", title: t("terms.11_governing_law").split("\n")[0], content: t("terms.11_governing_law").split("\n").slice(1).join("\n") },
    { key: "12_contact_us", title: t("terms.12_contact_us").split("\n")[0], content: t("terms.12_contact_us").split("\n").slice(1).join("\n") }
  ];

  return (
    <AppWrapper>
      <AppHeader title={t("terms.title")} showBackButton />
      <View className="bg-white">
        <FlatList
          data={termsData}
          keyExtractor={(item) => item.key}
          style={{ margin: 16, backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DescriptionItem
              key={item.key}
              label={item.title}
              description={item.content}
            />
          )}
          ListFooterComponent={<View className="h-80" />}
        />
      </View>
    </AppWrapper>
  );
}
