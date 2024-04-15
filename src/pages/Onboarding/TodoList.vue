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
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10 q-mr-md"
            >
              <q-expansion-item expand-separator label="To-Do List">
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <template v-if="myTasks && myTasks.length > 0">
                      <div
                        v-if="myTasks[0] && myTasks[0].title"
                        :class="{
                          'onboarding-text-accent-0': !expanded,
                          'text-semibold': !expanded,
                        }"
                      >
                        {{ myTasks[0].title }}
                      </div>
                      <div
                        v-else
                        class="onboarding-text-accent-0 text-semibold"
                      >
                        Task Name
                      </div>
                    </template>
                    <template v-else>
                      <div class="onboarding-text-accent-0 text-semibold">
                        Task Name
                      </div>
                    </template>
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
                    <template v-if="myTasks && myTasks.length > 0">
                      <div v-if="myTasks[0] && myTasks[0].title">
                        {{ myTasks[0].title }}
                      </div>
                      <div v-else>Task Name</div>
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
                    <div class="col" v-for="task in myTasks" :key="task.id">
                      <q-list v-if="!task.checked">
                        <q-item class="q-py-none q-px-sm">
                          <q-item-section>
                            <!-- Display the checkbox and task.todo -->
                            <q-checkbox
                              v-model="task.checked"
                              @input="handleCheckboxChange(task)"
                              @click="inprogressNotify"
                              :label="task.todo"
                              color="teal"
                              class="task-checkbox"
                            />
                          </q-item-section>
                          <q-item-section class="q-ml-xl">{{
                            task.selectedTime
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
              class="col q-pa-md onboarding-border-accent-0 onboarding-border-radius-10"
            >
              <q-expansion-item expand-separator label="To-Do List">
                <template v-slot:header="{ expanded }">
                  <q-item-section
                    v-if="!expanded"
                    class="onboarding-text-accent-0 text-semibold"
                  >
                    <template v-if="doneTasks && doneTasks.length > 0">
                      <div v-if="doneTasks[0] && doneTasks[0].title">
                        {{ doneTasks[0].title }}
                      </div>
                      <div v-else>Task Name</div>
                    </template>
                    <template v-else> Task Name </template>
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
                    <template v-if="doneTasks && doneTasks.length > 0">
                      <div v-if="doneTasks[0] && doneTasks[0].title">
                        {{ doneTasks[0].title }}
                      </div>
                      <div v-else>Task Name</div>
                    </template>
                    <template v-else> Task Name </template>
                  </q-item-section>
                  <q-item-section v-if="expanded" side> </q-item-section>
                </template>

                <q-card>
                  <q-card-section class="q-pa-none">
                    <div class="col" v-for="task in doneTasks" :key="task.id">
                      <q-list v-if="task.checked">
                        <q-item class="q-py-none q-px-sm">
                          <!-- Checkbox for tasks in DoneTasks -->
                          <q-checkbox
                            v-model="task.checked"
                            @input="handleCheckboxChange(task)"
                            @click="doneNotify"
                            :label="task.todo"
                            color="teal"
                          />
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
