<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
			<v-tooltip right>
				<template v-slot:activator="{ on, attrs }">
					<v-app-bar-nav-icon @click.stop="drawer = !drawer" v-bind="attrs" v-on="on" />
				</template>
				<span v-if="drawer">メニューを閉じます</span>
				<span v-else>メニューを開きます</span>
			</v-tooltip>
			<v-toolbar-title v-text="title" />
			<v-spacer />
			<template v-if="false">
				<div>
					<v-tooltip left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="px-1" min-width="0px" icon :color="$vuetify.theme.dark ? 'yellow' : 'indigo'" @click="switchTheme()" v-bind="attrs" v-on="on">
								<v-icon v-if="$vuetify.theme.dark">mdi-weather-sunny</v-icon>
								<v-icon v-else>mdi-weather-night</v-icon>
							</v-btn>
						</template>
						<span>テーマを切り替えます</span>
					</v-tooltip>
				</div>
			</template>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

type NavigatorUAData = {
  brands: {
    brand: string,
    version: string
  }[],
  mobile: boolean,
  platform: string
}

interface Navigator2 extends Navigator {
  userAgentData: NavigatorUAData
}

export default Vue.extend({
  name: 'DefaultLayout',
  data () {
    return {
			dark: true,
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'メイン',
          to: '/'
        },
        {
          icon: 'mdi-history',
          title: '履歴',
          to: '/history'
        },
        {
          icon: 'mdi-information-outline',
          title: 'バージョン情報',
          to: '/version'
        },
      ],
      miniVariant: false,
      ver: '0.99.001',
      rev: '1',
      upd: '22y10m20',
      title: '新しいタブ',
      freemem: 4,
      usedmem: 0,
      totalmem: 4,
      freememobj: {
        byte: 4,
        unit: "B"
      },
      usedmemobj: {
        byte: 0,
        unit: "B"
      },
      totalmemobj: {
        byte: 4,
        unit: "B"
      },
      freememval: "4B",
      usedmemval: "0B",
      totalmemval: "4B",
      mempct: 1.0,
      mempctval: "100%",
      isfreemempct: false,
      byteusebinunit: true,
      platform: "ISnowOS Lina",
      cpucores: 1,
      cputemp: 20,
      cputempval: "20 °C",
      tempunit: "c",
      tempunits: {
        "c": {
          name: {
            en: "degree Celsius",
            ja: "セルシウス(摂氏)度",
          },
          unit: "°C",
          desc: "多くの国で採用されている最も一般的な温度単位です。",
        },
        "f": {
          name: {
            en: "degree Fahrenheit",
            ja: "ファーレンハイト(華氏)度",
          },
          unit: "°F",
          desc: "主に米国が採用している温度単位で、一般的な温度単位です。",
        },
        "k": {
          name: {
            en: "Kelvin",
            ja: "ケルビン(開氏)",
          },
          unit: "K",
          desc: "熱力学温度で、温度間隔はセルシウス度の1度と同じですが、0が絶対零度を指します。唯一単位が°では有りません。",
        },
        "r": {
          name: {
            en: "degree Rankine",
            ja: "ランキン(蘭氏)度",
          },
          unit: "°R",
          desc: "ケルビンと同じで0を絶対零度とする熱力学温度ですが、ケルビンと異なり温度間隔をファーレンハイト度の1度として定義されています",
        },
      } as {
        [props: string]: {
          name: {
            en: string,
            ja: string,
          },
          unit: string,
          desc: string,
        }
      },
      dt: new Date(),
      d: "1970/01/01",
      dv: "1970-01-01",
      ts: "09:00",
      tsdt: "09:00:00+0900",
      tz: 540,
      tzh: 9,
      tzm: 0,
      s: "",
    }
  },
  methods: {
		switchTheme() {
			const themeinfo = this.dark;
			this.$vuetify.theme.dark = !themeinfo;
      this.dark = !themeinfo;
      window.chrome.runtime.sendMessage(themeinfo ? "setLight" : "setDark");
		},
    updateTimeFunc() {
      this.dt = new Date()
      this.tz = this.dt.getTimezoneOffset();
      this.tzh = this.tz / 60;
      this.tzm = Math.abs(this.tz % 60);
      this.d = `${this.dt.getFullYear().toString()}/${("0" + this.dt.getMonth().toString()).slice(-2)}/${("0" + this.dt.getDate().toString()).slice(-2)}`;
      this.dv = `${this.dt.getFullYear().toString()}-${("0" + this.dt.getMonth().toString()).slice(-2)}-${("0" + this.dt.getDate().toString()).slice(-2)}`;
      this.ts = `${("0" + this.dt.getHours().toString()).slice(-2)}:${("0" + this.dt.getMinutes().toString()).slice(-2)}:${("0" + this.dt.getSeconds().toString()).slice(-2)}`
      this.tsdt = `${("0" + this.dt.getHours().toString()).slice(-2)}:${("0" + this.dt.getMinutes().toString()).slice(-2)}:${("0" + this.dt.getSeconds().toString()).slice(-2)}${(this.tz < 0 ? `-${("0" + Math.ceil(this.tzh).toString()).slice(-2)}${("0" + this.tzm).toString().slice(-2)}`:`+${("0" + Math.floor(this.tzh).toString()).slice(-2)}${("0" + this.tzm).toString().slice(-2)}`)}`;
    },
    updateFunc() {
      chrome.system.cpu.getInfo().then(ci => {
        this.cpucores = ci.numOfProcessors;
        if (this.platform == "Chrome OS"){
          let ct = 0;
          let ctt = 0;
          let ctc = 0;
          (ci.temperatures ?? []).forEach(element => {
            ctt += element;
            ctc++;
          });
          ct = ctt/ctc;
          this.cputemp = this.tempunitconvert(ct,"c",this.tempunit);
          this.cputempval = this.cputemp.toFixed(1) + this.tempunits[this.tempunit].unit;
        }
      })
      chrome.system.memory.getInfo().then(mi => {
        this.totalmem = mi.capacity;
        this.freemem = mi.availableCapacity;
        this.usedmem = this.totalmem - this.freemem;
        this.totalmemobj = this.byteunitconvert(this.totalmem, this.byteusebinunit);
        this.freememobj = this.byteunitconvert(this.freemem, this.byteusebinunit);
        this.usedmemobj = this.byteunitconvert(this.usedmem, this.byteusebinunit);
        this.totalmemval = this.totalmemobj.byte + this.totalmemobj.unit;
        this.freememval = this.freememobj.byte + this.freememobj.unit;
        this.usedmemval = this.usedmemobj.byte + this.usedmemobj.unit;
        if (this.isfreemempct) {
          this.mempct = this.freemem / this.totalmem;
          this.mempctval = Math.round(this.mempct * 100).toString() + "%";
        }else{
          this.mempct = this.usedmem / this.totalmem;
          this.mempctval = Math.round(this.mempct * 100).toString() + "%";
        }
      })
    },
    initTheme() {
      console.debug("テーマ機能を初期化しています。");
      window.chrome.runtime.sendMessage('getTheme').then(v => {
        console.debug(v);
        const themeinfo = v.isDark ?? true;
        this.$vuetify.theme.dark = themeinfo;
        this.dark = themeinfo;
        console.debug(`テーマ機能の初期化が完了しました。現在のテーマは「${this.dark ? "ダーク":"ライト"}」です。`)
      })
    },
    tempunitconvert(t: number,fu:string,tu:string) {
      let to = 0.0;
      let tr = 0.0;
      switch (this.tempunitcheck(fu)) {
        case "k":
          to = t - 273.15;
          break;
        case "r":
          to = (t - 491.67) * (5/9)
          break;
        case "f":
          to = (t - 32) * (5/9)
          break;
        case "c":
        default:
          to = t;
          break;
      }
      switch (this.tempunitcheck(tu)) {
        case "k":
          tr = to + 273.15;
          break;
        case "r":
          tr = (to + 273.15) * (9/5)
          break;
        case "f":
          tr = to * (9/5) + 32
          break;
        case "c":
        default:
          tr = to;
          break;
      }
      return tr
    },
    tempunitcheck(u: string): "r"|"k"|"c"|"f" {
      switch(u.toLowerCase()){
        case "r":
        case "rankine":
          return 'r';
        case "k":
        case "kelvin":
          return 'k';
        case "f":
        case "fahrenheit":
          return 'f';
        case "c":
        case "celsius":
        default:
          return "c";
      }
    },
    byteunitconvert(byte:number, isbin:boolean = true) {
      if (isbin){
        if (byte < 1024) {
          return {byte: byte, unit: "B"};
        }else if (byte < Math.pow(1024,2)) {
          return {byte: Math.round(byte/Math.pow(1024,1)), unit: "kiB"};
        }else if (byte < Math.pow(1024,3)) {
          return {byte: Math.round(byte/Math.pow(1024,2)), unit: "MiB"};
        }else if (byte < Math.pow(1024,4)) {
          return {byte: Math.round(byte/Math.pow(1024,3)), unit: "GiB"};
        }else if (byte < Math.pow(1024,5)) {
          return {byte: Math.round(byte/Math.pow(1024,4)), unit: "TiB"};
        }else if (byte < Math.pow(1024,6)) {
          return {byte: Math.round(byte/Math.pow(1024,5)), unit: "PiB"};
        }else if (byte < Math.pow(1024,7)) {
          return {byte: Math.round(byte/Math.pow(1024,6)), unit: "EiB"};
        }else if (byte < Math.pow(1024,8)) {
          return {byte: Math.round(byte/Math.pow(1024,7)), unit: "ZiB"};
        }else {
          return {byte: Math.round(byte/Math.pow(1024,8)), unit: "YiB"};
        }
      }else{
        if (byte < 1000) {
          return {byte: byte, unit: "B"};
        }else if (byte < Math.pow(1000,2)) {
          return {byte: Math.round(byte/Math.pow(1000,1)), unit: "kB"};
        }else if (byte < Math.pow(1000,3)) {
          return {byte: Math.round(byte/Math.pow(1000,2)), unit: "MB"};
        }else if (byte < Math.pow(1000,4)) {
          return {byte: Math.round(byte/Math.pow(1000,3)), unit: "GB"};
        }else if (byte < Math.pow(1000,5)) {
          return {byte: Math.round(byte/Math.pow(1000,4)), unit: "TB"};
        }else if (byte < Math.pow(1000,6)) {
          return {byte: Math.round(byte/Math.pow(1000,5)), unit: "PB"};
        }else if (byte < Math.pow(1000,7)) {
          return {byte: Math.round(byte/Math.pow(1000,6)), unit: "EB"};
        }else if (byte < Math.pow(1000,8)) {
          return {byte: Math.round(byte/Math.pow(1000,7)), unit: "ZB"};
        }else {
          return {byte: Math.round(byte/Math.pow(1000,8)), unit: "YB"};
        }
      }
    },
    beforeMount() {
      setInterval(this.updateTimeFunc, 250);
      setInterval(this.updateFunc, 1000);
    },
    mounted() {
      this.initTheme();
      this.platform = (navigator as Navigator2).userAgentData.platform;
    },
  }
});
</script>
