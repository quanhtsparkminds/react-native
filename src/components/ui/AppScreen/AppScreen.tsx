import { useNavigation, useRoute } from "@react-navigation/native";
import { EPermissions } from "hooks";
import { useAppTheme } from "provider";
import React, { useLayoutEffect } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { AppIcon } from "../AppIcon";
import { AppText } from "../AppText";

interface TabItem {
  key: string;
  label: string;
}

interface AppScreenProps {
  title: string;
  requiredPermission?: EPermissions;
  hasFilter?: boolean;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
  children: React.ReactNode;
  addButton?: {
    title: string;
    position: "floating" | "header";
    onPress: () => void;
  };
  headerRight?: React.ReactNode;
}

export const AppScreen: React.FC<AppScreenProps> = ({ ...rest }) => {
  return <_AppScreen {...rest} />;
};

const _AppScreen: React.FC<AppScreenProps> = ({
  title,
  tabs = [],
  activeTab,
  onTabChange,
  children,
  addButton,
  requiredPermission,
  hasFilter,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colorScheme } = useAppTheme();

  const handleFilter = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <View style={$header}>
          {addButton?.position === "header" && (
            <Pressable onPress={addButton.onPress}>
              <AppIcon name="add" size={20} />
            </Pressable>
          )}
        </View>
      ),
    });
  }, [addButton?.position, requiredPermission, hasFilter]);

  // Render tabs
  const renderTabs = () => {
    if (tabs.length === 0) return null;

    // Nếu chỉ có 1 tab thì không hiển thị tabs
    if (tabs.length === 1) return null;

    return (
      <View style={$tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={$tabScrollContent}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[$tab, activeTab === tab.key && $activeTab]}
                onPress={() => onTabChange?.(tab.key)}
              >
                <AppText
                  style={[$tabText, activeTab === tab.key && $activeTabText]}
                >
                  {tab.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render floating add button
  const renderFloatingButton = () => {
    if (!addButton || addButton.position !== "floating") return null;

    return (
      <TouchableOpacity style={$floatingButton} onPress={addButton.onPress}>
        <AppText style={$floatingButtonText}>+</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={$container}>
      {renderTabs()}
      <View style={$bodyContainer}>{children}</View>
      {renderFloatingButton()}
    </View>
  );
};

const $container: SViewStyle = [style.flex_1];

const $tabContainer: SViewStyle = [style.mt_sm];

const $tabScrollContent: SViewStyle = [style.row, style.px_md];

const $tab: SViewStyle = [
  style.row,
  style.align_center,
  style.mr_xs,
  style.border_width_hairlineWidth,
  style.px_lg,
  style.py_xs,
  style.rounded,
];

const $activeTab: SViewStyle = [style.bg_color_primary500];

const $tabText: STextStyle = [style.tx_color_gray600];

const $activeTabText: STextStyle = [style.tx_color_white, style.tx_font_medium];

const $bodyContainer: SViewStyle = [style.flex_1];

const $floatingButton: SViewStyle = [
  style.abs,
  { right: 20, bottom: 20 },
  style.w_xxxl,
  style.h_xxxl,
  style.rounded,
  style.bg_color_primary400,
  style.center,
];

const $floatingButtonText: STextStyle = [
  style.tx_color_white,
  { fontSize: 24 },
  style.tx_fw_bold,
];

const $badge: SViewStyle = [
  style.bg_color_error500,
  style.rounded,
  style.abs,
  { right: 0, width: 10, height: 10 },
];

const $header: SViewStyle = [
  style.mr_md,
  style.gap_sm,
  style.row,
  style.align_center,
];
