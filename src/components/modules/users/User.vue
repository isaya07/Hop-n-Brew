<template>
  <form>
    <div class="grid">
      <div class="col">
        <label for="displayname">Name
          <input type="text" id="displayname" v-model="user.name">
        </label>
      </div>
      <div class="col">
        <label for="email">Email
          <input type="email" id="email" v-model="user.email">
        </label>
      </div>
      <div class="col">
        <button type="button" name="button" @click="updateUser">Update</button>
      </div>
    </div>
  </form>
</template>

<script>
// import { db } from 'api/firebase'
let userRef// = db.ref('users')

export default {
  firebase: {
    users: {
      source: userRef,
      asObject: false,
      cancelCallback: function () { console.log('cancel callback') },
      readyCallback: function () { this.$bus.$emit('progress', 'stop') }
    }
  },

  created () {
    this.$bus.$emit('progress', 'pause')
  },

  data () {
    return {
      userInfo: this.$auth.currentUser
    }
  },

  computed: {
    user () {
      let user = {
        name: this.userInfo.displayName,
        email: this.userInfo.email,
        uid: this.userInfo.uid
      }
      return user
    }
  },

  methods: {
    writeUserDB (userId, role) {
      /* db.ref('users/' + userId).set({ role: role }).then(() => {
      }).catch(error => {
        console.error('Update db users failed', error)
      }) */
    },
    updateUser () {
      /* if (this.userInfo.displayName !== this.user.name) {
        this.userInfo.updateProfile({ displayName: this.user.name }).then(() => {
          this.userInfo = this.$auth.currentUser
          this.$notification.success(this.userInfo.displayName + ' successfully updated')
        }, error => {
          this.$notification.error('Update of' + this.userInfo.displayName + ' failed: ' + error.message)
        })
      }
      if (this.userInfo.email !== this.user.email) {
        this.userInfo.updateEmail({ displayName: this.user.name }).then(() => {
          this.userInfo = this.$auth.currentUser
          this.$notification.success(this.userInfo.email + ' successfully updated')
        }, error => {
          this.$notification.error('Update of' + this.userInfo.email + ' failed: ' + error.message)
        })
      }

      this.writeUserDB(this.userInfo.uid, 'admin')
      console.log(this.users)
      console.log(this.userInfo) */
    }
  }
}
</script>
