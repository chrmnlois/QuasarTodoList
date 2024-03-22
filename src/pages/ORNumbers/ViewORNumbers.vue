<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="or-numbers">
      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div
            class="flex justifty-start itempt-center onboarding-text-accent-0 q-mt-sm q-mb-lg z gt-xs"
          >
            <q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
            <h5 class="text-26 text-semibold q-my-none q-ml-sm">
              {{ dataDetails.receipt_type }} Details
            </h5>
          </div>

          <q-separator class="q-my-md" />
          <div class="q-px-md q-py-md">
            <p class="text-20">Receipt Type : {{ dataDetails.receipt_type }}</p>
            <p class="text-20">Date : {{ dataDetails.date }}</p>
            <p class="text-20">
              Received From : {{ dataDetails.received_from }}
            </p>
            <p class="text-20">Tin Number : {{ dataDetails.tin_number }}</p>
            <p class="text-20">Address : {{ dataDetails.address }}</p>
            <p class="text-20">Amount : {{ dataDetails.amount }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script src="./scripts/ViewORNumbers.js"></script>

<style lang="scss">
@import "./styles/ORNumbers.scss";
</style>
