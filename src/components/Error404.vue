<template>
  <section class="section is-medium">
  <div class="columns is-mobile is-centered">
    <div class="column is-12-mobile is-9-tablet is-6-desktop is-narrow">
      <div class="notification is-danger">
        <h1 class="has-text-centered is-size-404 has-text-weight-bold">
          404
        </h1>
        <div class="has-text-centered is-for-404">
          <span class="icon is-large">
            <icon :icon="['fas', 'exclamation-circle']" size="6x"/>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span class="is-size-5 has-text-weight-bold">
            Oops! The page you request was not found!
          </span>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<style lang="scss" scoped>
  .is-size-404 {
      font-size: 6rem;
  }
  .is-for-404 {
    margin-top: -2rem;
  }
</style>
