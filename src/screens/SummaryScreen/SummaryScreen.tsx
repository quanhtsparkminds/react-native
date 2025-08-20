import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";

import { AppButton, AppIcon, AppText, useModert } from "components";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import { palette, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { Attendances, TAttendances, TScoreSubject, ScoreSubjects } from ".";
import {
  AttendanceItem,
  AttendanceCircularProgress,
  RecentScoreItem,
} from "./components";

export const SummaryScreen = () => {
  const navigation = useNavigation();
  const model = useModert();
  const [attendances, setAttendances] = useState<TAttendances[]>([]);
  const [subjectScore, setSubjectScore] = useState<TScoreSubject[]>([]);

  useEffect(() => {
    setAttendances(Attendances);
  }, []);

  useEffect(() => {
    setSubjectScore(ScoreSubjects);
  }, []);

  const viewReportPressed = () => {
    model.show({
      title: "Information",
      message: "Please contact customer service!",
    });
  };

  const colors = [palette.green50, palette.gray100, palette.primary50];

  return (
    <SafeAreaView style={[style.flex_1]}>
      <View style={[style.mx_md]}>
        <AppText style={$title} tx="summary.academicSumary" />
        <View style={$root}>
          <View style={$cardContainer}>
            <AppText
              style={[style.self_center]}
              tx="summary.attendanceOverview"
            />
            <AttendanceCircularProgress
              size={60}
              width={6}
              fill={80}
              bgColor="#3d5875"
            />
          </View>
          <FlatList
            data={attendances}
            renderItem={({ item, index }) => (
              <AttendanceItem data={item} index={index} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={$listContainer}
          />
        </View>
        <AppText style={$title} tx="summary.recentScore" />
        <FlatGrid
          itemDimension={150}
          data={subjectScore}
          renderItem={({ item, index }) => {
            return <RecentScoreItem item={item} index={index} />;
          }}
          contentContainerStyle={{
            paddingVertical: 10,
            height: 450,
          }}
          ListFooterComponent={() => (
            <AppButton
              titleTx="summary.viewReport"
              onPress={() => viewReportPressed()}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const $root: SViewStyle = [
  style.bg_color_white,
  style.shadow,
  style.round_md,
  style.p_md,
  style.mt_md,
  style.mb_md,
];
const $listContainer: SViewStyle = [style.mt_md];
const $cardContainer: SViewStyle = [
  style.round_md,
  style.row,
  style.justify_between,
];
const $title: STextStyle = [style.tx_size_xl, style.tx_font_bold];
