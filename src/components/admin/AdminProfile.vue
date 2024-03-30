<template>
  <div id="app">
    <div class="row mb-2">
      <div class="col">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="c1"
            v-model="active"
          />
          <label class="custom-control-label" for="c1">Active</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="c2"
            v-model="away"
          />
          <label class="custom-control-label" for="c2">Away</label>
        </div>
      </div>
    </div>
    <dataset
      v-slot="{ ds }"
      :ds-data="users"
      :ds-filter-fields="filterFields"
      :ds-sortby="['name']"
      :ds-search-in="[
        'balance',
        'birthdate',
        'name',
        'company',
        'email',
        'phone',
        'address',
        'favoriteAnimal',
      ]"
      :ds-search-as="{}"
    >
      <div class="row mb-2" :data-page-count="ds.dsPagecount">
        <div class="col-md-6 mb-2 mb-md-0">
          <dataset-show
            :ds-show-entries="selected"
            @changed="selected = $event"
          />
        </div>
        <div class="col-md-6">
          <dataset-search ds-search-placeholder="Search..." />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <dataset-item class="form-row mb-3">
            <template #default="{ row, rowIndex }">
              <div class="col-md-4">
                <div class="card mb-2">
                  <div class="card-body pt-3 pb-2 px-3">
                    <h5
                      class="card-title text-truncate mb-2"
                      :title="`Index: ${rowIndex}`"
                    >
                      <span :class="['font-16', statusClass[row.onlineStatus]]"
                        >⬤</span
                      >
                      {{ row.name }}
                    </h5>
                    <h6 class="card-subtitle text-truncate text-muted">
                      {{ row.email }}
                    </h6>
                    <p class="card-text text-truncate mb-0">
                      {{ row.balance }}
                    </p>
                    <p class="card-text text-truncate text-right">
                      {{ row.birthdate }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <template #noDataFound>
              <div class="col-md-12 pt-2">
                <p class="text-center">No results found</p>
              </div>
            </template>
          </dataset-item>
        </div>
      </div>
      <div
        class="d-flex flex-md-row flex-column justify-content-between align-items-center"
      >
        <dataset-info class="mb-2 mb-md-0" />
        <dataset-pager />
      </div>
    </dataset>
  </div>
</template>

<script>
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

import users from "./users.json";

export default {
  name: "App",
  components: {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
  },
  data() {
    return {
      users,
      statusClass: {
        Active: "text-success",
        Away: "text-warning",
        "Do not disturb": "text-danger",
        Invisible: "text-secondary",
      },
      selected: 5,
      active: true,
      away: true,
    };
  },
  computed: {
    filterFields() {
      const self = this;
      return {
        onlineStatus(value) {
          if (value === "Active" && self.active) {
            return true;
          }
          if (value === "Away" && self.away) {
            return true;
          }
          return false;
        },
      };
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
