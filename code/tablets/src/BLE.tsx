import {NativeEventEmitter, PermissionsAndroid, Platform} from 'react-native';

import BLEModule from 'react-native-ble';

type PermissionCallback = (result: boolean) => void;

interface BluetoothLowEnergyAPI {
  requestPermissions(callback: PermissionCallback): Promise<void>;
  initBluetooth(): void;
  setBluetoothName(tablet: string): void;
  startAdvertise(): void;
  stopAdvertise(): void;
  sendNotification(data: number[]): void;
}

export default function BLE(): BluetoothLowEnergyAPI {
  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth LE needs location permission',
          buttonNegative: 'Cancel',
          buttonPositive: 'Allow',
          buttonNeutral: 'Maybe Later',
        },
      );
      callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      callback(true);
    }
  };

  const initBluetooth = async () => {
    BLEModule.addService('974f9e8a-124d-43a8-8896-9a5ba15526be', true);
    BLEModule.addCharacteristicToService(
      '974f9e8a-124d-43a8-8896-9a5ba15526be',
      '03029100-6d76-46c9-b233-7614d893a6ac',
      1,
      2 | 16,
    );
  };

  const setBluetoothName = async (tablet: string) => {
    BLEModule.setName('COMET' + tablet);
  };

  const startAdvertise = async () => {
    if (await BLEModule.isAdvertising()) {
      console.log("Bluetooth LE Advertising Status: ALREADY ADVERTISING");
    } else {
      BLEModule.start()
      .then(res => {
        console.log("Bluetooth LE Advertising Status: STARTED ADVERTISING");
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const stopAdvertise = async () => {
    BLEModule.stop();
  };

  const sendNotification = async (data: number[]) => {
    BLEModule.sendNotificationToDevices(
      '974f9e8a-124d-43a8-8896-9a5ba15526be',
      '03029100-6d76-46c9-b233-7614d893a6ac',
      data,
      []
    );
  };

  return {
    requestPermissions,
    initBluetooth,
    setBluetoothName,
    startAdvertise,
    stopAdvertise,
    sendNotification,
  };
}
