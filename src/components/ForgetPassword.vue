<template>
  <div class="forget-password">
    <flash-message class="styleFlash"></flash-message>
    <b-form>
    <!-- Email -->
    <b-form-group
      id="email-form-group"
      label="Email:"
      label-for="email-form-group"
    >
      <b-form-input
        id="email"
        type="email"
        v-model="form.email"
        required
        placeholder="Please enter your email" />
    </b-form-group>

    <!-- QR Code -->
    <b-form-group
      id="qrcode-form-group"
      label="Code:"
      label-for="qrcode-form-group"
    >
      <b-form-input
        id="qrcode"
        type="text"
        v-model="form.qrcode"
        required
        placeholder="Please enter 6 digit code" />
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
        email: '',
        qrcode: null
      }
    }
  },

  components: {
    InvisibleRecaptcha
  },

  methods: {
    validateData() {
      if(this.form.qrcode.length !== 6) {
        this.flash('Code must be 6 digits.', 'error')
        resetObject(this.form, ['qrcode'])
        return false
      }
      else if(/^\d+$/.test(this.form.qrcode) === false) {
        this.flash('Code must be numeric.', 'error')
        resetObject(this.form, ['qrcode'])
        return false
      }
      return true
    },

    onSubmit(recaptchaToken) {
      if(recaptchaToken) {
        const data = {
          email: this.form.email,
          code: this.form.qrcode,
        }
        this.$store.dispatch('forget_password/postForgetPassword', data)
          .then(() => {
            const response = this.$store.state.forget_password.response
            if (response.status === 200 && response.data.status) {
              this.$emit('updateComponent', 'set new password', 'ResetPassword')
            } else {
              this.flash(response.data.message, 'error')
            }
            this.$store.state.forget_password.response = null
          })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
