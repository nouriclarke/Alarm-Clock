import React from 'react';
import { View, Text, Switch } from 'react-native';
import { settingStyles } from '../styles/index';
import FeatherIcon from "react-native-vector-icons/Feather"

interface SettingsToggleProp {
  name: string;
  value: boolean;
  mode: boolean;
  onValueChange: (value: boolean) => void;
  icon: string;
  iconColor: string;
  iconBackgroundColor: string;
  last: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProp> = ({ name, value, mode, onValueChange, icon, iconColor, iconBackgroundColor, last}) => {
  const backgroundColor = mode ? 'darkgrey' : 'white';
  const textColor = mode ? 'white' : 'black';
  const bottomBorder = last ? 0 : 0.5;
  const borderColor = mode ? 'white' : 'black';
  return (
    <View style={[settingStyles.toggleContainer,{ backgroundColor}]}>
      <View style={[settingStyles.icon, {backgroundColor: iconBackgroundColor}]}>
        <FeatherIcon name={icon} size={31} color={iconColor} style={settingStyles.icon} />
      </View>
      <View style={[settingStyles.separate, {borderBottomWidth : bottomBorder}]}>
        <Text style={[settingStyles.settingText, { color: textColor}]}>{name}</Text>
        <View style={{ marginRight: 9 }}>
          <Switch value={value} onValueChange={onValueChange} />
        </View>
      </View>
    </View>
    // <View style={settingStyles.container}>
    //   <View style={settingStyles.content}>
    //     <Text style={settingStyles.settingText}>{name}</Text>
    //   </View>
    //   <View style={settingStyles.controls}>
    //     <Switch style={settingStyles.toggle} value={value} onValueChange={onValueChange} />
    //   </View>
    // </View>
  );
};
export default SettingsToggle;
