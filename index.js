/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';

import { CometChat } from '@cometchat-pro/chat';
import { APP_CONFIG } from './app.config';

import {decode,encode}from 'base-64';
import App from './Navigator/Nav';

CometChat.init(APP_CONFIG.APP_ID).then(()=>{
    this.document = new this.DOMParser().parseFromString("<?xml version='1.0'?>", 'text/xml');
});

if (!global.btoa) global.btoa = encode;
if (!global.atob)global.atob = decode;

this.DOMParser = require('xmldom').DOMParser;

AppRegistry.registerComponent(appName, () => App);
