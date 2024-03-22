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
          <div class="flex justify-between q-mt-sm q-mb-lg">
            <h5
              class="text-26 text-semibold q-my-none onboarding-text-accent-0"
            >
              O.R. Numbers
            </h5>
            <div class="flex justify-end">
              <Filters
                dynamicHeight="34"
                :labelVisible="false"
                :searchVisible="true"
                :filterDateVisible="false"
                pathEndPoint="orNumbers"
              />
              <q-btn
                flat
                rounded
                no-caps
                dense
                class="onboarding-border-accent-0 onboarding-bg-accent-0 text-white q-px-xl q-ml-md"
                @click="$router.push({ name: 'add-or-numbers' })"
                label="Add Official Receipt"
              />
            </div>
          </div>
          <!-- Filter and Pagination -->
          <div class="flex justify-between q-mb-md gt-xs">
            <div>
              <Filters :selectVisible="true" pathEndPoint="orNumbers" />
            </div>
            <div class="flex itempt-center">
              <div
                class="text-14 onboarding-text-accent-1 q-mr-md"
                :class="$q.screen.width < 767 && 'hidden'"
              ></div>
              <Pagination
                v-model:pagination="pagination"
                :numRows="GetORNumbers"
              />
            </div>
          </div>
        </div>
        <!-- TABLES -->
        <div class="onboarding-main-scroll table-scroll">
          <!-- row-key = "range_type" example -->
          <q-table
            :rows="GetORNumbers"
            :columns="columns"
            v-model:pagination="pagination"
            row-key="id"
            class="onboarding-table gt-xs"
            @row-click="onRowClick"
            flat
          >
            <template v-slot:body-cell-receipt_type="props">
              <q-td :props="props"
                >{{ labelOptions[props.row.receipt_type - 1] }}
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn
                    icon="more_vert"
                    class="onboarding-text-primary onboarding-text-hover-accent-1"
                    flat
                    round
                    dense
                    @click.stop
                  >
                    <q-menu class="menu-container">
                      <q-list>
                        <q-item
                          clickable
                          @click="editORNumber(props.row)"
                          v-close-popup
                          class="menu-list"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          class="menu-list"
                          @click="deleteORNumber(props.row.id)"
                        >
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
            </template>
            <template v-if="!GetORNumbers.length" v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%" class="text-center">
                  No Data Available
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <!-- FOR MOBILE APPLICATION -->
        <div class="show-on-mobile q-pa-lg">
          <!-- <div v-if="orNUmberList.length">
            <div v-for="user in orNUmberList" :key="user.id">
              <UserCard @deleteUser="deleteUser(user)" :user="user" />
            </div>
          </div>
          <div v-else class=" full-width text-center">
            No Data Available.
          </div> -->
          <div class="fixed-bottom q-mb-lg q-mx-xl">
            <q-btn
              rounded
              dense
              flat
              no-caps
              label="Add Official Receipt"
              to="add-or-numbers"
              class="onboarding-buttononboarding-border-accent-0 onboarding-bg-accent-0 q-px-xl q-mt-xl"
            />
          </div>
        </div>
      </div>
      <q-inner-loading
        class="absolute-center onboarding-bg-primary text-20 full-width full-height onboarding-text-accent-0"
        :showing="pageLoadingState"
      />
      <MobileFilter :searchVisible="true" />
      <MainDialog :content="$options.components.DeleteConfirmation" />
    </div>
  </transition>
</template>

<script src="./scripts/ORNumbers.js"></script>

<style lang="scss">
@import "./styles/ORNumbers.scss";
</style>
