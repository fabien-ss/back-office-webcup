<template>
    <div class="row" style="height:100cap;">
        <div class="col-lg-6 login ">
            <h1>{{ $t("login.title") }}</h1>
            <h2>{{ $t("login.indication") }}</h2>
            <div class="input-class">
                <label><i class="tim-icons icon-email-85"></i></label>
                <input id="mail" type="text" value="example@example.com" class="form-control" />
            </div>
            <div class="input-class">
                <label><i class="tim-icons icon-lock-circle"></i></label>
                <input id="password" type="password" value="securePassword123" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary ok" @click="login">
                <i v-if="!isLoading" class="tim-icons icon-double-left icon"></i>
                <i v-if="isLoading" class="tim-icons icon-refresh-02 icon rotateIcon"></i>
            </button>
            <base-alert v-if="error !== null" type="danger" @click="this.error = null" dismissible>
                <span>
                    {{ error }}
                </span>
            </base-alert>
        </div>
        <div class="col-lg-6 blank "></div>
    </div>
</template>
<script>
import { BaseAlert } from "@/components";
import { API_URL } from "../variable/variable.ts";

export default {
    name: "Login",
    components: {
        BaseAlert,
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    mounted(){
    },
    methods: {
        async login() {
            try {
           //     window.location.replace(process.env.BASE_URL+"#/dashboard");
                this.error = null;
                this.isLoading = true;
                const mail = document.getElementById("mail").value;
                const password = document.getElementById("password").value;
                let data = {
                    email: mail,
                    password: password
                }
                const url = `${API_URL}/administrator/login`
                const pulling = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                const response = await pulling.json();
                if (response.status == 200) {
                    localStorage.setItem("token", response.data);
                    window.location.replace(process.env.BASE_URL+"#/icons");
                } else {
                    this.error = response.data
                }
                this.isLoading = false;
            } catch (e) {
                this.error = e.message;
                this.isLoading = false;
            }
        }
    }
}
</script>
<style>
.blank {
    background-color: white;
    width: 100%;
}

.login {
    margin: auto;
    text-align: center;
    margin-top: 100px;
    padding: 5%;
    border-radius: 10px;

    h1 {
        font-size: 90px;
    }

    .input-class {
        margin-top: 5%;
        gap: 10px;

        input {
            margin: auto;
            width: 70%;
            text-align: center;
            border-right: 5px solid white;
            border-left: 5px solid white;
        }

        i {
            color: white;
            font-size: 30px;
        }
    }

    .ok {
        margin-top: 4%;
    }
}

.icon {
    transform: scale(-1);
}

.rotateIcon {
    animation: rotateIcon 1s linear infinite;
}

@keyframes rotateIcon {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>