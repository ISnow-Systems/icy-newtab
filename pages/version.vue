<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-subheader>
          本ソフトウエアの情報
        </v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Icy Newtab
            </v-list-item-title>
            <v-list-item-subtitle>
              Version 0.99.001 (fehu)
              Revision 1 (22y10m20d1)
              Copyright &copy; 2021, 2022 ISnow Systems
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://github.com/ISnow-Systems/icy-newtab">
          <v-list-item-content>
            <v-list-item-title>
              GitHubリポジトリ
            </v-list-item-title>
            <v-list-item-subtitle>
              本ソフトウエアは一定の条件下で再利用できます
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group>
        <v-subheader>
          ライブラリ情報
        </v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Vue
            </v-list-item-title>
            <v-list-item-subtitle>
              version 2.7.13
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Vuetify
            </v-list-item-title>
            <v-list-item-subtitle>
              version 2.6.11
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: "バージョン情報"
    }
  }
})
</script>
