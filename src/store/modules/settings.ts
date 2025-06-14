/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { defineStore } from "pinia";
import { store } from "@/store";
import fetchQuery from "@/graphql/http";
import type { ClusterNode, ConfigTTL } from "@/types/settings";
import { HotAndWarmOpt } from "@/views/settings/data";
import { TTLTypes, TTLColdMap } from "../data";

interface SettingsState {
  clusterNodes: ClusterNode[];
  debuggingConfig: Indexable<string>;
  configTTL: Recordable<ConfigTTL>;
}

export const settingsStore = defineStore({
  id: "settings",
  state: (): SettingsState => ({
    clusterNodes: [],
    debuggingConfig: {},
    configTTL: {},
  }),
  actions: {
    async getClusterNodes() {
      const response = await fetchQuery({
        method: "get",
        path: "ClusterNodes",
      });
      this.clusterNodes = response.nodes;
      return response;
    },
    async getConfigTTL() {
      const response = await fetchQuery({
        method: "get",
        path: "ConfigTTL",
      });
      for (const item of Object.keys(response)) {
        const rows = [];
        const row: Indexable<string> = { type: TTLTypes.HotAndWarm };
        const rowCold: Indexable<string> = { type: TTLTypes.Cold };
        for (const key of Object.keys(response[item])) {
          if (HotAndWarmOpt.includes(key)) {
            row[key] = response[item][key];
          } else {
            rowCold[TTLColdMap[key] as string] = response[item][key];
          }
        }
        rows.push(row, rowCold);
        this.configTTL[item] = rows;
      }
      return response;
    },
    async getDebuggingConfigDump() {
      const response = await fetchQuery({
        method: "get",
        path: "DebuggingConfigDump",
      });
      this.debuggingConfig = response;
      return response;
    },
  },
});

export function useSettingsStore(): Recordable {
  return settingsStore(store);
}
