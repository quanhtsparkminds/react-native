import { images } from "@assets/index";
import { AppIcon } from "components";
import { useAppTheme } from "provider";
import React from "react";
import { FlatList, TouchableHighlight, View } from "react-native";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppText } from "../AppText";

// Base Types
interface BaseItem {
  id: string;
}

// Field Type Definitions
interface BaseFieldDefinition<T extends BaseItem, K extends keyof T> {
  key: K;
  label: string;
  show?: boolean;
}

interface TextFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "text";
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface NumberFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "number";
  format?: "default" | "currency" | "percentage" | "weight";
  suffix?: string;
  prefix?: string;
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface BooleanFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "boolean";
  trueText?: string;
  falseText?: string;
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface DateFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "date";
  format?: "short" | "long" | "datetime" | "time";
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface StatusFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "status";
  statusMap?: Record<
    string,
    { label: string; color: string; backgroundColor: string }
  >;
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface BadgeFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "badge";
  badgeMap?: Record<
    string,
    { label: string; color?: string; backgroundColor?: string }
  >;
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface ImageFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "image";
  placeholder?: string;
  render?: (value: T[K], item: T) => React.ReactNode;
}

interface CustomFieldDefinition<T extends BaseItem, K extends keyof T>
  extends BaseFieldDefinition<T, K> {
  type: "custom";
  render: (value: T[K], item: T) => React.ReactNode;
}

// Union type for all field definitions
type FieldDefinition<T extends BaseItem, K extends keyof T> =
  | TextFieldDefinition<T, K>
  | NumberFieldDefinition<T, K>
  | BooleanFieldDefinition<T, K>
  | DateFieldDefinition<T, K>
  | StatusFieldDefinition<T, K>
  | BadgeFieldDefinition<T, K>
  | ImageFieldDefinition<T, K>
  | CustomFieldDefinition<T, K>;

// Action Button Definition
interface ActionButton<T extends BaseItem> {
  id: string;
  title: string;
  iconName: keyof typeof images;
  color?: string;
  backgroundColor?: string;
  onPress: (item: T) => void;
  condition?: (item: T) => boolean;
}

// Badge Object
interface BadgeObject {
  label: string;
  color?: string;
  backgroundColor?: string;
}

// Generic Config
interface GenericListConfig<T extends BaseItem> {
  title: string;
  fields: FieldDefinition<T, keyof T>[];
  actions: ActionButton<T>[];
  data: T[];
}

