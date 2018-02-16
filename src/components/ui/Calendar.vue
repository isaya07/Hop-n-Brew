<template>
  <div v-if="show" class="datepicker" :class="{'is-active': show}">
    <div class="calendar">
      <div class="calendar-nav">
        <div class="calendar-nav-month">
          <div class="calendar-nav-previous-month">
            <button class="button is-small is-text" @click="prevMonth">
              <icon :icon="['fas', 'chevron-left']" />
            </button>
          </div>
          <div class="calendar-month">{{ monthName }}</div>
          <div class="calendar-nav-next-month">
            <button class="button is-small is-text" @click="nextMonth">
              <icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>
        </div>
        <!-- <div class="calendar-nav-day">
          <div class="calendar-day">{{ day }}</div>
        </div> -->
        <div class="calendar-nav-year">
          <div class="calendar-nav-previous-year">
            <button class="button is-small is-text" @click="prevYear">
              <icon :icon="['fas', 'chevron-left']" />
            </button>
          </div>
         <div class="calendar-year">{{ year }}</div>
          <div class="calendar-nav-next-year">
            <button class="button is-small is-text" @click="nextYear">
              <icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>
        </div>
      </div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-date">{{ getDayName(0, true) }}</div>
          <div class="calendar-date">{{ getDayName(1, true) }}</div>
          <div class="calendar-date">{{ getDayName(2, true) }}</div>
          <div class="calendar-date">{{ getDayName(3, true) }}</div>
          <div class="calendar-date">{{ getDayName(4, true) }}</div>
          <div class="calendar-date">{{ getDayName(5, true) }}</div>
          <div class="calendar-date">{{ getDayName(6, true) }}</div>
        </div>
        <div class="calendar-body">
          <div v-for="(day, index) in days" :key="index"
            class="calendar-date"
            :class="{'is-disabled': day.isDisabled, 'calendar-range': day.isBetween, 'calendar-range-start': day.isSelectedIn, 'calendar-range-end': day.isSelectedOut}">
            <button
              class="date-item"
              :class="{'is-today': day.isToday,'is-active': day.isSelected}"
              @click="daySelected(year + '/' + month + '/' + day.date)">
              {{ day.date }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var datepickerLangs = {
  en: {
    weekStart: 1,
    previousMonth: 'Previous Month',
    nextMonth: 'Next Month',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  fr: {
    weekStart: 1,
    previousMonth: 'Mois précédent',
    nextMonth: 'Mois suivant',
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Auo', 'Sep', 'Oct', 'Nov', 'Déc'],
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  }
}

export default {
  name: 'calendar',

  props: {
    date: [String, Number]
  },

  data () {
    return {
      lang: 'en',
      day: 0,
      month: 0,
      year: 0,
      startDate: null,
      days: [],
      show: true
    }
  },

  mounted () {
    this.startDate = this.setDate(this.date)
    this.month = this.startDate.getMonth()
    this.year = this.startDate.getFullYear()
    this.day = this.startDate.getDate()
    this.updateDays()
  },

  computed: {
    monthName () {
      return datepickerLangs[this.lang].months[this.month]
    }
  },

  methods: {
    setDate (value) {
      let ret
      if (typeof value === 'string' && value.indexOf('/') !== -1) {
        let date = value.split('/')
        let year = date[2]
        if (year.length <= 2) year = '20' + year
        let month = parseInt(date[1]) - 1
        ret = new Date(year, month, date[0])
      } else {
        ret = new Date(value)
      }
      if (!ret.valueOf()) {
        ret = new Date()
      }
      return ret
    },
    getDayName (day, abbr = false) {
      day += datepickerLangs[this.lang].weekStart
      while (day >= 7) {
        day -= 7
      }

      return abbr ? datepickerLangs[this.lang].weekdaysShort[day] : datepickerLangs[this.lang].weekdays[day]
    },
    prevMonth () {
      this.month -= 1
      this.adjustCalendar()
    },
    nextMonth () {
      this.month += 1
      this.adjustCalendar()
    },
    prevYear () {
      this.year -= 1
      this.adjustCalendar()
    },
    nextYear () {
      this.year += 1
      this.adjustCalendar()
    },
    adjustCalendar () {
      if (this.month < 0) {
        this.year -= Math.ceil(Math.abs(this.month) / 12)
        this.month += 12
      }
      if (this.month > 11) {
        this.year += Math.floor(Math.abs(this.month) / 12)
        this.month -= 12
      }
      this.updateDays()
    },
    updateDays () {
      const now = new Date()
      let days = []

      let numberOfDays = this.getDaysInMonth(this.year, this.month)
      let before = new Date(this.year, this.month, 1).getDay()

      // Call onRender callback if defined
      /* if (typeof this.onRender != 'undefined' &&
        this.onRender != null &&
        this.onRender) {
        this.onRender(this);
      } */

      // Get start day from options
      if (datepickerLangs[this.lang].weekStart > 0) {
        before -= datepickerLangs[this.lang].weekStart
        if (before < 0) {
          before += 7
        }
      }

      let cells = numberOfDays + before
      let after = cells
      while (after > 7) {
        after -= 7
      }

      cells += 7 - after
      for (var i = 0; i < cells; i++) {
        let date = new Date(this.year, this.month, 1 + (i - before))
        var day = {
          date: date.getDate(),
          // date: this.year + '/' + this.month + '/' + date,
          isBetween: false,
          isSelected: this.compareDates(date, this.startDate),
          isSelectedIn: false,
          isSelectedOut: false,
          isToday: this.compareDates(date, now),
          isEmpty: i < before || i >= (numberOfDays + before),
          isDisabled: false
        }

        if (!day.isSelected) {
          day.isSelectedIn = false
          day.isSelectedOut = false
        }

        if (date.getMonth() !== this.month) {
          day.isDisabled = true
        }
        days.push(day)
        // days += this._renderDay(day.getDate(), this.month, this.year, isSelected, isToday, isDisabled, isEmpty, isBetween, isSelectedIn, isSelectedOut);
      }
      this.days = days
      // this.datePickerCalendarBody.insertAdjacentHTML('beforeend', days);
      // this.datePickerCalendarDays = this.datePickerCalendarBody.querySelectorAll('.calendar-date');
      // this._bindDaysEvents();
    },
    compareDates (a, b) {
      // weak date comparison
      a.setHours(0, 0, 0, 0)
      b.setHours(0, 0, 0, 0)
      return a.getTime() === b.getTime()
    },
    isLeapYear (year) {
      // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
      // eslint-disable-next-line
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
    },
    getDaysInMonth (year, month) {
      return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    },
    daySelected (dateSelected) {
      let date = dateSelected.split('/')
      let newDate = new Date(date[0], date[1], date[2])
      let day = newDate.getDate()
      let month = newDate.getMonth() + 1
      let year = newDate.getFullYear().toString().substr(-2)
      day < 10 && (day = '0' + day)
      month < 10 && (month = '0' + month)
      this.$emit('selected', day + '/' + month + '/' + year)
    }
  }

}
</script>

<style lang="scss" scoped>
// @import './node_modules/bulma/sass/utilities/initial-variables';
@import 'src/assets/scss/settings';
@import './node_modules/bulma/sass/utilities/derived-variables.sass';
@import 'src/assets/scss/calendar';
</style>
