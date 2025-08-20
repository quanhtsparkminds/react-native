import { useAppTheme } from "provider";
import React, { PropsWithChildren, useState } from "react";
import { FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
import { style } from "theme";
import { SViewStyle, TFile } from "types";
import { AppModal } from "../AppModal";
import { TPickerItem } from "./AppPicker.types";

import { modertRef, PickerItem } from "components";
import { useCameraPermission } from "hooks";
import { useTranslation } from "react-i18next";
import {
  CameraType,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from "react-native-image-picker";
import { delay } from "utils";

const itemHeight = style.inbut.height;

export type AppImagePickerProps = {
  onValueChange: (value: TFile) => void;
} & PropsWithChildren;

export const AppImagePicker = (props: AppImagePickerProps) => {
  const { colorScheme } = useAppTheme();
  const { hasCameraPermission } = useCameraPermission();
  const { t } = useTranslation();

  const items: TPickerItem[] = [
    { key: "camera", label: t("image.camera") },
    { key: "gallery", label: t("image.gallery") },
  ];

  const [visible, setVisible] = useState<boolean>(false);

  const open = () => setVisible(true);

  const close = () => setVisible(false);

  const handleItemPressed = async (item: TPickerItem) => {
    close();
    await delay(500);
    switch (item.key) {
      case "camera":
        handleCameraLaunch();
        break;
      default:
        handleGalleryLaunch();
        break;
    }
  };

  const handleCameraLaunch = () => {
    if (hasCameraPermission) {
      const options = {
        mediaType: "photo" as MediaType,
        quality: 0.9 as PhotoQuality,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
        cameraType: "back" as CameraType,
      };
      launchCamera(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorMessage) return;
        if (response.assets && response.assets[0]) {
          const file = response.assets[0];
          props.onValueChange({
            name: file.fileName || "",
            type: file.type || "",
            url: file.uri || "",
            size: file.fileSize,
          });
        }
      });
    } else {
      modertRef.current?.show({
        title: t("image.cameraError.title"),
        message: t("image.cameraError.message"),
        buttons: [
          {
            title: t("common.openSettings"),
            onPress: () => Linking.openSettings(),
          },
          {
            title: t("common.cancel"),
          },
        ],
      });
    }
  };

  const handleGalleryLaunch = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.9 as PhotoQuality,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) return;

      if (response.assets && response.assets[0]) {
        const file = response.assets[0];
        props.onValueChange({
          name: file.fileName || "",
          type: file.type || "",
          url: file.uri || "",
          size: file.fileSize,
        });
      }
    });
  };

  return (
    <Pressable
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      onPress={open}
    >
      <View pointerEvents="none">{props.children}</View>
      <AppModal visible={visible} onRequestClose={close}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <PickerItem data={item} onPress={() => handleItemPressed(item)} />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={[$divider, { backgroundColor: colorScheme.surface }]}
            />
          )}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
        />
      </AppModal>
    </Pressable>
  );
};

const $divider: SViewStyle = [
  { height: StyleSheet.hairlineWidth, width: "100%" },
];