// Default Field Renderers
const renderFieldValue = <T extends BaseItem, K extends keyof T>(
  fieldDef: FieldDefinition<T, K>,
  value: T[K],
  item: T
): React.ReactNode => {
  // If custom render function exists, use it
  if (fieldDef.render) {
    return fieldDef.render(value, item);
  }

  // Handle null/undefined values
  if (value === null || value === undefined || value === "") {
    return <AppText>--</AppText>;
  }
  switch (fieldDef.type) {
    case "text":
      return <AppText style={$textValue}>{String(value)}</AppText>;

    case "number": {
      const numValue = Number(value);
      let formattedValue = "";

      switch (fieldDef.format) {
        case "currency":
          formattedValue = numValue.toLocaleString("vi-VN") + " đ";
          break;
        case "percentage":
          formattedValue = numValue.toFixed(1) + "%";
          break;
        case "weight":
          formattedValue = numValue + " tấn";
          break;
        default:
          formattedValue = numValue.toLocaleString("vi-VN");
      }

      if (fieldDef.prefix) formattedValue = fieldDef.prefix + formattedValue;
      if (fieldDef.suffix) formattedValue = formattedValue + fieldDef.suffix;

      return <AppText style={$numberValue}>{formattedValue}</AppText>;
    }

    case "boolean": {
      const boolValue = Boolean(value);
      const displayText = boolValue
        ? fieldDef.trueText || "Có"
        : fieldDef.falseText || "Không";
      return (
        <AppText
          style={[$booleanValue, boolValue ? $booleanTrue : $booleanFalse]}
        >
          {displayText}
        </AppText>
      );
    }

    case "date": {
      const dateValue = value instanceof Date ? value : new Date(String(value));
      let formattedDate = "";

      switch (fieldDef.format) {
        case "short":
          formattedDate = dateValue.toLocaleDateString("vi-VN");
          break;
        case "long":
          formattedDate = dateValue.toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          break;
        case "datetime":
          formattedDate = dateValue.toLocaleString("vi-VN");
          break;
        case "time":
          formattedDate = dateValue.toLocaleTimeString("vi-VN");
          break;
        default:
          formattedDate = dateValue.toLocaleDateString("vi-VN");
      }

      return <AppText style={$dateValue}>{formattedDate}</AppText>;
    }

    case "status": {
      const statusValue = String(value);
      const statusConfig = fieldDef.statusMap?.[statusValue];
      if (statusConfig) {
        return (
          <View
            style={[
              $statusTag,
              { backgroundColor: statusConfig.backgroundColor },
            ]}
          >
            <AppText style={[$statusTagText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </AppText>
          </View>
        );
      }

      return <AppText style={$textValue}>{statusValue}</AppText>;
    }

    case "badge": {
      const badgeValue = String(value);
      const badgeConfig = fieldDef.badgeMap?.[badgeValue];
      if (badgeConfig) {
        return (
          <View
            style={[
              $badge,
              { backgroundColor: badgeConfig.backgroundColor || "#f0f0f0" },
            ]}
          >
            <AppText
              style={[$badgeText, { color: badgeConfig.color || "#333" }]}
            >
              {badgeConfig.label}
            </AppText>
          </View>
        );
      }

      return <AppText style={$textValue}>{badgeValue}</AppText>;
    }

    case "image": {
      const imageValue = String(value);
      return (
        <View style={$imageContainer}>
          <AppText style={$imageText}>
            📷 {imageValue || fieldDef.placeholder || "Không có ảnh"}
          </AppText>
        </View>
      );
    }

    case "custom":
      // This should never be reached since custom always has render function
      return <AppText style={$textValue}>{String(value)}</AppText>;

    default:
      return <AppText style={$textValue}>{String(value)}</AppText>;
  }
};

// Generic List Item Component
interface GenericListItemProps<T extends BaseItem> {
  item: T;
  index: number;
  config: GenericListConfig<T>;
}

const GenericListItem = <T extends BaseItem>({
  item,
  config,
}: GenericListItemProps<T>): React.ReactElement => {
  const { colorScheme } = useAppTheme();

  return (
    <View
      style={[
        $itemContainer,
        { borderColor: hexToRgbA(colorScheme.surface?.toString(), 0.3) },
      ]}
    >
      <View style={[style.p_md, style.pb_xs]}>
        {config.fields.map((fieldDef) => {
          if (fieldDef.show === false) return null;
          const value = item[fieldDef.key];

          return (
            <View key={String(fieldDef.key)} style={$contentRow}>
              <View style={$contentItem}>
                <AppText style={$label}>{fieldDef.label}:</AppText>
                <View style={$valueContainer}>
                  {renderFieldValue(fieldDef, value, item)}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          height: 0.2,
          width: "100%",
          backgroundColor: colorScheme.surface,
          opacity: 0.3,
        }}
      />
      {/* Action Buttons */}
      {config.actions.length > 0 && (
        <View style={$actionRow}>
          {config.actions
            .filter((action) => !action.condition || action.condition(item))
            .map((action, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() => action.onPress(item)}
                  style={style.flex_1}
                  underlayColor={hexToRgbA(
                    colorScheme.surface?.toString(),
                    0.1
                  )}
                >
                  <View style={$btn}>
                    <AppIcon size={12} name={action.iconName} />
                    <AppText>{action.title}</AppText>
                  </View>
                </TouchableHighlight>
              );
            })}
        </View>
      )}
    </View>
  );
};

// Main Generic List Component
interface GenericListProps<T extends BaseItem> {
  config: GenericListConfig<T>;
  onDataChange?: (newData: T[]) => void;
}

export const GenericList = <T extends BaseItem>({
  config,
  onDataChange,
}: GenericListProps<T>): React.ReactElement => {
  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <GenericListItem item={item} index={index} config={config} />
  );

  return (
    <View style={$container}>
      <FlatList
        data={config.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={$listContainer}
      />
    </View>
  );
};

const $container: SViewStyle = [style.flex_1];

const $listContainer: SViewStyle = [style.p_md];

const $itemContainer: SViewStyle = [
  style.round_xs,
  style.mb_sm,
  style.border_width_hairlineWidth,
  style.overflow_hidden,
];

const $contentRow: SViewStyle = [style.mb_xs];

const $contentItem: SViewStyle = [
  style.row,
  style.gap_md,
  style.justify_between,
];

const $label: STextStyle = [style.opacity_7];

const $valueContainer: SViewStyle = [style.flex_1, style.align_end];

const $textValue: STextStyle = [style.tx_right];

const $numberValue: STextStyle = [style.tx_color_gray800, style.tx_fw_medium];

const $booleanValue: STextStyle = [style.tx_fw_medium];

const $booleanTrue: STextStyle = [style.tx_color_green700];

const $booleanFalse: STextStyle = [style.tx_color_error600];

const $dateValue: STextStyle = [style.tx_color_gray800];

const $statusTag: SViewStyle = [
  style.px_xs,
  style.py_xxs,
  style.round_sm,
];

const $statusTagText: STextStyle = [style.tx_size_sm, style.tx_fw_medium];

const $badge: SViewStyle = [style.px_xs, style.py_xxs, style.round_sm];

const $badgeText: STextStyle = [style.tx_size_sm, style.tx_fw_medium];

const $imageContainer: SViewStyle = [style.self_start];

const $imageText: STextStyle = [style.tx_size_sm, style.tx_color_gray600];

const $actionRow: SViewStyle = [style.row, style.gap_xs, style.justify_around];

const $btn: SViewStyle = [
  style.row,
  style.gap_xs,
  style.flex_1,
  style.center,
  style.inbut,
];

export type {
  ActionButton,
  BadgeFieldDefinition,
  BadgeObject,
  BaseItem,
  BooleanFieldDefinition,
  CustomFieldDefinition,
  DateFieldDefinition,
  FieldDefinition,
  GenericListConfig,
  ImageFieldDefinition,
  NumberFieldDefinition,
  StatusFieldDefinition,
  TextFieldDefinition,
};
