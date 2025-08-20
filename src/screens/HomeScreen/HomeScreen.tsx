import {
  AppSizedBox,
  AppText,
  InfiniteQueryFlatlist,
  Loader,
} from "components/ui";
import React, { useEffect, useMemo, useState } from "react";
import { CurrentTask, ExamFilter, TAssignment, TExam } from "./Home.types";
import { FlatList, View } from "react-native";
import { STextStyle, SViewStyle } from "types";
import { style } from "theme";
import { HomeItem } from "./components";
import { TaskAssignmentItem } from "./components/TaskAssignmentItem";
import { modertRef } from "components";
import { useLoader } from "@baont97/rn-loader";
import { useTx } from "i18n";

type DataState = {
  dataExam: TExam[];
  dataAssignment: TAssignment[];
  isLoading: boolean;
};

export const HomeScreen = () => {
  const loader = useLoader();
  const { t } = useTx();
  const [state, setState] = useState<DataState>({
    dataExam: [],
    dataAssignment: [],
    isLoading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        dataExam: ExamFilter,
        dataAssignment: CurrentTask,
        isLoading: false,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDonePressed = (item: TAssignment, onCloseSwipe: () => void) => {
    modertRef.current?.hide();
    loader.show();
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        dataAssignment: prev.dataAssignment.map((i) =>
          i.id === item.id ? { ...i, status: "done" } : i
        ),
      }));
      onCloseSwipe();
      loader.hide();
    }, 1000);
  };
  const handleCancelPressed = (onCloseSwipe: () => void) => {
    modertRef.current?.hide();
    loader.show();
    onCloseSwipe();
    loader.hide();
  };

  const handleConfirmDone = (item: TAssignment, onCloseSwipe: () => void) => {
    modertRef.current?.show({
      title: t("common.confirm"),
      message: t("modal.home.confirmDoneTask"),
      buttons: [
        {
          title: t("common.cancel"),
          onPress: () => {
            handleCancelPressed(onCloseSwipe);
          },
        },
        {
          title: t("common.done"),
          onPress: async () => {
            handleDonePressed(item, () => onCloseSwipe());
          },
        },
      ],
    });
  };

  return state.isLoading ? (
    <Loader />
  ) : (
    <View style={$container}>
      <InfiniteQueryFlatlist<TAssignment>
        data={state.dataAssignment as TAssignment[]}
        renderItem={({ item, index }) => (
          <TaskAssignmentItem
            item={item}
            index={index}
            onConfirmDone={(item, onCloseSwipe) => {
              handleConfirmDone(item, onCloseSwipe);
            }}
          />
        )}
        fetchNextPage={() => Promise.resolve() as any}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <FlatList
              data={state.dataExam}
              renderItem={({ item, index }) => (
                <HomeItem item={item} index={index} />
              )}
              horizontal
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 8,
              }}
            />
            <AppSizedBox height={10} />
            <AppText style={$assignmentTitle} tx="home.currentAssignment" />
            <AppSizedBox height={20} />
          </View>
        )}
        contentContainerStyle={[$listContainer]}
      />
    </View>
  );
};

const $container: SViewStyle = [style.mb_md, style.flex_1];

const $listContainer: SViewStyle = [style.p_md];
const $assignmentTitle: STextStyle = [
  style.tx_font_mediumItalic,
  style.tx_size_xl,
];
