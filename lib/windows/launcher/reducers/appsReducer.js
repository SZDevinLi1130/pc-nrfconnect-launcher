/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { Record, List } from 'immutable';
import * as AppsActions from '../actions/appsActions';
import { getImmutableApp } from '../models';

const InitialState = Record({
    localApps: List(),
    officialApps: List(),
    isLoadingLocalApps: false,
    isLoadingOfficialApps: false,
    installingAppName: '',
    removingAppName: '',
    upgradingAppName: '',
});
const initialState = new InitialState();

function setLocalApps(state, apps) {
    const immutableApps = apps.map(app => getImmutableApp(app));
    const newState = state.set('isLoadingLocalApps', false);
    return newState.set('localApps', List(immutableApps));
}

function setOfficialApps(state, apps) {
    const immutableApps = apps.map(app => getImmutableApp(app));
    const newState = state.set('isLoadingOfficialApps', false);
    return newState.set('officialApps', List(immutableApps));
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AppsActions.LOAD_LOCAL_APPS:
            return state.set('isLoadingLocalApps', true);
        case AppsActions.LOAD_OFFICIAL_APPS:
            return state.set('isLoadingOfficialApps', true);
        case AppsActions.LOAD_LOCAL_APPS_SUCCESS:
            return setLocalApps(state, action.apps);
        case AppsActions.LOAD_OFFICIAL_APPS_SUCCESS:
            return setOfficialApps(state, action.apps);
        case AppsActions.LOAD_LOCAL_APPS_ERROR:
            return state.set('isLoadingLocalApps', false);
        case AppsActions.LOAD_OFFICIAL_APPS_ERROR:
            return state.set('isLoadingOfficialApps', false);
        case AppsActions.INSTALL_OFFICIAL_APP:
            return state.set('installingAppName', action.name);
        case AppsActions.REMOVE_OFFICIAL_APP:
            return state.set('removingAppName', action.name);
        case AppsActions.UPGRADE_OFFICIAL_APP:
            return state.set('upgradingAppName', action.name);
        case AppsActions.INSTALL_OFFICIAL_APP_SUCCESS:
            return state.set('installingAppName', initialState.installingAppName);
        case AppsActions.REMOVE_OFFICIAL_APP_SUCCESS:
            return state.set('removingAppName', initialState.removingAppName);
        case AppsActions.UPGRADE_OFFICIAL_APP_SUCCESS:
            return state.set('upgradingAppName', initialState.upgradingAppName);
        case AppsActions.INSTALL_OFFICIAL_APP_ERROR:
            return state.set('installingAppName', initialState.installingAppName);
        case AppsActions.REMOVE_OFFICIAL_APP_ERROR:
            return state.set('removingAppName', initialState.removingAppName);
        case AppsActions.UPGRADE_OFFICIAL_APP_ERROR:
            return state.set('upgradingAppName', initialState.upgradingAppName);
        default:
            return state;
    }
};

export default reducer;