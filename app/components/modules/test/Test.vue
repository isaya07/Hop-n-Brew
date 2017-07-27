<template>
  <div class="">
    <input
      v-model.trim="newTodoText"
      @keyup.enter="addTodo"
      placeholder="Add new todo"
    >
    <ul>
      <li v-for="todo in todos">
        <input
          :value="todo.text"
          @input="updateTodoText(todo, $event.target.value)"
        >
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="notif">test notification</button>
  </div>
</template>

<script>
// mport { db } from 'api/firebase'
let todosRef// = db.ref('todos')

export default {
  data () {
    return {
      newTodoText: ''
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
