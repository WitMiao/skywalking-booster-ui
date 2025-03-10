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
export const AlarmOptions = [
  { label: "All", value: "" },
  { label: "Service", value: "Service" },
  { label: "ServiceInstance", value: "ServiceInstance" },
  { label: "Endpoint", value: "Endpoint" },
  { label: "ServiceRelation", value: "ServiceRelation" },
  { label: "ServiceInstanceRelation", value: "ServiceInstanceRelation" },
  { label: "EndpointRelation", value: "EndpointRelation" },
];
export const EventsDetailHeaders = [
  { text: "eventID", class: "uuid" },
  { text: "eventName", class: "name" },
  { text: "eventsType", class: "type" },
  { text: "startTime", class: "startTime" },
  { text: "endTime", class: "endTime" },
];

export const AlarmDetailCol = [
  {
    label: "scope",
    value: "scope",
  },
  {
    label: "startTime",
    value: "startTime",
  },
  {
    label: "tags",
    value: "tags",
  },
  {
    label: "message",
    value: "message",
  },
  {
    label: "events",
    value: "eventDetail",
  },
  {
    label: "expression",
    value: "expression",
  },
  {
    label: "snapshot",
    value: "snapshot",
  },
];

export const EventsDetailKeys = [
  { text: "eventID", class: "uuid" },
  { text: "eventName", class: "name" },
  { text: "eventsType", class: "type" },
  { text: "startTime", class: "startTime" },
  { text: "endTime", class: "endTime" },
  { text: "eventsMessage", class: "message" },
  { text: "eventSource", class: "source" },
];
