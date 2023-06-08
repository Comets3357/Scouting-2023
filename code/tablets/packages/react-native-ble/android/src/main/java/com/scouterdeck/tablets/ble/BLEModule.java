package com.scouterdeck.tablets.ble;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattServer;
import android.bluetooth.BluetoothGattServerCallback;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.content.Context;
import android.os.ParcelUuid;
import android.util.Log;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.UUID;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;


/**
 * {@link NativeModule} that allows JS to open the default browser
 * for an url.
 */
public class BLEModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    HashMap<String, BluetoothGattService> servicesMap;
    HashSet<BluetoothDevice> mBluetoothDevices;
    BluetoothManager mBluetoothManager;
    BluetoothAdapter mBluetoothAdapter;
    BluetoothGattServer mGattServer;
    BluetoothLeAdvertiser advertiser;
    AdvertiseCallback advertisingCallback;

    String name;
    boolean advertising;
    private Context context;

    public BLEModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.context = reactContext;
        this.servicesMap = new HashMap<String, BluetoothGattService>();
        this.advertising = false;
        this.name = "RN_BLE";
    }

    public void sendEventToJs(String eventName, Object obj) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, obj);
    }

    @Override
    public String getName() {
        return "BLEModule";
    }

    @ReactMethod
    public void setName(String name) {
        this.name = name;
        Log.i("BLEModule", "name set to " + name);
    }

    @ReactMethod
    public void addService(String uuid, Boolean primary) {
        this.servicesMap.clear();
        UUID SERVICE_UUID = UUID.fromString(uuid);
        int type = primary ? BluetoothGattService.SERVICE_TYPE_PRIMARY : BluetoothGattService.SERVICE_TYPE_SECONDARY;
        BluetoothGattService tempService = new BluetoothGattService(SERVICE_UUID, type);
        if (!this.servicesMap.containsKey(uuid)) {
            this.servicesMap.put(uuid, tempService);
        }
    }

    @ReactMethod
    public void addCharacteristicToService(String serviceUUID, String uuid, Integer permissions, Integer properties) {
        UUID CHAR_UUID = UUID.fromString(uuid);
        BluetoothGattCharacteristic tempChar = new BluetoothGattCharacteristic(CHAR_UUID, properties, permissions);
        this.servicesMap.get(serviceUUID).addCharacteristic(tempChar);
        Log.i("BLEModule", "add CharUUID:" + uuid);
    }

    @ReactMethod
    public void addDescriptorToCharacteristic(String serviceUUID, String charactUUID, String uuid, Integer permissions) {
        UUID DESC_UUID = UUID.fromString(uuid);
        UUID CHAR_UUID = UUID.fromString(charactUUID);

        BluetoothGattDescriptor tempDesc = new BluetoothGattDescriptor(DESC_UUID, permissions);
        this.servicesMap.get(serviceUUID).getCharacteristic(CHAR_UUID).addDescriptor(tempDesc);
    }

    private final BluetoothGattServerCallback mGattServerCallback = new BluetoothGattServerCallback() {
        @Override
        public void onMtuChanged(BluetoothDevice device, int mtu) {
            super.onMtuChanged(device, mtu);
        }

        @Override
        public void onConnectionStateChange(BluetoothDevice device, final int status, int newState) {
            super.onConnectionStateChange(device, status, newState);
            if (status == BluetoothGatt.GATT_SUCCESS) {
                if (newState == BluetoothGatt.STATE_CONNECTED) {
                    mBluetoothDevices.add(device);
                    sendEventToJs("subscribedCentral", device.getAddress());
                } else if (newState == BluetoothGatt.STATE_DISCONNECTED) {
                    mBluetoothDevices.remove(device);
                    sendEventToJs("unsubscribedCentral", device.getAddress());
                }
            } else {
                mBluetoothDevices.remove(device);
            }
        }

        @Override
        public void onCharacteristicReadRequest(BluetoothDevice device, int requestId, int offset,
                                                BluetoothGattCharacteristic characteristic) {
            super.onCharacteristicReadRequest(device, requestId, offset, characteristic);
            if (offset != 0) {
                mGattServer.sendResponse(device, requestId, BluetoothGatt.GATT_INVALID_OFFSET, offset,
                        /* value (optional) */ null);
                return;
            }
            mGattServer.sendResponse(device, requestId, BluetoothGatt.GATT_SUCCESS,
                    offset, characteristic.getValue());
        }

        @Override
        public void onNotificationSent(BluetoothDevice device, int status) {
            super.onNotificationSent(device, status);
        }

        @Override
        public void onCharacteristicWriteRequest(BluetoothDevice device, int requestId,
                                                 BluetoothGattCharacteristic characteristic, boolean preparedWrite, boolean responseNeeded,
                                                 int offset, byte[] value) {
            String err = "";

            super.onCharacteristicWriteRequest(device, requestId, characteristic, preparedWrite,
                    responseNeeded, offset, value);
            characteristic.setValue(value);
            WritableMap map1 = Arguments.createMap();
            map1.putString("uuid", characteristic.getUuid().toString());
            map1.putString("service", characteristic.getService().getUuid().toString());
            map1.putString("central", device.getAddress());
            WritableMap map2 = map1.copy();

            WritableArray data = Arguments.createArray();
            for (byte b : value) {
                data.pushInt((int) b);
            }
            map1.putArray("value", data);


            if (responseNeeded) {
                mGattServer.sendResponse(device, requestId, BluetoothGatt.GATT_SUCCESS, offset, value);
            }
            WritableArray arguments1 = Arguments.createArray();
            if (value.length < 1) {
                err = "No characteristic.";
            }
            arguments1.pushString(err);
            arguments1.pushMap(map1);

            sendEventToJs("didReceiveWrite", arguments1);

            String tmpStr = "";
            tmpStr = new String(value, StandardCharsets.UTF_8);
            map2.putString("value", tmpStr);
            WritableArray arguments2 = Arguments.createArray();
            arguments2.pushString(err);
            arguments2.pushMap(map2);

            sendEventToJs("didReceiveWriteString", arguments2);
        }

        @Override
        public void onDescriptorWriteRequest(BluetoothDevice device, int requestId, BluetoothGattDescriptor descriptor, boolean preparedWrite, boolean responseNeeded, int offset, byte[] value) {
            // super.onDescriptorWriteRequest(device, requestId, descriptor, preparedWrite,responseNeeded, offset, value);
            // now tell the connected device that this was all successful
            if (responseNeeded) {
                mGattServer.sendResponse(device, requestId, BluetoothGatt.GATT_SUCCESS, offset, value);
            }
            Log.v("BLEModule", String.format("onDescriptorWriteRequest：requestId = %s", requestId));
        }

        @Override
        public void onDescriptorReadRequest(BluetoothDevice device, int requestId, int offset, BluetoothGattDescriptor descriptor) {
            super.onDescriptorReadRequest(device, requestId, offset, descriptor);
            Log.v("BLEModule", String.format("onDescriptorReadRequest：requestId = %s", requestId));
        }

        @Override
        public void onExecuteWrite(BluetoothDevice device, int requestId, boolean execute) {
            super.onExecuteWrite(device, requestId, execute);
            Log.v("BLEModule", String.format("onExecuteWrite：requestId = %s", requestId));
        }
    };

    @ReactMethod
    public void start(final Promise promise) {
        mBluetoothManager = (BluetoothManager) context.getSystemService(Context.BLUETOOTH_SERVICE);
        mBluetoothAdapter = mBluetoothManager.getAdapter();
        mBluetoothAdapter.setName(this.name);
        // Ensures Bluetooth is available on the device and it is enabled. If not,
        // displays a dialog requesting user permission to enable Bluetooth.

        mBluetoothDevices = new HashSet<>();
        mGattServer = mBluetoothManager.openGattServer(reactContext, mGattServerCallback);
        for (BluetoothGattService service : this.servicesMap.values()) {
            mGattServer.addService(service);
        }
        advertiser = mBluetoothAdapter.getBluetoothLeAdvertiser();
        AdvertiseSettings settings = new AdvertiseSettings.Builder()
                .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
                .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
                .setConnectable(true)
                .build();

        AdvertiseData.Builder dataBuilder = new AdvertiseData.Builder()
                .setIncludeDeviceName(true);
        for (BluetoothGattService service : this.servicesMap.values()) {
            dataBuilder.addServiceUuid(new ParcelUuid(service.getUuid()));
        }
        AdvertiseData data = dataBuilder.build();
        Log.i("BLEModule", data.toString());

        advertisingCallback = new AdvertiseCallback() {
            @Override
            public void onStartSuccess(AdvertiseSettings settingsInEffect) {
                super.onStartSuccess(settingsInEffect);
                advertising = true;
                promise.resolve("Success, Started Advertising: " + settings + " " + data);
            }

            @Override
            public void onStartFailure(int errorCode) {
                advertising = false;
                Log.e("BLEModule", "Advertising onStartFailure: " + errorCode);
                promise.reject(Integer.toString(errorCode), "Advertising onStartFailure: " + errorCode);
                super.onStartFailure(errorCode);
            }
        };

        advertiser.startAdvertising(settings, data, advertisingCallback);
    }

    @ReactMethod
    public void stop() {
        if (mGattServer != null) {
            mGattServer.close();
            mGattServer.clearServices();
        }
        if (mBluetoothAdapter != null && mBluetoothAdapter.isEnabled() && advertiser != null) {
            // If stopAdvertising() gets called before close() a null
            // pointer exception is raised.
            advertiser.stopAdvertising(advertisingCallback);
        }
        advertising = false;
    }

    @ReactMethod
    public void sendNotificationToDevices(String serviceUUID, String charUUID, ReadableArray messageBytes, ReadableArray deviceIDs) {
        byte[] decoded = new byte[messageBytes.size()];
        for (int i = 0; i < messageBytes.size(); i++) {
            decoded[i] = new Integer(messageBytes.getInt(i)).byteValue();
        }
        BluetoothGattCharacteristic characteristic = servicesMap.get(serviceUUID).getCharacteristic(UUID.fromString(charUUID));
        characteristic.setValue(decoded);
        boolean indicate = (characteristic.getProperties()
                & BluetoothGattCharacteristic.PROPERTY_INDICATE)
                == BluetoothGattCharacteristic.PROPERTY_INDICATE;
        for (BluetoothDevice device : mBluetoothDevices) {
            if (deviceIDs.size() > 0) {
                for (int i = 0; i < deviceIDs.size(); i++) {
                    if (device.getAddress() == deviceIDs.getString(i)) {
                        mGattServer.notifyCharacteristicChanged(device, characteristic, indicate);
                        break;
                    }
                }
            } else {
                mGattServer.notifyCharacteristicChanged(device, characteristic, indicate);
            }
        }
    }

    @ReactMethod
    public void isAdvertising(Promise promise) {
        promise.resolve(this.advertising);
    }
}
