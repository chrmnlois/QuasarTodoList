<template>
  <!-- START OF MENU TABLE -->
  <div class="main-menu q-mt-xxs">
    <div class="onboarding-menu-scroll">
      <q-list>
        <q-item
          clickable
          v-ripple
          :to="{ name: 'todo-list' }"
          :class="{ 'active-item': isCreateTodoRoute }"
        >
          <q-item-section avatar class="margin-left-10">
            <q-icon name="fact_check" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text">To-Do List</q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <q-list>
          <q-item class="logout-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text onboarding-text-primary"
              >Logout</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <!-- END OF MENU -->
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const isCreateTodoRoute = computed(() => {
      return route.name === "create-todo" || route.name === "edit-todo";
    });

    return {
      isCreateTodoRoute,
    };
  },
};
</script>

<style lang="scss" scoped>
//IMPORTING SCSS STYLE
@import "../css/components/MainMenu.scss";
</style>
