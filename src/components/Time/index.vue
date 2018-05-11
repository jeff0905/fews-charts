<template>
  <div class="time-wrapper">
    <Digit v-bind:number="dhour" />
    <Digit v-bind:number="dhour1" />
    <Digit v-bind:number="dmin" />
    <Digit v-bind:number="dmin1" />
    <Digit v-bind:number="dsec" />
    <Digit v-bind:number="dese1" />
  </div>
</template>
<script>
import Digit from '@/components/digit'
// import moment from 'moment'
export default {
  name: 'Time',
  components: {
    Digit
  },
  data: () => (
    {
      intervalId: null,
      dhour: 0,
      dhour1: 0,
      dmin: 0,
      dmin1: 0,
      dsec: 0,
      dsec1: 0
    }
  ),
  mounted: function () {
    // const currentTime = moment()
  },
  destroyed: function () {

  },
  methods: {
    formTime (date) {
      const year = date.years()
      const month = date.months()
      const day = date.dates()
      const hours = date.hours()
      const mins = date.minutes()
      const secs = date.seconds()
      return {year, month, day, hours, mins, secs}
    }
  }
}
</script>
