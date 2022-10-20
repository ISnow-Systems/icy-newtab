<template>
    <v-container justify="center" align-content="center">
        <v-row>
            <v-spacer />
            <v-col cols="auto">
                <time class="text-h2" :datetime="dv" v-text="d" />
            </v-col>
            <v-spacer />
        </v-row>
        <v-row>
            <v-spacer />
            <v-col cols="auto">
                <time class="text-h3" :datetime="tv" v-text="t" />
            </v-col>
            <v-spacer />
        </v-row>
        <v-form ref="sbox" @submit="search">
          <v-row>
              <v-col>
                  <v-text-field type="search" hide-details single-line v-model="s" />
              </v-col>
              <v-col cols="auto">
                  <v-btn type="submit">
                      <v-icon>
                          mdi-magnify
                      </v-icon>
                      検索
                  </v-btn>
              </v-col>
          </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dt: new Date(),
      d: "1970/01/01",
      dv: "1970-01-01",
      dw: "Thu",
      t: "09:00",
      tv: "09:00:00+0900",
      tz: 540,
      tzh: 9,
      tzm: 0,
      s: "",
      tmh: 0,
      tmm: 0,
      tms: 0,
    }
  },
  head() {
    return {
      title: "メイン"
    }
  },
  methods: {
    updateFunc() {
      this.dt = new Date()
      this.tz = this.dt.getTimezoneOffset();
      this.tzh = this.tz / 60;
      this.tzm = Math.abs(this.tz % 60);
      this.d = `\`${("0" + this.dt.getFullYear().toString()).slice(-2)}/${("0" + (this.dt.getMonth() + 1).toString()).slice(-2)}/${("0" + this.dt.getDate().toString()).slice(-2)}`;
      this.dv = `${this.dt.getFullYear().toString()}-${("0" + (this.dt.getMonth() + 1).toString()).slice(-2)}-${("0" + this.dt.getDate().toString()).slice(-2)}`;
      this.t = `${("0" + this.dt.getHours().toString()).slice(-2)}:${("0" + this.dt.getMinutes().toString()).slice(-2)}:${("0" + this.dt.getSeconds().toString()).slice(-2)}`
      this.tv = `${("0" + this.dt.getHours().toString()).slice(-2)}:${("0" + this.dt.getMinutes().toString()).slice(-2)}:${("0" + this.dt.getSeconds().toString()).slice(-2)}${(this.tz < 0 ? `-${("0" + Math.ceil(this.tzh).toString()).slice(-2)}${("0" + this.tzm).toString().slice(-2)}`:`+${("0" + Math.floor(this.tzh).toString()).slice(-2)}${("0" + this.tzm).toString().slice(-2)}`)}`;
    },
    initTick() {
      setInterval(this.updateFunc, 250);
    },
    search(e: Event): false {
      e.preventDefault();
      console.log(this.s);
      window.chrome.search.query({
        disposition: 'CURRENT_TAB',
        text: this.s
      }).then(()=>{return});
      return false;
    }
  },
  beforeMount() {
    this.initTick();
  }
})
</script>
