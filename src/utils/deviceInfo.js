import DeviceInfo from 'react-native-device-info'

export const getDeviceId=()=>
{  
    return DeviceInfo.getUniqueID();
}
export const getDeviceCountey=()=>
{
    return DeviceInfo.getDeviceCountry();
}
export const getDeviceLanguage=()=>
{
    return DeviceInfo.getDeviceLocale();
}
export const getMyAppVersion=()=>
{ 
    //return '1';
  return DeviceInfo.getVersion();
}
export const getReadableVersion=()=>
{
    return DeviceInfo.getReadableVersion();
}