<template>
  <b-container>
    <b-jumbotron>
      <!-- Header -->
      <template slot="header">
        <h1 class="display-5 text-capitalize">{{ header }}</h1>
      </template>

      <!-- Dynamic Component -->
      <component
        :is="curruntComponent"
        @updateComponent="(headerText, componentName) => {
          header = headerText
          curruntComponent = componentName
        }">
      </component>
    </b-jumbotron>
  </b-container>
</template>

<script>

import ForgetPassword from '@/components/ForgetPassword'
import ResetPassword from '@/components/ResetPassword'
import Login from '@/components/Login'

export default {
  name: 'reset-view',

  data() {
    return {
      curruntComponent: 'ForgetPassword',
      header: 'forget password'
    }
  },

  components: {
    ForgetPassword,
    ResetPassword,
    Login
  }
}
</script>
