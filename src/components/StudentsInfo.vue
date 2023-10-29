<template>
{{ student.name}}
<img :src="student.photo" :alt="student.name">
</template>
<script>
import axios from "axios";

export default{
    props: {
        id: '',
    },
    data(){
        return {
            student: {},
        }
    },
    mounted: function() {
        axios.get("http://34.82.81.113:3000/students/"+this.id).then((response) => {
            this.student = response.data;
        })
    }
}
</script>

<style scoped>

</style>