<template>
  <v-card>
    <v-row justify="center">
      <v-card-title style="font-size:32px" class="pb-0">
        Concentration Game
      </v-card-title>
    </v-row>
      <v-row v-if="$vuetify.breakpoint.mdAndUp" justify="center">
        <div class="mb-2 mt-2">
          <v-btn class="primary mr-2" to="/">
            Home
          </v-btn>
          <v-btn class="primary mr-2" to="/game">
            Game
          </v-btn>
          <v-btn class="primary mr-2" to="/instructions">
            Instructions
          </v-btn>
          <v-btn class="primary mr-2" to="/about">
            About Us
          </v-btn>
        </div>
      </v-row>
      <v-row v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-4"
              color="black"
              dark
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in navButtons"
              :key="index"
            >
              <v-btn class="primary" :to="item.to">
                {{item.name}}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
  </v-card>
</template>

<script>
export default {
    name: "app_header",
    data() {
        return {
          navButtons: [
            {name: "Home", to: "/"},
            {name: "Game", to: "/game"},
            {name: "Instructions", to: "/instructions"},
            {name: "About Us", to: "/about"}
          ]
        }
    },

    computed: {
    },
    methods: {
    },

    created() {
    }
}
</script>