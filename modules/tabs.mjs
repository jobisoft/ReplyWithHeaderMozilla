/*
 * Copyright (c) Jeevanandam M. (jeeva@myjeeva.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at
 * https://github.com/jeevatkm/ReplyWithHeaderMozilla/blob/master/LICENSE
 */

// RWH Tabs Module

import { rwhLogger } from './logger.mjs';

const tabListeners = {};

messenger.tabs.onCreated.addListener(async (tab) => {
    tabListeners[tab.type](tab);
});

export async function findTab(messageId) {
    let tabs = await messenger.tabs.query();
    for (let tab of tabs) {
        let msg = await messenger.messageDisplay.getDisplayedMessage(tab.id);
        if (msg?.id == messageId) {
            return tab;
        }
    }
    return null;
}

export async function register(tabType, listener) {
    if (tabListeners[tabType]) {
        rwhLogger.warn(`Overwriting existing listener for ${tabType}`)
    }

    tabListeners[tabType] = listener;
}
