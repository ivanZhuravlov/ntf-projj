<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/contact">Contact</router-link> | 
      <router-link to="/art/123">Art example</router-link> |
      <router-link to="/service">Service</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> 
    </div>
    <router-view/>
  </div>
</template>