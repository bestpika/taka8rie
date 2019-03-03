/* global DateTime luxon Vue */

window.DateTime = luxon.DateTime

;(() => {
  const app = new Vue({
    el: '#taka8rie',
    data: {
      dt: 0,
      xday: null,
      diff: null,
      toId: null
    },
    computed: {
      xdayStr () {
        return `距離下一次誕生日 <i class="fas fa-birthday-cake"></i>
          ${this.xday.setLocale('ja').toFormat('kkkk 年 LLLL 月 d 日 (cccc)')}`
      },
      diffStr () {
        return `還有 ${this.diff.weeks} 週
          ${this.diff.days} 天
          ${this.diff.hours} 時
          ${this.diff.minutes} 分
          ${parseInt(this.diff.seconds)} 秒
          <i class="fas fa-clock"></i>`
      }
    },
    methods: {
      loop () {
        this.dt = Date.now()
        const tz = 'Asia/Tokyo'
        const lc = DateTime.fromMillis(this.dt) // 當地
        const ja = lc.setZone(tz) // 日本
        this.xday = DateTime.fromISO(`${ja.year}-02-27T00:00:00+09:00`).setZone(tz) // 高橋李依誕生日
        if (lc >= this.xday) {
          this.xday = this.xday.plus({ years: 1 })
        }
        this.diff = this.xday.diff(ja, ['weeks', 'days', 'hours', 'minutes', 'seconds'])
        // 繼續
        const interval = 500
        this.toId = setTimeout(this.loop, interval - (this.dt % interval) + 1)
      }
    },
    created () {
      this.loop()
    },
    mounted () {
      //
    }
  })
  console.dir(app)
})()
