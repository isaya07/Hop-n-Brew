<template>
  <div class="">
    <input
      v-model.trim="newTodoText"
      @keyup.enter="addTodo"
      placeholder="Add new todo"
    >
    <ul>
      <li v-for="todo in todos" :key="todo">
        <input
          :value="todo.text"
          @input="updateTodoText(todo, $event.target.value)"
        >
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="notif">test notification</button>
    <input v-model="poids">
    <input v-model="unit">
    <input v-model="to">
    {{ result }}
  </div>
</template>

<script>
// mport { db } from 'api/firebase'
import { Converter } from 'api/UnitConverter'
let todosRef// = db.ref('todos')

export default {
  data () {
    return {
      newTodoText: '',
      poids: 1,
      unit: 'bar',
      to: 'psi',
      todos: null
    }
  },
  computed: {
    result () {
      return Converter(this.poids, this.unit).as(this.to).debug()
    }
  },
  firebase: {
    todos: todosRef
  },
  methods: {
    addTodo: function () {
      console.log(this.$firebase)
      if (this.newTodoText) {
        todosRef.push({
          text: this.newTodoText
        })
        this.newTodoText = ''
      }
    },
    updateTodoText: function (todo, newText) {
      todosRef.child(todo['.key']).child('text').set(newText)
    },
    removeTodo: function (todo) {
      todosRef.child(todo['.key']).remove()
    },
    notif () {
      this.$notification.primary('Your toaster success message.')
    }
  },
  mounted () {
    // todosRef = this.$firebase.database().ref('hops')
  }
}
</script>
