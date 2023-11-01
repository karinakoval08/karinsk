<template>
<div>
    <input type="text" name="search" v-model="search"><br>
    <table class="table table-dark">
        <tr v-for="item in students" v-bind:key="item._id">
            <router-link :to='"/students-info/:"+ item._id'>
            <td>{{item.name}}</td>
            </router-link>
            <td><input type="checkbox" v-model="item.isDonePr"></td>
            <td><a href="#" @click="deleteStudent(item._id)">Видалити</a></td>
        </tr>
    </table>
    <input v-model="student.name">
    <input type="checkbox" v-model="student.isDonePr">
    <select v-model="student.group">
        <option value="RPZ 20 1/9">RPZ 20 1/9</option>
        <option value="RPZ 20 2/9">RPZ 20 2/9</option>
    </select>
    <button @click="addStudent()">Add student</button>
</div>

            <input v-model="searchText" placeholder="Пошук за прізвищем" />
            <table>
              <thead>
                <tr>
                  <th>ПІБ</th>
                  <th>Група</th>
                  <th>Рік народження</th>
                  <th>Практична</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in filteredStudents" :key="student.id" :class="{ 'highlighted': student.isHighlighted }">
                  <td v-html="highlightText(student.name)" @click="editStudent(student)"></td>
                  <td>{{ student.group }}</td>
                  <td>{{ student.birthYear }}</td>
                  <td><input type="checkbox" v-model="student.passedPractical" :disabled="false" /></td>
                  <td><a @click="removeStudent(student.id)" v-show="item.group === getCurrentUser.group">Видалити</a></td>
                </tr>
              </tbody>
            </table>
            <button @click="addStudent">Додати студента</button>
            <div v-if="showModal">
              <div>
                <label for="name">ПІБ:</label>
                <input id="name" v-model="editStudentData.name" />
              </div>
              <div>
                <label for="group">Група:</label>
                <input id="group" v-model="editStudentData.group" />
              </div>
              <div>
                <label for="birthYear">Рік народження:</label>
                <input id="birthYear" v-model="editStudentData.birthYear" />
              </div>
              <div>
                <label for="passedPractical">Практична:</label>
                <input type="checkbox" id="passedPractical" v-model="editStudentData.passedPractical" />
              </div>
              <button @click="saveStudent">Зберегти</button>
            </div>
</template>
<script>
import axios from 'axios'
import { getCurrentInstance } from 'vue'

export default {
    data(){
        return{
            students: [],
            search: '',
            student: {"pib": "", zdav: false, group: ""},
            editStudentData: {"pib": "", zdav: false, group: ""},
        }
    },
    mounted(){
        axios.get("http://34.82.81.113:3000/students")
           .then(response => {
               console.log(response.data);
                this.students = response.data;
           })

    },
   methods: {
    addStudent: function() {
        axios.post("http://34.82.81.113:3000/students", this.student)
            .then(response => {
                console.log(response.data);
                this.students.push(response.data);
                 this.$store.commit('setCount', this.students.length);
            })
    },
    deleteStudent: function(studentId) {
        axios.delete(`http://34.82.81.113:3000/students/${studentId}`)
            .then(response => {
                console.log(response.data);
                this.students = this.students.filter(student => student._id !== studentId);
                 this.$store.commit('setCount', this.students.length);
           })
            .catch(error => {
                console.log("Error deleting student: ", error);
            });
    }
},
computed: {
  studentsCount() {
    return this.$store.getters.getCount
  },
  getCurrentUser() {
    return this.$store.getters.getUser
  }
}
}
</script>