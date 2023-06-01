<template>
  <svg
    onclick=""
    width="16"
    height="16"
    viewBox="0 0 16 16"
    :fill="fill"
    :class="className"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M16 16H12V12H16V16ZM10 16H6V12H10V16ZM4 16H0V12H4V16ZM16 10H12V6H16V10ZM10 10H6V6H10V10ZM4 10H0V6H4V10ZM16 4H12V0H16V4ZM10 4H6V0H10V4ZM4 4H0V0H4V4Z"/>
  </svg>
</template>

<script>
export default {
  name: 'DashboardCoolIcon',

  props: {
    className: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: String,
      default: '#777774',
    }
  }
}
</script>