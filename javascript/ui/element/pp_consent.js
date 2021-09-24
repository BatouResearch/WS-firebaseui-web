/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Binds handlers for email UI element.
 */

goog.provide('firebaseui.auth.ui.element.ppConsent');

goog.require('firebaseui.auth.soy2.strings');
goog.require('firebaseui.auth.ui.element');
goog.require('goog.asserts');
goog.require('goog.string');
goog.require('goog.ui.Component');


goog.scope(function() {
    var element = firebaseui.auth.ui.element;
    var strings = firebaseui.auth.soy2.strings;

    /**
     * @return {Element} The checkbox input.
     * @this {goog.ui.Component}
     */
    element.ppConsent.getCheckboxElement = function() {
        return this.getElementByClass('firebaseui-pp-checkbox');
    };

    /**
     * Validates the field and shows/clears the error message if necessary.
     * @param {Element} checkboxElement The checkbox input.
     * @param {Element} errorElement The error panel.
     * @return {boolean} True if the field is valid.
     * @private
     */
    element.ppConsent.validate_ = function(checkboxElement, errorElement) {
        var value = element.getInputValue(checkboxElement) !== null;
        if (!value) {
            //element.setValid(checkboxElement, false);
            element.show(errorElement, strings.errorMissingPP().toString());
            return false;
        } else {
            //element.setValid(checkboxElement, true);
            element.hide(errorElement);
            return true;
        }
    };


    /**
     * Initializes the email element.
     * @param {function()=} opt_onEnter Callback to invoke when the ENTER key is
     *     detected.
     * @this {goog.ui.Component}
     */
    element.ppConsent.initCheckboxElement = function(opt_onEnter) {
        var checkboxElement = element.ppConsent.getCheckboxElement.call(this);
        var errorElement = element.ppConsent.getCheckboxErrorElement.call(this);
        element.listenForInputEvent(this, checkboxElement, function(e) {
            // Clear the error message.
            if (element.isShown(errorElement)) {
                //element.setValid(checkboxElement, true);
                element.hide(errorElement);
            }
        });
    };

    /**
     * @return {Element} The error panel.
     * @this {goog.ui.Component}
     */
    element.ppConsent.getCheckboxErrorElement = function() {
        return this.getElementByClass('firebaseui-id-pp-consent-error');
    };

    /**
     * @return {?boolean} The checkbox in the input.
     * @this {goog.ui.Component}
     */
    element.ppConsent.getCheckbox = function() {
        var ppElement = element.ppConsent.getCheckboxElement.call(this);
        var ppErrorElement = element.ppConsent.getCheckboxErrorElement.call(this);
        if (!element.ppConsent.validate_(ppElement, ppErrorElement)) {
            return null
        }
        return element.getInputValue(element.ppConsent.getCheckboxElement.call(this)) !== null;
    };
});
