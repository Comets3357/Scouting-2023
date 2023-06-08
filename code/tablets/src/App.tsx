import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import BLE from './BLE';

const App = () => {
  const {requestPermissions, initBluetooth, setBluetoothName, startAdvertise, stopAdvertise, sendNotification} =
    BLE();

  useEffect(() => {
    requestPermissions(isGranted => {
      if (isGranted) {
        console.log('BLE Permission Status: GRANTED');
        initBluetooth();
      } else {
        console.log('BLE Permission Status: DENIED');
      }
    });
  }, []);

  const [gameMode, onChangeGameMode] = React.useState(false);

  const outputData = () => {
    var outputData: number[] = [];

    // Match Number
    let dataMatchNumber = '';
    for (let i = 0; i < matchNumber.toString().length; i++) {
      if ((i + 1) % 2 == 0) {
        dataMatchNumber = dataMatchNumber + matchNumber.toString()[i];
        outputData.push(parseInt(dataMatchNumber));
        dataMatchNumber = '';
      } else if (i == matchNumber.toString().length - 1) {
        dataMatchNumber = dataMatchNumber + matchNumber.toString()[i];
        outputData.push(parseInt(dataMatchNumber));
        dataMatchNumber = '';
      } else {
        dataMatchNumber = dataMatchNumber + matchNumber.toString()[i];
      }
    }
    outputData.push(255);

    // Tablet Number
    let dataTabletNumber = '';
    for (let i = 0; i < tabletNumber.toString().length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTabletNumber = dataTabletNumber + tabletNumber.toString()[i];
        outputData.push(parseInt(dataTabletNumber));
        dataTabletNumber = '';
      } else if (i == tabletNumber.toString().length - 1) {
        dataTabletNumber = dataTabletNumber + tabletNumber.toString()[i];
        outputData.push(parseInt(dataTabletNumber));
        dataTabletNumber = '';
      } else {
        dataTabletNumber = dataTabletNumber + tabletNumber.toString()[i];
      }
    }
    outputData.push(255);

    // Team Number
    let dataTeamNumber = '';
    for (let i = 0; i < teamNumber.toString().length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTeamNumber = dataTeamNumber + teamNumber.toString()[i];
        if (dataTeamNumber[0] == '0') {
          outputData.push(0);
          outputData.push(parseInt(dataTeamNumber));
        } else {
          outputData.push(parseInt(dataTeamNumber));
        }
        dataTeamNumber = '';
      } else if (i == teamNumber.toString().length - 1) {
        dataTeamNumber = dataTeamNumber + teamNumber.toString()[i];
        outputData.push(parseInt(dataTeamNumber));
        dataTeamNumber = '';
      } else {
        dataTeamNumber = dataTeamNumber + teamNumber.toString()[i];
      }
    }
    outputData.push(255);

    // Scouter Name
    outputData.push(253);
    for (let i = 0; i < scouterName.length; i++) {
      outputData.push(scouterName.charCodeAt(i));
    }
    outputData.push(254);
    outputData.push(255);

    // Time Stamp
    let timeStamp = Date.now().toString();
    let dataTimeStamp = '';
    for (let i = 0; i < timeStamp.toString().length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTimeStamp = dataTimeStamp + timeStamp.toString()[i];
        outputData.push(parseInt(dataTimeStamp));
        dataTimeStamp = '';
      } else if (i == timeStamp.toString().length - 1) {
        dataTimeStamp = dataTimeStamp + timeStamp.toString()[i];
        outputData.push(parseInt(dataTimeStamp));
        dataTimeStamp = '';
      } else {
        dataTimeStamp = dataTimeStamp + timeStamp.toString()[i];
      }
    }
    outputData.push(255);

    // Auto Game Piece Preload
    outputData.push(autoPreload);
    outputData.push(255);

    // Auto Move
    outputData.push(autoMove ? 1 : 0);
    outputData.push(255);

    // Auto Game Pieces Acquired
    outputData.push(autoGamePieces);
    outputData.push(255);

    // Auto Place TR
    let combineAutoPlaceTR = '';
    combineAutoPlaceTR = `${autoPlaceTR1 ? 1 : 0}${autoPlaceTR2 ? 1 : 0}${autoPlaceTR3 ? 1 : 0}${autoPlaceTR4 ? 1 : 0}${autoPlaceTR5 ? 1 : 0}${autoPlaceTR6 ? 1 : 0}${autoPlaceTR7 ? 1 : 0}${autoPlaceTR8 ? 1 : 0}${autoPlaceTR9 ? 1 : 0}`;
    combineAutoPlaceTR = parseInt(combineAutoPlaceTR, 2).toString();

    let dataAutoPlaceTR = '';
    for (let i = 0; i < combineAutoPlaceTR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataAutoPlaceTR = dataAutoPlaceTR + combineAutoPlaceTR[i];
        outputData.push(parseInt(dataAutoPlaceTR));
        dataAutoPlaceTR = '';
      } else if (i == combineAutoPlaceTR.length - 1) {
        dataAutoPlaceTR = dataAutoPlaceTR + combineAutoPlaceTR[i];
        outputData.push(parseInt(dataAutoPlaceTR));
        dataAutoPlaceTR = '';
      } else {
        dataAutoPlaceTR = dataAutoPlaceTR + combineAutoPlaceTR[i];
      }
    }
    outputData.push(255);

    // Auto Place MR
    let combineAutoPlaceMR = '';
    combineAutoPlaceMR = `${autoPlaceMR1 ? 1 : 0}${autoPlaceMR2 ? 1 : 0}${autoPlaceMR3 ? 1 : 0}${autoPlaceMR4 ? 1 : 0}${autoPlaceMR5 ? 1 : 0}${autoPlaceMR6 ? 1 : 0}${autoPlaceMR7 ? 1 : 0}${autoPlaceMR8 ? 1 : 0}${autoPlaceMR9 ? 1 : 0}`;
    combineAutoPlaceMR = parseInt(combineAutoPlaceMR, 2).toString();

    let dataAutoPlaceMR = '';
    for (let i = 0; i < combineAutoPlaceMR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataAutoPlaceMR = dataAutoPlaceMR + combineAutoPlaceMR[i];
        outputData.push(parseInt(dataAutoPlaceMR));
        dataAutoPlaceMR = '';
      } else if (i == combineAutoPlaceMR.length - 1) {
        dataAutoPlaceMR = dataAutoPlaceMR + combineAutoPlaceMR[i];
        outputData.push(parseInt(dataAutoPlaceMR));
        dataAutoPlaceMR = '';
      } else {
        dataAutoPlaceMR = dataAutoPlaceMR + combineAutoPlaceMR[i];
      }
    }
    outputData.push(255);

    // Auto Place BR
    let combineAutoPlaceBR = '';
    combineAutoPlaceBR = `${autoPlaceBR1 ? 1 : 0}${autoPlaceBR2 ? 1 : 0}${autoPlaceBR3 ? 1 : 0}${autoPlaceBR4 ? 1 : 0}${autoPlaceBR5 ? 1 : 0}${autoPlaceBR6 ? 1 : 0}${autoPlaceBR7 ? 1 : 0}${autoPlaceBR8 ? 1 : 0}${autoPlaceBR9 ? 1 : 0}`;
    combineAutoPlaceBR = parseInt(combineAutoPlaceBR, 2).toString();

    let dataAutoPlaceBR = '';
    for (let i = 0; i < combineAutoPlaceBR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataAutoPlaceBR = dataAutoPlaceBR + combineAutoPlaceBR[i];
        outputData.push(parseInt(dataAutoPlaceBR));
        dataAutoPlaceBR = '';
      } else if (i == combineAutoPlaceBR.length - 1) {
        dataAutoPlaceBR = dataAutoPlaceBR + combineAutoPlaceBR[i];
        outputData.push(parseInt(dataAutoPlaceBR));
        dataAutoPlaceBR = '';
      } else {
        dataAutoPlaceBR = dataAutoPlaceBR + combineAutoPlaceBR[i];
      }
    }
    outputData.push(255);

    // Auto Charge Station
    outputData.push(autoChargeStation);
    outputData.push(255);

    // Auto Middle Line
    outputData.push(autoMiddleLine ? 1 : 0);
    outputData.push(255);

    // Teleop Game Pieces Acquired
    outputData.push(teleopGamePieces);
    outputData.push(255);

    // Teleop Place TR
    let combineTeleopPlaceTR = '';
    combineTeleopPlaceTR = `${teleopPlaceTR1 ? 1 : 0}${teleopPlaceTR2 ? 1 : 0}${teleopPlaceTR3 ? 1 : 0}${teleopPlaceTR4 ? 1 : 0}${teleopPlaceTR5 ? 1 : 0}${teleopPlaceTR6 ? 1 : 0}${teleopPlaceTR7 ? 1 : 0}${teleopPlaceTR8 ? 1 : 0}${teleopPlaceTR9 ? 1 : 0}`;
    combineTeleopPlaceTR = parseInt(combineTeleopPlaceTR, 2).toString();

    let dataTeleopPlaceTR = '';
    for (let i = 0; i < combineTeleopPlaceTR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTeleopPlaceTR = dataTeleopPlaceTR + combineTeleopPlaceTR[i];
        outputData.push(parseInt(dataTeleopPlaceTR));
        dataTeleopPlaceTR = '';
      } else if (i == combineTeleopPlaceTR.length - 1) {
        dataTeleopPlaceTR = dataTeleopPlaceTR + combineTeleopPlaceTR[i];
        outputData.push(parseInt(dataTeleopPlaceTR));
        dataTeleopPlaceTR = '';
      } else {
        dataTeleopPlaceTR = dataTeleopPlaceTR + combineTeleopPlaceTR[i];
      }
    }
    outputData.push(255);

    // Teleop Place MR
    let combineTeleopPlaceMR = '';
    combineTeleopPlaceMR = `${teleopPlaceMR1 ? 1 : 0}${teleopPlaceMR2 ? 1 : 0}${teleopPlaceMR3 ? 1 : 0}${teleopPlaceMR4 ? 1 : 0}${teleopPlaceMR5 ? 1 : 0}${teleopPlaceMR6 ? 1 : 0}${teleopPlaceMR7 ? 1 : 0}${teleopPlaceMR8 ? 1 : 0}${teleopPlaceMR9 ? 1 : 0}`;
    combineTeleopPlaceMR = parseInt(combineTeleopPlaceMR, 2).toString();

    let dataTeleopPlaceMR = '';
    for (let i = 0; i < combineTeleopPlaceMR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTeleopPlaceMR = dataTeleopPlaceMR + combineTeleopPlaceMR[i];
        outputData.push(parseInt(dataTeleopPlaceMR));
        dataTeleopPlaceMR = '';
      } else if (i == combineTeleopPlaceMR.length - 1) {
        dataTeleopPlaceMR = dataTeleopPlaceMR + combineTeleopPlaceMR[i];
        outputData.push(parseInt(dataTeleopPlaceMR));
        dataTeleopPlaceMR = '';
      } else {
        dataTeleopPlaceMR = dataTeleopPlaceMR + combineTeleopPlaceMR[i];
      }
    }
    outputData.push(255);

    // Teleop Place BR
    let combineTeleopPlaceBR = '';
    combineTeleopPlaceBR = `${teleopPlaceBR1 ? 1 : 0}${teleopPlaceBR2 ? 1 : 0}${teleopPlaceBR3 ? 1 : 0}${teleopPlaceBR4 ? 1 : 0}${teleopPlaceBR5 ? 1 : 0}${teleopPlaceBR6 ? 1 : 0}${teleopPlaceBR7 ? 1 : 0}${teleopPlaceBR8 ? 1 : 0}${teleopPlaceBR9 ? 1 : 0}`;
    combineTeleopPlaceBR = parseInt(combineTeleopPlaceBR, 2).toString();

    let dataTeleopPlaceBR = '';
    for (let i = 0; i < combineTeleopPlaceBR.length; i++) {
      if ((i + 1) % 2 == 0) {
        dataTeleopPlaceBR = dataTeleopPlaceBR + combineTeleopPlaceBR[i];
        outputData.push(parseInt(dataTeleopPlaceBR));
        dataTeleopPlaceBR = '';
      } else if (i == combineTeleopPlaceBR.length - 1) {
        dataTeleopPlaceBR = dataTeleopPlaceBR + combineTeleopPlaceBR[i];
        outputData.push(parseInt(dataTeleopPlaceBR));
        dataTeleopPlaceBR = '';
      } else {
        dataTeleopPlaceBR = dataTeleopPlaceBR + combineTeleopPlaceBR[i];
      }
    }
    outputData.push(255);

    // Teleop Charge Station
    outputData.push(teleopChargeStation);
    outputData.push(255);

    // Teleop Played Defense
    outputData.push(playedDefense);
    outputData.push(255);

    // Teleop Was Defended
    outputData.push(wasDefended ? 1 : 0);


    // Send output data
    console.log("Sending Data: " + outputData)
    sendNotification(outputData);

    // Reset data
    onChangeGameMode(false);

    onChangeMatchNumber((Number(matchNumber) + 1).toString());
    onChangeTeamNumber('');

    onChangeAutoPlaceTR1(false);
    onChangeAutoPlaceTR2(false);
    onChangeAutoPlaceTR3(false);
    onChangeAutoPlaceTR4(false);
    onChangeAutoPlaceTR5(false);
    onChangeAutoPlaceTR6(false);
    onChangeAutoPlaceTR7(false);
    onChangeAutoPlaceTR8(false);
    onChangeAutoPlaceTR9(false);
    onChangeAutoPlaceMR1(false);
    onChangeAutoPlaceMR2(false);
    onChangeAutoPlaceMR3(false);
    onChangeAutoPlaceMR4(false);
    onChangeAutoPlaceMR5(false);
    onChangeAutoPlaceMR6(false);
    onChangeAutoPlaceMR7(false);
    onChangeAutoPlaceMR8(false);
    onChangeAutoPlaceMR9(false);
    onChangeAutoPlaceBR1(false);
    onChangeAutoPlaceBR2(false);
    onChangeAutoPlaceBR3(false);
    onChangeAutoPlaceBR4(false);
    onChangeAutoPlaceBR5(false);
    onChangeAutoPlaceBR6(false);
    onChangeAutoPlaceBR7(false);
    onChangeAutoPlaceBR8(false);
    onChangeAutoPlaceBR9(false);
    onChangeAutoPreload(0);
    onChangeAutoMove(false);
    onChangeAutoChargeStation(0);
    onChangeAutoMiddleLine(false);
    onChangeAutoGamePieces(0);

    onChangeTeleopPlaceTR1(false);
    onChangeTeleopPlaceTR2(false);
    onChangeTeleopPlaceTR3(false);
    onChangeTeleopPlaceTR4(false);
    onChangeTeleopPlaceTR5(false);
    onChangeTeleopPlaceTR6(false);
    onChangeTeleopPlaceTR7(false);
    onChangeTeleopPlaceTR8(false);
    onChangeTeleopPlaceTR9(false);
    onChangeTeleopPlaceMR1(false);
    onChangeTeleopPlaceMR2(false);
    onChangeTeleopPlaceMR3(false);
    onChangeTeleopPlaceMR4(false);
    onChangeTeleopPlaceMR5(false);
    onChangeTeleopPlaceMR6(false);
    onChangeTeleopPlaceMR7(false);
    onChangeTeleopPlaceMR8(false);
    onChangeTeleopPlaceMR9(false);
    onChangeTeleopPlaceBR1(false);
    onChangeTeleopPlaceBR2(false);
    onChangeTeleopPlaceBR3(false);
    onChangeTeleopPlaceBR4(false);
    onChangeTeleopPlaceBR5(false);
    onChangeTeleopPlaceBR6(false);
    onChangeTeleopPlaceBR7(false);
    onChangeTeleopPlaceBR8(false);
    onChangeTeleopPlaceBR9(false);
    onChangeTeleopChargeStation(0);
    onChangeTeleopGamePieces(0);
    onChangePlayedDefense(0);
    onChangeWasDefended(false);
  };


  // Defaults
  const [tabletNumber, onChangeTabletNumber] = React.useState('');
  const [matchNumber, onChangeMatchNumber] = React.useState('');
  const [teamNumber, onChangeTeamNumber] = React.useState('');
  const [scouterName, onChangeScouterName] = React.useState('');

  // Auton
  const [autoPlaceTR1, onChangeAutoPlaceTR1] = React.useState(false);
  const [autoPlaceTR2, onChangeAutoPlaceTR2] = React.useState(false);
  const [autoPlaceTR3, onChangeAutoPlaceTR3] = React.useState(false);
  const [autoPlaceTR4, onChangeAutoPlaceTR4] = React.useState(false);
  const [autoPlaceTR5, onChangeAutoPlaceTR5] = React.useState(false);
  const [autoPlaceTR6, onChangeAutoPlaceTR6] = React.useState(false);
  const [autoPlaceTR7, onChangeAutoPlaceTR7] = React.useState(false);
  const [autoPlaceTR8, onChangeAutoPlaceTR8] = React.useState(false);
  const [autoPlaceTR9, onChangeAutoPlaceTR9] = React.useState(false);

  const [autoPlaceMR1, onChangeAutoPlaceMR1] = React.useState(false);
  const [autoPlaceMR2, onChangeAutoPlaceMR2] = React.useState(false);
  const [autoPlaceMR3, onChangeAutoPlaceMR3] = React.useState(false);
  const [autoPlaceMR4, onChangeAutoPlaceMR4] = React.useState(false);
  const [autoPlaceMR5, onChangeAutoPlaceMR5] = React.useState(false);
  const [autoPlaceMR6, onChangeAutoPlaceMR6] = React.useState(false);
  const [autoPlaceMR7, onChangeAutoPlaceMR7] = React.useState(false);
  const [autoPlaceMR8, onChangeAutoPlaceMR8] = React.useState(false);
  const [autoPlaceMR9, onChangeAutoPlaceMR9] = React.useState(false);

  const [autoPlaceBR1, onChangeAutoPlaceBR1] = React.useState(false);
  const [autoPlaceBR2, onChangeAutoPlaceBR2] = React.useState(false);
  const [autoPlaceBR3, onChangeAutoPlaceBR3] = React.useState(false);
  const [autoPlaceBR4, onChangeAutoPlaceBR4] = React.useState(false);
  const [autoPlaceBR5, onChangeAutoPlaceBR5] = React.useState(false);
  const [autoPlaceBR6, onChangeAutoPlaceBR6] = React.useState(false);
  const [autoPlaceBR7, onChangeAutoPlaceBR7] = React.useState(false);
  const [autoPlaceBR8, onChangeAutoPlaceBR8] = React.useState(false);
  const [autoPlaceBR9, onChangeAutoPlaceBR9] = React.useState(false);

  const [autoPreload, onChangeAutoPreload] = React.useState(0);

  const [autoMove, onChangeAutoMove] = React.useState(false);

  const [autoChargeStation, onChangeAutoChargeStation] = React.useState(0);

  const [autoMiddleLine, onChangeAutoMiddleLine] = React.useState(false);

  const [autoGamePieces, onChangeAutoGamePieces] = React.useState(0);

  // Teleop
  const [teleopPlaceTR1, onChangeTeleopPlaceTR1] = React.useState(false);
  const [teleopPlaceTR2, onChangeTeleopPlaceTR2] = React.useState(false);
  const [teleopPlaceTR3, onChangeTeleopPlaceTR3] = React.useState(false);
  const [teleopPlaceTR4, onChangeTeleopPlaceTR4] = React.useState(false);
  const [teleopPlaceTR5, onChangeTeleopPlaceTR5] = React.useState(false);
  const [teleopPlaceTR6, onChangeTeleopPlaceTR6] = React.useState(false);
  const [teleopPlaceTR7, onChangeTeleopPlaceTR7] = React.useState(false);
  const [teleopPlaceTR8, onChangeTeleopPlaceTR8] = React.useState(false);
  const [teleopPlaceTR9, onChangeTeleopPlaceTR9] = React.useState(false);

  const [teleopPlaceMR1, onChangeTeleopPlaceMR1] = React.useState(false);
  const [teleopPlaceMR2, onChangeTeleopPlaceMR2] = React.useState(false);
  const [teleopPlaceMR3, onChangeTeleopPlaceMR3] = React.useState(false);
  const [teleopPlaceMR4, onChangeTeleopPlaceMR4] = React.useState(false);
  const [teleopPlaceMR5, onChangeTeleopPlaceMR5] = React.useState(false);
  const [teleopPlaceMR6, onChangeTeleopPlaceMR6] = React.useState(false);
  const [teleopPlaceMR7, onChangeTeleopPlaceMR7] = React.useState(false);
  const [teleopPlaceMR8, onChangeTeleopPlaceMR8] = React.useState(false);
  const [teleopPlaceMR9, onChangeTeleopPlaceMR9] = React.useState(false);

  const [teleopPlaceBR1, onChangeTeleopPlaceBR1] = React.useState(false);
  const [teleopPlaceBR2, onChangeTeleopPlaceBR2] = React.useState(false);
  const [teleopPlaceBR3, onChangeTeleopPlaceBR3] = React.useState(false);
  const [teleopPlaceBR4, onChangeTeleopPlaceBR4] = React.useState(false);
  const [teleopPlaceBR5, onChangeTeleopPlaceBR5] = React.useState(false);
  const [teleopPlaceBR6, onChangeTeleopPlaceBR6] = React.useState(false);
  const [teleopPlaceBR7, onChangeTeleopPlaceBR7] = React.useState(false);
  const [teleopPlaceBR8, onChangeTeleopPlaceBR8] = React.useState(false);
  const [teleopPlaceBR9, onChangeTeleopPlaceBR9] = React.useState(false);

  const [teleopChargeStation, onChangeTeleopChargeStation] = React.useState(0);

  const [teleopGamePieces, onChangeTeleopGamePieces] = React.useState(0);

  const [playedDefense, onChangePlayedDefense] = React.useState(0);

  const [wasDefended, onChangeWasDefended] = React.useState(false);

  return (
    <View style={styles.app}>
      <View style={styles.topNav}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTabletNumber}
          value={tabletNumber}
          onEndEditing={() => {
            stopAdvertise();
            setBluetoothName(tabletNumber);
            startAdvertise();
          }}
          placeholder="TABLET #"
          inputMode="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeMatchNumber}
          value={matchNumber}
          placeholder="MATCH #"
          inputMode="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTeamNumber}
          value={teamNumber}
          placeholder="TEAM #"
          inputMode="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeScouterName}
          value={scouterName}
          placeholder="  SCOUTER NAME  "
          inputMode="text"
        />
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={gameMode ? '#fb6125' : '#f4f3f4'}
          onValueChange={() => {
            onChangeGameMode(previousState => !previousState);
          }}
          value={gameMode}
        />
      </View>

      <View
        style={{
          display: gameMode ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{gameMode ? ' TELEOP' : '  AUTON'}</Text>
        <View style={styles.communityLabel}>
          <Text>COMMUNITY</Text>
        </View>
        <View style={styles.autoPlace}>
          <View style={styles.autoPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceTR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceTR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
          <View style={styles.autoPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceMR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceMR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
          <View style={styles.autoPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeAutoPlaceBR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: autoPlaceBR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.autoPreload}>
            <Text>AutoPreload</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangeAutoPreload(0);
                }}
                style={{
                  backgroundColor: autoPreload == 0 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>NONE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeAutoPreload(1);
                }}
                style={{
                  backgroundColor: autoPreload == 1 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>CUBE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeAutoPreload(2);
                }}
                style={{
                  backgroundColor: autoPreload == 2 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>CONE</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.autoMove}>
            <Text>AutoMove</Text>
            <Switch
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={autoMove ? '#fb6125' : '#f4f3f4'}
              onValueChange={() => {
                onChangeAutoMove(previousState => !previousState);
              }}
              value={autoMove}
            />
          </View>

          <View style={styles.autoChargeStation}>
            <Text>AutoChargeStation</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangeAutoChargeStation(0);
                }}
                style={{
                  backgroundColor:
                    autoChargeStation == 0 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>NONE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeAutoChargeStation(1);
                }}
                style={{
                  backgroundColor:
                    autoChargeStation == 1 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>DOCKED</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeAutoChargeStation(2);
                }}
                style={{
                  backgroundColor:
                    autoChargeStation == 2 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>ENGAGED</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.autoMiddleLine}>
            <Text>AutoMidLine</Text>
            <Switch
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={autoMiddleLine ? '#fb6125' : '#f4f3f4'}
              onValueChange={() => {
                onChangeAutoMiddleLine(previousState => !previousState);
              }}
              value={autoMiddleLine}
            />
          </View>

          <View style={styles.autoGamePieces}>
            <Text>AutoGamePieces</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangeAutoGamePieces(autoGamePieces - 1);
                }}
                disabled={autoGamePieces == 0 ? true : false}
                style={{
                  backgroundColor: '#d1d1d1',
                  padding: 10,
                }}>
                <Text>-</Text>
              </Pressable>
              <Text style={{padding: 10}}>{autoGamePieces}</Text>
              <Pressable
                onPress={() => {
                  onChangeAutoGamePieces(autoGamePieces + 1);
                }}
                style={{
                  backgroundColor: '#d1d1d1',
                  padding: 10,
                }}>
                <Text>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          display: gameMode ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{gameMode ? ' TELEOP' : '  AUTON'}</Text>
        <View style={styles.communityLabel}>
          <Text>COMMUNITY</Text>
        </View>
        <View style={styles.teleopPlace}>
          <View style={styles.teleopPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceTR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceTR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
          <View style={styles.teleopPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceMR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceMR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
          <View style={styles.teleopPlaceRow}>
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR1(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR1 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR2(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR2 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR3(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR3 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR4(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR4 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR5(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR5 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR6(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR6 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR7(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR7 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR8(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR8 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
            <Pressable
              onPress={() => {
                onChangeTeleopPlaceBR9(previousState => !previousState);
              }}
              style={{
                backgroundColor: teleopPlaceBR9 ? '#fb6125' : '#d1d1d1',
                padding: 40,
                margin: 5,
              }}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.teleopChargeStation}>
            <Text>TeleopChargeStation</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangeTeleopChargeStation(0);
                }}
                style={{
                  backgroundColor:
                    teleopChargeStation == 0 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>NONE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeTeleopChargeStation(1);
                }}
                style={{
                  backgroundColor:
                    teleopChargeStation == 1 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>DOCKED</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeTeleopChargeStation(2);
                }}
                style={{
                  backgroundColor:
                    teleopChargeStation == 2 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>ENGAGED</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangeTeleopChargeStation(3);
                }}
                style={{
                  backgroundColor:
                    teleopChargeStation == 3 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>PARKED</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.teleopGamePieces}>
            <Text>TeleopGamePieces</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangeTeleopGamePieces(teleopGamePieces - 1);
                }}
                disabled={teleopGamePieces == 0 ? true : false}
                style={{
                  backgroundColor: '#d1d1d1',
                  padding: 10,
                }}>
                <Text>-</Text>
              </Pressable>
              <Text style={{padding: 10}}>{teleopGamePieces}</Text>
              <Pressable
                onPress={() => {
                  onChangeTeleopGamePieces(teleopGamePieces + 1);
                }}
                style={{
                  backgroundColor: '#d1d1d1',
                  padding: 10,
                }}>
                <Text>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.teleopPlayedDefense}>
            <Text>TeleopPlayedDefense</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onChangePlayedDefense(0);
                }}
                style={{
                  backgroundColor: playedDefense == 0 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>NONE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangePlayedDefense(1);
                }}
                style={{
                  backgroundColor: playedDefense == 1 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>MEH</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangePlayedDefense(2);
                }}
                style={{
                  backgroundColor: playedDefense == 2 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>GOOD</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  onChangePlayedDefense(3);
                }}
                style={{
                  backgroundColor: playedDefense == 3 ? '#fb6125' : '#d1d1d1',
                  padding: 10,
                }}>
                <Text>EPIC</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.teleopWasDefended}>
            <Text>TeleopWasDefended</Text>
            <Switch
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={wasDefended ? '#fb6125' : '#f4f3f4'}
              onValueChange={() => {
                onChangeWasDefended(previousState => !previousState);
              }}
              value={wasDefended}
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          title="SEND DATA"
          color="#d1d1d1"
          onPress={() => {
            if (teamNumber != '') {
              outputData();
            } else {
              console.log("ERROR: Enter team number");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityLabel: {
    position: 'absolute',
    left: 20,
    top: 145,
    transform: [{rotate: '-90deg'}],
  },
  autoPlace: {
    flexDirection: 'column',
  },
  autoPlaceRow: {
    flexDirection: 'row',
  },
  autoPreload: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  autoMove: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  autoChargeStation: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  autoMiddleLine: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  autoGamePieces: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  teleopPlace: {
    flexDirection: 'column',
  },
  teleopPlaceRow: {
    flexDirection: 'row',
  },
  teleopGamePieces: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  teleopChargeStation: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  teleopPlayedDefense: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  teleopWasDefended: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 50,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 20,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
