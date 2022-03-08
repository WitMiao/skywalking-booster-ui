<!-- Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. -->
<template>
  <div class="widget-config flex-v">
    <div class="graph" v-loading="loading">
      <div class="header">
        <span>{{ dashboardStore.selectedGrid.widget.title }}</span>
        <div class="tips" v-show="dashboardStore.selectedGrid.widget.tips">
          <el-tooltip :content="dashboardStore.selectedGrid.widget.tips">
            <Icon iconName="info_outline" size="sm" />
          </el-tooltip>
        </div>
      </div>
      <div class="render-chart">
        <component
          :is="dashboardStore.selectedGrid.graph.type"
          :intervalTime="appStoreWithOut.intervalTime"
          :data="states.source"
          :config="{
            ...dashboardStore.selectedGrid.graph,
            i: dashboardStore.selectedGrid.i,
            metrics: dashboardStore.selectedGrid.metrics,
            metricTypes: dashboardStore.selectedGrid.metricTypes,
          }"
        />
        <div v-show="!dashboardStore.selectedGrid.graph.type" class="no-data">
          {{ t("noData") }}
        </div>
      </div>
    </div>
    <div class="collapse" :style="{ height: configHeight + 'px' }">
      <el-collapse
        v-model="states.activeNames"
        :style="{ '--el-collapse-header-font-size': '15px' }"
      >
        <el-collapse-item :title="t('selectVisualization')" name="1">
          <MetricOptions @update="getSource" @loading="setLoading" />
        </el-collapse-item>
        <el-collapse-item :title="t('graphStyles')" name="2">
          <component :is="`${dashboardStore.selectedGrid.graph.type}Config`" />
        </el-collapse-item>
        <el-collapse-item :title="t('widgetOptions')" name="3">
          <WidgetOptions />
        </el-collapse-item>
        <el-collapse-item :title="t('standardOptions')" name="4">
          <StandardOptions />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="footer">
      <el-button size="small">
        {{ t("cancel") }}
      </el-button>
      <el-button size="small" type="primary" @click="applyConfig">
        {{ t("apply") }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDashboardStore } from "@/store/modules/dashboard";
import { useAppStoreWithOut } from "@/store/modules/app";
import { Option } from "@/types/app";
import graphs from "../graphs";
import configs from "./widget/graph-styles";
import WidgetOptions from "./components/WidgetOptions.vue";
import StandardOptions from "./widget/StandardOptions.vue";
import MetricOptions from "./widget/MetricOptions.vue";

export default defineComponent({
  name: "ConfigEdit",
  components: {
    ...graphs,
    ...configs,
    WidgetOptions,
    StandardOptions,
    MetricOptions,
  },
  setup() {
    const configHeight = document.documentElement.clientHeight - 520;
    const { t } = useI18n();
    const dashboardStore = useDashboardStore();
    const appStoreWithOut = useAppStoreWithOut();
    const loading = ref<boolean>(false);
    const states = reactive<{
      activeNames: string;
      source: any;
      index: string;
      visType: Option[];
    }>({
      activeNames: "1",
      source: {},
      index: dashboardStore.selectedGrid.i,
      visType: [],
    });

    function getSource(source: unknown) {
      states.source = source;
    }

    function setLoading(load: boolean) {
      loading.value = load;
    }

    function applyConfig() {
      dashboardStore.setConfigs(dashboardStore.selectedGrid);
      dashboardStore.setConfigPanel(false);
    }

    return {
      states,
      loading,
      t,
      appStoreWithOut,
      configHeight,
      dashboardStore,
      applyConfig,
      getSource,
      setLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.widget-config {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.graph {
  position: relative;
  min-width: 1280px;
  border: 1px solid #eee;
  background-color: #fff;
}

.header {
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: aliceblue;
  font-size: 12px;
  position: relative;
}

.tips {
  position: absolute;
  right: 5px;
  top: 0;
}

.render-chart {
  padding: 5px;
  height: 400px;
  width: 100%;
}

.selectors {
  width: 500px;
  margin-right: 10px;
}

.el-collapse-item__header {
  font-weight: bold;
}

.config {
  min-width: 1280px;
}

.no-data {
  font-size: 14px;
  text-align: center;
  line-height: 400px;
}

.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  border-top: 1px solid #eee;
  padding: 10px;
  text-align: right;
  width: 100%;
  background-color: #fff;
}

.collapse {
  margin-top: 10px;
  overflow: auto;
}

.ds-name {
  margin-bottom: 10px;
}
</style>