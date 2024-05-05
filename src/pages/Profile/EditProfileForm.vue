<!-- eslint-disable vue/no-mutating-props -->
<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Company (disabled)"
          placeholder="Company"
          v-model="model.company"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-3 px-md-1">
        <base-input
          label="Username"
          placeholder="Username"
          v-model="model.username"
          @input="handleInputChange"
        >
        </base-input>
        {{ model.username }}
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input
          label="Email address"
          type="email"
          placeholder="mike@email.com"
          @input="handleInputChange"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="First Name"
          v-model="model.firstName"
          placeholder="First Name"
          @input="handleInputChange"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Last Name"
          v-model="model.lastName"
          placeholder="Last Name"
          @input="handleInputChange"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input
          label="Address"
          v-model="model.addressLocation"
          placeholder="Home Address"
          @input="handleInputChange"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="City" v-model="model.city" placeholder="City"
        @input="handleInputChange">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input
          label="Country"
          v-model="model.country"
          placeholder="Country"
          @input="handleInputChange"
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Postal Code" placeholder="ZIP Code"
        @input="handleInputChange"> </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input
        >
          <label>About Me</label>
          <textarea
            rows="4"
            cols="80"
            class="form-control"
            placeholder="Here can be your description"
            v-model="model.about"
            @input="handleInputChange"
          >
          </textarea>
          {{  model.about }}
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" @click="emitClick" fill>Save</base-button>
  </card>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods:{
    emitClick(){
      this.$emit("change")
    }
  }
};
</script>
<style></style>
