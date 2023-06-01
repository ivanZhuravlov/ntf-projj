<template>
  <span :class="`circle-icon ${className}`"></span>
</template>

<script>
export default {
  name: 'CircleIcon',

  props: {
    className: {
      type: String,
      default: '',
    },
  }
}
</script>

<style>
  .circle-icon {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
</style>