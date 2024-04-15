<!-- TodoList User Interface Layout -->
<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <!-- Todolist Main Wrapper -->
    <div class="create-todo-list">
      <MainDialog :content="$options.components.CustomModal" />

      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div class="flex justify-between q-mt-sm q-mb-lg">
            <!-- Create A New Task Title -->
            <div
              class="flex justifty-start items-center onboarding-text-accent-0"
            >
              <q-btn
                @click="$router.go(-1)"
                round
                dense
                flat
                icon="arrow_back"
              />
              <h5 class="text-26 text-bold q-my-none q-ml-md">
                Create A New Task
              </h5>
            </div>
          </div>

          <div class="justify-between q-mt-none q-mb-lg">
            <q-form ref="form" @submit.prevent="addTodo()">
              <div class="justify-start q-mt-none q-mb-none q-ml-sm gt-xs">
                <!-- Task Title -->
                <h5 class="text-14 text-weight-semibold q-mb-none">
                  Task Title <span class="required-indicator">*</span>
                </h5>
              </div>

              <div class="justify-start q-mb-sm q-ml-sm q-mt-none gt-xs">
                <q-input
                  dense
                  borderless
                  placeholder="Task Name"
                  v-model="taskTitle"
                  :rules="[(val) => (val !== null && val !== '') || '']"
                  hide-bottom-space
                  class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10"
                />
              </div>

              <div class="justify-start q-mt-md q-mb-sm q-ml-sm gt-xs">
                <!-- START - Standard infinite form -->
                <div v-for="(keyResult, index) in keyResults" :key="index">
                  <div
                    class="onboarding-border-accent-0 onboarding-border-radius-15 q-px-md q-py-lg q-mt-md standard-form-width"
                  >
                    <!-- Task Name -->
                    <div class="field">
                      <div class="flex justify-end">
                        <div v-if="keyResults.length > 1 && index !== 0">
                          <q-btn
                            flat
                            class="delete_button onboarding-buttontext-grey q-pa-none"
                            size="10px"
                            icon="iconfont icon-delete-fill"
                            @click="
                              route.params.id
                                ? openDialog(index)
                                : removeKeyResult(index)
                            "
                          />
                          <q-btn
                            flat
                            class="arrow_button onboarding-buttontext-grey q-pa-none"
                            size="10px"
                            icon="arrow_drop_up"
                            @click="
                              route.params.id
                                ? openDialog(index)
                                : removeKeyResult(index)
                            "
                          />
                        </div>
                      </div>
                      <div class="flex justify-between items-center">
                        <q-item-label
                          class="label key_result text-weight-semibold q-mb-sm"
                          >Task Name
                          <span class="required-indicator"
                            >*</span
                          ></q-item-label
                        >
                      </div>

                      <q-input
                        v-model="keyResult.result_name"
                        dense
                        borderless
                        placeholder="Account Name"
                        :rules="[(val) => (val !== null && val !== '') || '']"
                        hide-bottom-space
                        class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10"
                      />
                    </div>

                    <!-- Time -->
                    <div class="field q-mt-md">
                      <div class="flex justify-between items-center">
                        <q-item-label
                          class="label key_result text-weight-semibold q-mb-sm"
                          >Time</q-item-label
                        >
                      </div>
                      <q-input
                        v-model="keyResult.selectedTime"
                        dense
                        borderless
                        placeholder="0:00"
                        class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10"
                      >
                        <template v-slot:append>
                          <q-icon
                            name="schedule"
                            class="cursor-pointer"
                            color="black"
                          >
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="keyResult.selectedTime"
                                display-format="h:mm A"
                                color="white"
                                text-color="blue"
                              >
                                <div
                                  class="row items-center justify-center q-mt-md"
                                >
                                  <q-btn
                                    v-close-popup
                                    label="Cancel"
                                    color="none"
                                    flat
                                    rounded
                                    dense
                                    no-caps
                                    class="time-cancel-btn"
                                    @click="cancelTime"
                                  />
                                  <q-btn
                                    v-close-popup
                                    flat
                                    rounded
                                    no-caps
                                    dense
                                    class="time-save-btn onboarding-border-accent-0 onboarding-bg-accent-0 text-white q-ml-md"
                                    label="Save"
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>

                <div
                  class="onboarding-border-radius-15 flex justify-center standard-form-width q-my-sm q-pa-md onboarding-border-1-dashed"
                >
                  <q-btn
                    flat
                    round
                    class="onboarding-bg-accent-0 text-white onboarding-text-accent-1"
                    id="generateKeyInput"
                    @click="addKeyResult()"
                    no-caps
                    icon="add"
                  />
                </div>
                <!-- END - Standard infinite form -->
              </div>

              <div class="justify-start q-mt-lg q-mb-none q-ml-sm gt-xs">
                <!-- Cancel Button -->
                <q-btn
                  rounded
                  dense
                  flat
                  no-caps
                  label="Cancel"
                  class="cancel-btn"
                  @click="$router.go(-1)"
                />
                <!-- Save Button -->
                <q-btn
                  flat
                  rounded
                  no-caps
                  dense
                  class="save-btn onboarding-border-accent-0 onboarding-bg-accent-0 text-white q-ml-md"
                  type="submit"
                  label="Save"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<!-- Script -->
<script src="./scripts/CreateTodoList.js"></script>

<!-- Style -->
<style lang="scss" scope>
@import url("./styles/CreateTodoList.scss");
</style>
