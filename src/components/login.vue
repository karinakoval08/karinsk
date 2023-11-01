<template>
    <div>
        <input v-model="input" type="text" placeholder="ім'я студента" required/>
        <button @click="login">Ввійти</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            input: '',
        }
    },
    methods: {
        login() {
            axios.get("http://34.82.81.113:3000/students/name/"+this.input).then((response) => {
                if ((response.data === null) || (response.data.name === "CastError")) {
                    return
                }
                this.$store.commit('setUser', response.data)
                this.$router.push('/');
            })
        }
    }
}
</script>

<style module>
</style>