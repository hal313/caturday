/*global DEFAULT_OPTIONS:false*/
/*global jQuery:false */
/*global TemplateManager:false */
/*global SettingsManager:false */
/*global ChromeExtensionSettingsManager:false */
/*global UISettingsManager:false */

(function() {
    'use strict';

    jQuery(function() {

        var _getNextRuleId = function() {
            if (!_getNextRuleId.seed) {
                // TODO: Seed from 0
                _getNextRuleId.seed = 1;
            }
            return _getNextRuleId.seed++;
        };

        // Pass in a default resolver map, keyed by the template name
        // We need a new rule ID in order to create unique elements in the DOM
        var templateManager = new TemplateManager.TemplateManager({'rule-template': [{regex: 'rule-id', replacement: _getNextRuleId}]});
        var settingsManager = new SettingsManager(new ChromeExtensionSettingsManager());
        var uiSettingsManager = new UISettingsManager(templateManager);

        // Load the settings
        // console.log('loaded settings', uiSettingsManager.putSettingsIntoUI());
        settingsManager.load(function(settings){console.log('loaded settings', settings);});
        settingsManager.load(uiSettingsManager.putSettingsIntoUI);

        // Enable tool tips
        jQuery('[data-toggle="tooltip"]').tooltip();

        jQuery('.js-add-template-text').click(function() {
            // TODO: Validate args
            // TODO: Validate templates exist

            var $this = jQuery(this);
            var $target = jQuery($this.data('target'));

            // Process the template
            var templateContent = templateManager.get($this.data('template-name')).process();

            // Add the template
            $target.append(jQuery(templateContent));
        });

        jQuery('#js-rule-container').on('click', '.js-remove-button', function() {
            jQuery(jQuery(this).data('target-selector')).remove();
        });

        // Kick off the 'save settings' flow
        jQuery('#js-save-button').click(function() {
            // TODO: Validate settings and show errors
            console.log('settings', uiSettingsManager.getSettingsFromUI());
            settingsManager.save(uiSettingsManager.getSettingsFromUI(), function() {
                settingsManager.load(function(settings) {
                    jQuery('#js-rule-container').empty();
                    uiSettingsManager.putSettingsIntoUI(settings);
                    jQuery('#js-settings-saved-modal').modal({keyboard: true});
                });
            });
        });

        // Open the reset modal (which may kick off the 'reset settings' flow)
        jQuery('#js-reset-button').click(function() {
            jQuery('#js-settings-confirm-reset-modal').modal({keyboard: true});
        });

        // Kick off the 'reset settings' flow (reset, confirm, reload)
        jQuery('#js-confirm-reset-button').click(function() {
            // Reset the settings and close the modal
            settingsManager.clear(function() {
                settingsManager.save(DEFAULT_OPTIONS, function() {
                    // Add a listener to reload the user settings hen the success dialog is shown
                    jQuery('#js-settings-confirm-reset-modal').one('hidden.bs.modal', function() {
                        settingsManager.load(function(settings) {
                            // Empty the array container
                            jQuery('#js-rule-container').empty();
                            uiSettingsManager.putSettingsIntoUI(settings);
                        });
                    });

                    // Hide the confirm modal
                    jQuery('#js-settings-confirm-reset-modal').modal('hide');

                    // Show the reset modal
                    jQuery('#js-settings-reset-modal').modal({keyboard: true});
                });
            });

        });

    });

})();