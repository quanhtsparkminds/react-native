import { useAppState } from "hooks/Common/AppState";
import { useCallback, useEffect, useState } from "react";
import { Camera } from "react-native-vision-camera";

type useCameraPermissionResult = {
  hasCameraPermission: boolean;
  isRequesting: boolean;
};

export const useCameraPermission = (): useCameraPermissionResult => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const checkCameraPermission = useCallback(async () => {
    setIsRequesting(true);

    try {
      const permission = await Camera.requestCameraPermission();
      setHasCameraPermission(permission === "granted");
    } catch (error) {
      setHasCameraPermission(false);
    } finally {
      setIsRequesting(false);
    }
  }, []);

  const silentCheckPermission = useCallback(async () => {
    try {
      const permission = await Camera.getCameraPermissionStatus();
      setHasCameraPermission(permission === "granted");
    } catch (error) {
      setHasCameraPermission(false);
    }
  }, []);

  useAppState((status) => {
    if (status === "active" && !hasCameraPermission && !isRequesting) {
      silentCheckPermission();
    }
  });

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return {
    hasCameraPermission,
    isRequesting,
  };
};
