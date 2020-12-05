/*global DEFAULT_OPTIONS:false*/
/*global chrome:false*/

// TODO: Documentation/jsdoc
// TODO: Get better screenshots
// TODO: i8n

(function() {
    'use strict';

    // These are the sources, which initiate a tab to be opened
    // var SOURCE = {
    //     browserAction: 'browseraction',
    //     onCreated: 'onCreated',
    //     onUpdated: 'onUpdated'
    // };

    // These are the source modifiers, which add information about why the tab was a match for pinning
    // var SOURCE_MODIFIERS = {
    //     openInNewTab: 'openInNewTab',
    //     pinNewTab: 'pinNewTab',
    //     rule: 'rule',
    //     none: 'none'
    // };

    // TODO: Cannot change 'regexes' to 'rules' until migrate code is present
    // var CONSTANTS = {
    //     RULES: 'regexes',
    //     OPEN_IN_NEW: 'pin-open-in-new',
    //     PIN_NEW: 'pin-new-tab',
    //     RELEASE_TO_RIGHT: 'release-to-right'
    // };



    // TODO: Consider not having an options object; instead have a function getOptions(callback)
    var options;

    // TODO: Use settings-manager instead?
    var storage = chrome.storage.sync;

    // Keep track of already pinned tabs
    var _getSettings = function(successCallback, errorCallback) {
        // storage.get(function (result) {
        //     var error = chrome.runtime.lastError;
        //     if (error) {
        //         console.error('error getting settings', error);
        //         if ('function' === typeof errorCallback) {
        //             errorCallback.call(null, error);
        //         }
        //     } else {
        //         options = result;
        //         if ('function' === typeof successCallback) {
        //             successCallback.call(null, options);
        //         }
        //     }
        // });
    };

    // Load the settings immediately
    _getSettings();

    var _saveSettings = function(settings, successCallback, errorCallback) {
        // storage.set(settings, function (result) {
        //     var error = chrome.runtime.lastError;
        //     if (error) {
        //         debug('error saving settings', error);
        //         if ('function' === typeof errorCallback) {
        //             errorCallback.call(null, error);
        //         }
        //     } else {
        //         options = result;
        //         if ('function' === typeof successCallback) {
        //             successCallback.call(null, options);
        //         }
        //     }
        // });
    };

    chrome.runtime.onInstalled.addListener(function (details) {

        var onError = function(error) {
            debug('Error:', error);
        };

        // _getSettings(function(settings) {
        //         // TODO: Consider functions for update/install
        //         // TODO: Consider upgrade paths (1.x.x => 1.y.y)

        //         var newSettings = {};

        //         debug('chrome.runtime.onInstalled', details);
        //         if (details) {
        //             if (details.reason) {
        //                 switch(details.reason) {
        //                     case 'install':
        //                         debug('  install');
        //                         // New install
        //                         for (var index in DEFAULT_OPTIONS) {
        //                             newSettings[index] = DEFAULT_OPTIONS[index];
        //                         }
        //                         break;
        //                     case 'update':
        //                         debug('  updating');
        //                         // Upgraded install
        //                         // Set 'release-to-right' to be true as a default
        //                         if ('undefined' === typeof settings[CONSTANTS.RELEASE_TO_RIGHT]) {
        //                             newSettings[CONSTANTS.RELEASE_TO_RIGHT] = DEFAULT_OPTIONS[CONSTANTS.RELEASE_TO_RIGHT];
        //                         }
        //                         // TODO: Change regexes => rules and comment => name (also, update the RULES and options page to reflect the change)
        //                         break;
        //                     default:
        //                         debug('reason', details.reason, 'no action required');
        //                 }

        //                 // Only save if new settings are present
        //                 if (0 === newSettings.length) {
        //                     debug('  no new properties to set');
        //                 } else {
        //                     _saveSettings(newSettings, function() {
        //                         debug('  settings saved', newSettings);
        //                         // Settings saved
        //                     }, onError);
        //                 }
        //             } else {
        //                 debug('no details reason provided, not taking any action');
        //             }
        //         } else {
        //             debug('no details object passed, not taking any action');
        //         }
        //     },
        //     onError
        // );
    });


    function debug(/*message arguments*/) {
        // var args = [];
        // var thisArgs = arguments;
        // // Push the date
        // args.push(new Date());

        // _getSettings(function(settings) {
        //     if (!!settings.debug) {
        //         console.log.apply(console, args.concat(Array.prototype.slice.call(thisArgs)));
        //     }
        // }, function() {
        //     args.push('Warning: Could not get debug setting, falling back to debug');
        //     console.log.apply(console, args.concat(Array.prototype.slice.call(thisArgs)));
        // });
    }

})();