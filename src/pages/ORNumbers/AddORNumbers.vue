<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="onboarding-text-primary">
      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div
            class="flex justifty-start itempt-center onboarding-text-accent-0 q-mt-sm q-mb-lg z gt-xs"
          >
            <q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
            <h5 class="text-26 text-semibold q-my-none q-ml-sm">
              {{ route.query.id ? "Edit" : "Add New" }} Range
            </h5>
          </div>
        </div>
        <div
          class="onboarding-main-scroll standard-scroll padding-top-bottom-lg q-mb-xl"
        >
          <q-form
            ref="newRangeForm"
            greedy
            @submit="route.query.id ? updateORNumbers() : addNewRange()"
          >
            <div>
              <label class="text-weight-medium">Select</label>
              <q-select
                ref="assign_toRef"
                class="onboarding-border-radius-10 onboarding-border-accent-0 onboarding-select-field standard q-mt-sm"
                dense
                borderless
                v-model="form.receipt_type"
                option-label="name"
                option-value="value"
                :label="!form.receipt_type ? 'Select type' : ''"
                emit-value
                map-options
                :options="fundTypes"
                hide-bottom-space
                optiononboarding-selected-class="onboarding-selected-class"
                popup-content-class="onboarding-option-style-light"
                transition-show="scale"
                transition-hide="scale"
                behavior="menu"
                :rules="[(val) => (val !== null && val !== '') || '']"
              />
            </div>
            <div class="q-mt-md">
              <label class="text-weight-medium">Date</label>
              <q-input
                dense
                borderless
                type="date"
                v-model="form.date"
                placeholder="Input"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              />
            </div>
            <div class="q-mt-md">
              <label class="text-weight-medium">Received From</label>
              <q-input
                dense
                borderless
                v-model="form.received_from"
                placeholder="Store Name"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              />
            </div>
            <div class="q-mt-md">
              <label class="text-weight-medium">Tin Number</label>
              <q-input
                dense
                borderless
                type="number"
                v-model="form.tin_number"
                placeholder="0000-000-0000"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              />
            </div>
            <div class="q-mt-md">
              <label class="text-weight-medium">Address</label>
              <q-input
                dense
                borderless
                v-model="form.address"
                placeholder="Address"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              />
            </div>
            <div class="q-mt-md">
              <label class="text-weight-medium">Amount</label>
              <q-input
                dense
                borderless
                v-model="form.amount"
                type="number"
                placeholder="Php"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              />
            </div>

            <div
              :class="$q.screen.width < 767 && 'fixed-bottom q-mb-lg q-mx-xl'"
            >
              <q-btn
                :loading="btnLoadingState"
                type="submit"
                rounded
                dense
                flat
                no-caps
                clickable
                :label="route.query.id ? 'Update' : 'Add Range'"
                class="onboarding-buttononboarding-border-accent-0 onboarding-bg-accent-0 text-white q-px-xl q-mt-lg"
              />
            </div>
          </q-form>
        </div>
      </div>
      <q-inner-loading
        class="absolute-center onboarding-bg-primary text-20 full-width full-height onboarding-text-accent-0"
        :showing="pageLoadingState"
      />
    </div>
  </transition>
</template>

<script src="./scripts/AddORNumbers.js"></script>

<style lang="scss">
@import "./styles/ORNumbers.scss";
</style>
