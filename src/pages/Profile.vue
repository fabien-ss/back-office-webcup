<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form v-if="user!==null" @change="update" :model="user"> </edit-profile-form>

    <base-alert v-if="success" type="success" @click="this.success = false" >
      <span>
        Success!
      </span>
    </base-alert>
    </div>
    <div class="col-md-4">
      <user-card  v-if="user!==null" :user="user"></user-card>
    </div>

    <base-alert v-if="error !== null" type="danger" @click="this.error = null" dismissible>
      <span>
        {{ error }}
      </span>
    </base-alert>

  </div>
</template>
<script>
import { BaseAlert } from "@/components";
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
import { API_URL } from "../variable/variable.ts";
export default {
  components: {
    EditProfileForm,
    UserCard,
    BaseAlert
  },
  async mounted() {

    if(localStorage.getItem("token") == "" || localStorage.getItem("token") == null){
        window.location.replace("/login")
    }
    await this.fetchUser()

  },
  methods: {
    async update() {
  //    console.log("Update ", JSON.stringify(this.user))
      const pulling = await fetch(`${API_URL}/administrator`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
      const response = await pulling.json()
      if (response.status === 200) {
        this.success = true
        this.user = response.data
      } else {
        this.error = response.data
      }
    },
    async fetchUser() {
      const token = localStorage.getItem("token");
      const pulling = await fetch(`${API_URL}/administrator`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        },
      })

      const response = await pulling.json();
     // console.log("reponse user ", response);
      if (response.status == "200") {
        this.user = response.data
       // console.log("user ", this.user)
      }else{
        this.error = response.data
      }
    }
  },
  data() {
    return {
      user: null,
      error: null,
      success: false
    };
  },
};
</script>
<style></style>
