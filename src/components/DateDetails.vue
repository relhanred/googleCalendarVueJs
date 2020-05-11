<template>
  <div>
    <Table>
      <thead>
        Details
      </thead>
      <tbody>
        <tr>{{ event.start }}</tr>
        <tr>{{ event.end }}</tr>
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
      this.start = this.event.start;
      this.end = this.event.end;
  }
};
</script>

<style>
</style>
