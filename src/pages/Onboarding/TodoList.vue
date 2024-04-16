<template>
  <!-- TodoList Main Wrapper -->
  <div class="todo-list">
    <MainDialog :content="$options.components.CustomModal" />

    <div v-if="!pageLoadingState">
      <div class="q-px-lg q-pt-lg gt-xs q-ml-sm q-mr-sm">
        <div class="flex justify-between q-mt-sm q-mb-lg">
          <!-- Title -->
          <h5 class="text-26 text-bold q-my-none onboarding-text-accent-0">
            To-Do List
          </h5>

          <div class="flex justify-end">
            <!-- Create a New Task Button -->
            <q-btn
              flat
              rounded
              no-caps
              dense
              class="onboarding-border-accent-0 onboarding-bg-accent-0 text-white q-px-md q-ml-md"
              @click="$router.push({ name: 'create-todo' })"
              label="Create a new task"
            />
          </div>
        </div>

        <div class="flex justify-between q-mb-md gt-xs">
          <!-- Filter -->
          <div class="flex itempt-center">
            <Filters
              dynamicHeight="34"
              :labelVisible="true"
              :searchVisible="true"
              :filterDateVisible="false"
              pathEndPoint="orNumbers"
            />
          </div>
        </div>

        <!-- ************************* Column 1 ************************* -->
        <div class="todo-list row q-pt-sm q-pl-xxs">
          <!-- In Process Column -->
          <div class="col-6">
            <div
              class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs"
            >
              In-Process
            </div>

            <div
              v-for="(taskSet, index) in myTasks.slice().reverse()"
              :key="`taskSet-${index}`"
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mr-md q-mt-sm"
            >
              <q-expansion-item expand-separator :label="taskSet.title">
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <div
                      v-if="taskSet.title"
                      :class="{
                        'onboarding-text-accent-0': !expanded,
                        'text-semibold': !expanded,
                      }"
                    >
                      {{ taskSet.title }}
                    </div>
                    <div v-else class="onboarding-text-accent-0 text-semibold">
                      Task Name
                    </div>
                  </q-item-section>
                  <q-item-section
                    v-if="!expanded"
                    side
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    {{ todaysDate }}
                  </q-item-section>
                  <q-item-section
                    v-else
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    <template v-if="taskSet && taskSet.title">
                      {{ taskSet.title }}
                    </template>
                    <template v-else> Task Name </template>
                  </q-item-section>
                  <q-item-section v-if="expanded" side>
                    <q-popup-proxy
                      ref="popupProxy"
                      class="popup-menu onboarding-border-accent-0 onboarding-border-radius-8"
                    >
                      <q-list class="q-mt-sm q-mb-sm">
                        <q-item
                          clickable
                          v-close-popup
                          @click="$router.push({ name: 'edit-todo' })"
                          class="onboarding-bg-hover-accent-0"
                        >
                          <q-item-section class="onboarding-text-hover-accent-3"
                            >Edit</q-item-section
                          >
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          class="onboarding-bg-hover-accent-0"
                          @click="deleteTask(taskSet)"
                        >
                          <q-item-section class="onboarding-text-hover-accent-3"
                            >Delete</q-item-section
                          >
                        </q-item>
                      </q-list>
                    </q-popup-proxy>
                    <q-icon
                      name="more_horiz"
                      @click.stop="$refs.popupProxy.show()"
                    />
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section class="q-pa-none">
                    <div
                      class="col"
                      v-for="(task, index) in taskSet.todos"
                      :key="index"
                    >
                      <q-list v-if="!task.checked">
                        <q-item class="q-py-none q-px-sm">
                          <q-item-section>
                            <!-- Initialize the checked property for each task -->
                            <q-checkbox
                              v-model="task.checked"
                              v-on:click="handleCheckboxChange(task)"
                              @click="inprogressNotify"
                              :label="task.name"
                              color="teal"
                              class="task-checkbox"
                            />
                          </q-item-section>
                          <q-item-section class="q-ml-xl">{{
                            taskSet.selectedTimes[index]
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div
                      class="text-right onboarding-text-accent-0 text-semibold q-mr-md q-mt-md"
                    >
                      {{ todaysDate }}
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <!-- April 14, 2024 -->
            <div
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mr-md q-mt-sm"
            >
              <q-expansion-item
                expand-separator
                label="To-Do List"
                default-opened
              >
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <template v-if="sampleTasks && sampleTasks.length > 0">
                      <div
                        v-if="sampleTasks[0] && sampleTasks[0].title"
                        :class="{
                          'onboarding-text-accent-0': !expanded,
                          'text-semibold': !expanded,
                        }"
                      >
                        {{ sampleTasks[0].title }}
                      </div>
                      <div
                        v-else
                        class="onboarding-text-accent-0 text-semibold"
                      >
                        To-Do List
                      </div>
                    </template>
                    <template v-else>
                      <div class="onboarding-text-accent-0 text-semibold">
                        To-Do List
                      </div>
                    </template>
                  </q-item-section>
                  <q-item-section
                    v-if="!expanded"
                    side
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    April 14, 2024
                  </q-item-section>
                  <q-item-section
                    v-else
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    <template v-if="sampleTasks && sampleTasks.length > 0">
                      <div v-if="sampleTasks[0] && sampleTasks[0].title">
                        {{ sampleTasks[0].title }}
                      </div>
                      <div v-else>To-Do List</div>
                    </template>
                    <template v-else> To-Do List </template>
                  </q-item-section>
                  <q-item-section v-if="expanded" side>
                    <q-popup-proxy
                      ref="popupProxy"
                      class="popup-menu onboarding-border-accent-0 onboarding-border-radius-8"
                    >
                      <q-list class="q-mt-sm q-mb-sm">
                        <q-item
                          clickable
                          v-close-popup
                          @click="$router.push({ name: 'edit-todo' })"
                          class="onboarding-bg-hover-accent-0"
                        >
                          <q-item-section class="onboarding-text-hover-accent-3"
                            >Edit</q-item-section
                          >
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          class="onboarding-bg-hover-accent-0"
                          @click="deleteTask"
                        >
                          <q-item-section class="onboarding-text-hover-accent-3"
                            >Delete</q-item-section
                          >
                        </q-item>
                      </q-list>
                    </q-popup-proxy>
                    <q-icon
                      name="more_horiz"
                      @click.stop="$refs.popupProxy.show()"
                    />
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section class="q-pa-none">
                    <div
                      class="col"
                      v-for="sampleTask in sampleMyTasks"
                      :key="sampleTask.id"
                    >
                      <q-list v-if="!sampleTask.checked">
                        <q-item class="q-py-none q-px-sm">
                          <q-item-section class="q-mr-xl">
                            <q-checkbox
                              v-model="sampleTask.checked"
                              @input="handleCheckboxChangeSample(sampleTask)"
                              @click="inprogressNotify"
                              :label="sampleTask.todo"
                              color="teal"
                              class="task-checkbox"
                            />
                          </q-item-section>
                          <q-item-section class="q-ml-xl">{{
                            sampleTask.selectedTime
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div
                      class="text-right onboarding-text-accent-0 text-semibold q-mr-md q-mt-md"
                    >
                      April 14, 2024
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>

          <!-- ************************* Column 2 ************************* -->
          <div class="col-6">
            <!-- Done -->
            <div
              class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs q-mr-md"
            >
              Done
            </div>
            <div
              v-for="(taskSet, index) in myTasks.slice().reverse()"
              :key="`taskSet-${index}`"
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            >
              <q-expansion-item expand-separator :label="taskSet.title">
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <div
                      v-if="taskSet.title"
                      :class="{
                        'onboarding-text-accent-0': !expanded,
                        'text-semibold': !expanded,
                      }"
                    >
                      {{ taskSet.title }}
                    </div>
                    <div v-else class="onboarding-text-accent-0 text-semibold">
                      Task Name
                    </div>
                  </q-item-section>
                  <q-item-section
                    v-if="!expanded"
                    side
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    {{ todaysDate }}
                  </q-item-section>
                  <q-item-section
                    v-else
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    <template v-if="taskSet && taskSet.title">
                      {{ taskSet.title }}
                    </template>
                    <template v-else> Task Name </template>
                  </q-item-section>
                  <q-item-section v-if="expanded" side> </q-item-section>
                </template>

                <q-card>
                  <q-card-section class="q-pa-none">
                    <div
                      class="col"
                      v-for="(task, index) in taskSet.todos"
                      :key="index"
                    >
                      <q-list v-if="task.checked">
                        <q-item class="q-py-none q-px-sm">
                          <q-item-section>
                            <!-- Initialize the checked property for each task -->
                            <q-checkbox
                              v-model="task.checked"
                              v-on:click="handleCheckboxChange(task)"
                              @click="doneNotify"
                              :label="task.name"
                              color="teal"
                              class="task-checkbox"
                            />
                          </q-item-section>
                          <q-item-section class="q-ml-xl">{{
                            todaysTime
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div
                      class="text-right onboarding-text-accent-0 text-semibold q-mr-md q-mt-md"
                    >
                      {{ todaysDate }}
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>

            <!-- April 14, 2024 -->
            <div
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            >
              <q-expansion-item
                expand-separator
                label="To-Do List"
                default-opened
              >
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <template v-if="sampleTasks && sampleTasks.length > 0">
                      <div
                        v-if="sampleTasks[0] && sampleTasks[0].title"
                        :class="{
                          'onboarding-text-accent-0': !expanded,
                          'text-semibold': !expanded,
                        }"
                      >
                        {{ sampleTasks[0].title }}
                      </div>
                      <div
                        v-else
                        class="onboarding-text-accent-0 text-semibold"
                      >
                        To-Do List
                      </div>
                    </template>
                    <template v-else>
                      <div class="onboarding-text-accent-0 text-semibold">
                        To-Do List
                      </div>
                    </template>
                  </q-item-section>
                  <q-item-section
                    v-if="!expanded"
                    side
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    April 14, 2024
                  </q-item-section>
                  <q-item-section
                    v-else
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    <template v-if="sampleTasks && sampleTasks.length > 0">
                      <div v-if="sampleTasks[0] && sampleTasks[0].title">
                        {{ sampleTasks[0].title }}
                      </div>
                      <div v-else>To-Do List</div>
                    </template>
                    <template v-else> To-Do List</template>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section class="q-pa-none">
                    <div
                      class="col"
                      v-for="sampleTask in sampleDoneTasks"
                      :key="sampleTask.id"
                    >
                      <q-list v-if="sampleTask.checked">
                        <q-item class="q-py-none q-px-sm">
                          <q-item-section class="q-mr-xl">
                            <q-checkbox
                              v-model="sampleTask.checked"
                              @input="handleCheckboxChange(sampleTask)"
                              @click="doneNotify"
                              :label="sampleTask.todo"
                              color="teal"
                              class="task-checkbox"
                            />
                          </q-item-section>
                          <q-item-section class="q-ml-xl">{{
                            todaysTime
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div
                      class="text-right onboarding-text-accent-0 text-semibold q-mr-md q-mt-md"
                    >
                      April 14, 2024
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script src="./scripts/TodoList.js"></script>

<!-- Style -->
<style lang="scss" scope>
@import url("./styles/TodoList.scss");
</style>
