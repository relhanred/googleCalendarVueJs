<template>
  <div>
    <Table>
      <thead>
        Details
      </thead>
      <tbody>
        <tr>{{ event.title }}</tr>
        <tr>{{ event.start }}</tr>
        <tr>{{ event.end }}</tr>
        <tr>{{ event.id }}</tr>
    </tbody>
    </Table>
  </div>
</template>

<script>

export default {
    data: () => ({
        title: "",
        start: {},
        end: {}
    }),
    methods: {
    },
  props: {
    event: Object
  },
  mounted() {
      this.title = this.event.title;
      this.start = this.event.start;
      this.end = this.event.end;
  }
};
</script>

<style>
</style>
