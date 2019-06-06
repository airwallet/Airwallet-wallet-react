var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _Platform=require('../../plugins/Platform');var _Platform2=_interopRequireDefault(_Platform);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var











Share=function(){function Share(){_classCallCheck(this,Share);}_createClass(Share,null,[{key:'share',
/**
   * Open a dialog to share text content.
   *
   * In iOS, Returns a Promise which will be invoked an object containing `action`, `activityType`.
   * If the user dismissed the dialog, the Promise will still be resolved with action being `Share.dismissedAction`
   * and all the other keys being undefined.
   *
   * In Android, Returns a Promise which always be resolved with action being `Share.sharedAction`.
   *
   * ### Content
   *
   *  - `message` - a message to share
   *  - `title` - title of the message
   *
   * #### iOS
   *
   *  - `url` - an URL to share
   *
   * At least one of URL and message is required.
   *
   * ### Options
   *
   * #### iOS
   *
   *  - `subject` - a subject to share via email
   *  - `excludedActivityTypes`
   *  - `tintColor`
   *
   * #### Android
   *
   *  - `dialogTitle`
   *
   */value:function(){function share(
content){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};
(0,_invariant2['default'])(
(typeof content==='undefined'?'undefined':_typeof(content))==='object'&&content!==null,
'Content to share must be a valid object');

(0,_invariant2['default'])(
typeof content.url==='string'||typeof content.message==='string',
'At least one of URL and message is required');

(0,_invariant2['default'])(
(typeof options==='undefined'?'undefined':_typeof(options))==='object'&&options!==null,
'Options must be a valid object');


if(_Platform2['default'].OS==='android'){
(0,_invariant2['default'])(
!content.title||typeof content.title==='string',
'Invalid title: title should be a string.');


return new Promise(function(resolve,reject){
resolve({
action:'dismissedAction'});

});
}else if(_Platform2['default'].OS==='ios'){
return new Promise(function(resolve,reject){
resolve({
action:'dismissedAction'});

});
}

return Promise.reject(new Error('Unsupported platform'));
}return share;}()

/**
   * The content was successfully shared.
   */},{key:'sharedAction',get:function(){function get()
{
return'sharedAction';
}return get;}()

/**
   * The dialog has been dismissed.
   * @platform ios
   */},{key:'dismissedAction',get:function(){function get()
{
return'dismissedAction';
}return get;}()}]);return Share;}();


module.exports=Share;