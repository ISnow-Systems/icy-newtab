<template>
  <div>
    <h2>履歴</h2>
    <span v-text="'件数: ' + displayed + '件'" />
    <div v-if="displayable">
      <v-list>
        <v-list-item v-for="h in histories" :key="h.id" :href="h.url">
          <v-list-item-content>
            <v-list-item-title v-text="h.title" />
            <v-list-item-subtitle v-text="new Date(h.lastVisitTime).toLocaleString()" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <v-progress-circular indeterminate />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  head() {
    return {
      title: "履歴"
    }
  },
  data() {
    return {
      dispcount: 100,
      displayed: 0,
      histories: [] as chrome.history.HistoryItem[],
      displayable: false
    }
  },
  methods: {
    gethistries() {
      window.chrome.history.search({
        endTime: (new Date()).getTime(),
        maxResults: this.dispcount,
        text: "",
      }).then(d => {
        this.histories = d;
        this.displayable = true;
        this.displayed = d.length;
      })
    },
  },
  mounted() {
    this.gethistries();
  }
})
</script>
