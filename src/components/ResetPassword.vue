<template>
  <div class="forget-password">
    <flash-message class="styleFlash"></flash-message>
    <b-form>
    <!-- Password -->
    <b-form-group
      id="password-form-group"
      label="Password:"
      label-for="password-form-group"
    >
      <b-form-input
        id="password"
        type="password"
        v-model="form.password"
        required
        placeholder="Please enter your password" />
    </b-form-group>

    <!-- Confirm Password -->
    <b-form-group
      id="confirm-password-form-group"
      label="Confirm Password:"
      label-for="confirm-password-form-group"
    >
      <b-form-input
        id="confirm-password"
        type="password"
        v-model="form.confirmPassword"
        required
        placeholder="Please confirm previous password" />
    </b-form-group>

    <!-- Recaptcha Submit Button -->
    <invisible-recaptcha 
      sitekey="6Le8dZMUAAAAAAIU8yHb6Nu9yLm0B5LiPf75o3mW"
      :validate="validateData" 
      :callback="onSubmit"
      class="btn btn-primary float-right"
      type="submit"
      id="submit-btn">
      Submit
    </invisible-recaptcha>
  </b-form>
  </div>
</template>

<script>
import InvisibleRecaptcha from 'vue-invisible-recaptcha'
import resetObject from '../shared/reset-object.js'

export default {
  data() {
    return {
      form: { // form data model
        password: null,
        confirmPassword: null
      },
      email: ''
    }
  },

  components: {
    InvisibleRecaptcha
  },

  methods: {
    validateData() {
      if(this.form.confirmPassword !== this.form.password) {
        this.flash('Passwords are\'n identical', 'error')
        resetObject(this.form)
        return false
      }
      if(this.form.password.length <= 6 || this.form.password.length > 20) {
        this.flash('Password must be more 6 letters to 20', 'error')
        resetObject(this.form)
        return false
      }
      if(/\d/.test(this.form.password) === false) {
        this.flash('Password must contain at least one digit', 'error')
        resetObject(this.form)
        return false
      }
      if(/[a-z]/.test(this.form.password) === false) {
        this.flash('Password must contain at least one lowecase character', 'error')
        resetObject(this.form)
        return false
      }
      if(/[A-Z]/.test(this.form.password) === false) {
        this.flash('Password must contain at least one uppercase character', 'error')
        resetObject(this.form)
        return false
      }
      return true
    },

    onSubmit(recaptchaToken) {
      if(recaptchaToken) {
        const data = {
          email: this.email,
          password: this.form.password,
        }
        this.$store.dispatch('reset_password/postResetPassword', data)
          .then(() => {
            const response = this.$store.state.reset_password.response
            if (response.status === 200 && response.data.status) {
              this.$emit('updateComponent', 'login', 'Login')
            } else {
              this.flash(response.data.message, 'error')
            }
            this.$store.state.reset_password.response = null
          })
      }
    },
  },

  mounted() {
    this.email = this.$store.state.forget_password.email
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>