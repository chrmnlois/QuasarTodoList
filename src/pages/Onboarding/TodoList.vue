<template>
     <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
    <div class="todo-list row q-pt-lg q-pl-lg">
        <div class="col-6">
            <div class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs">In-Progress</div>
            <div class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mr-md"
          >
            <q-expansion-item expand-separator label="To-Do List">
              <template v-slot:header="{ expanded }">
                <q-item-section
                  v-if="!expanded"
                  class="onboarding-text-accent-0 text-semibold"
                >
                  Task Name
                </q-item-section>
                <q-item-section
                  v-if="!expanded"
                  side
                  class="onboarding-text-accent-0 text-semibold"
                >
                  January 0, 2024
                </q-item-section>
                <q-item-section
                  v-else
                  class="onboarding-text-accent-0 text-semibold"
                >
                  To-Do List
                </q-item-section>
                <q-item-section v-if="expanded" side>
                  <q-icon name="more_horiz" />
                </q-item-section>
              </template>


              <q-card>
                <q-card-section class="q-pa-none">
                  <div class="col">
                    <q-list>
                      <!-- Loop through tasks -->
                      <q-item
                        class="q-py-none"
                      >
                        <q-item-section>
                          <q-checkbox
                          />
                        </q-item-section>
                        <q-item-section>Task Name</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div
                    class="text-right onboarding-text-accent-0 text-semibold"
                  >
                    January 0, 2024
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>

        </div>
        <div class="col-6">
            <div class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs q-mr-md">In-Progress</div>
            <div class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10"
          >
            <q-expansion-item expand-separator label="To-Do List">
              <template v-slot:header="{ expanded }">
                <q-item-section
                  v-if="!expanded"
                  class="onboarding-text-accent-0 text-semibold"
                >
                  Task Name
                </q-item-section>
                <q-item-section
                  v-if="!expanded"
                  side
                  class="onboarding-text-accent-0 text-semibold"
                >
                  January 0, 2024
                </q-item-section>
                <q-item-section
                  v-else
                  class="onboarding-text-accent-0 text-semibold"
                >
                  To-Do List
                </q-item-section>
                <q-item-section v-if="expanded" side>
                  <q-icon name="more_horiz" />
                </q-item-section>
              </template>


              <q-card>
                <q-card-section class="q-pa-none">
                  <div class="col">
                    <q-list>
                      <!-- Loop through tasks -->
                      <q-item
                        class="q-py-none"
                      >
                        <q-item-section>
                          <q-checkbox
                          />
                        </q-item-section>
                        <q-item-section>Task Name</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div
                    class="text-right onboarding-text-accent-0 text-semibold"
                  >
                    January 0, 2024
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
    </div>
    </transition>
    
</template>

<style lang="scss" scope>
@import url("./styles/TodoList.scss");
</style>

<script src="./scripts/TodoList.js"></script>