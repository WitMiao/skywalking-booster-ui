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
  <div class="trace-table-charts">
    <Graph
      :data="data"
      :traceId="traceId"
      :type="TraceGraphType.TABLE"
      :headerType="headerType"
      @select="getSelectedSpan"
    />
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from "vue";
  import type { Span } from "@/types/trace";
  import Graph from "./D3Graph/Index.vue";
  import { TraceGraphType } from "./constant";

  defineProps({
    data: { type: Array as PropType<Span[]>, default: () => [] },
    traceId: { type: String, default: "" },
    headerType: { type: String, default: "" },
  });
  const emits = defineEmits(["select"]);

  function getSelectedSpan(span: Span) {
    emits("select", span);
  }
</script>
<style lang="scss" scoped>
  .trace-table-charts {
    overflow: auto;
    padding: 10px;
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
