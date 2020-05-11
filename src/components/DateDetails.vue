<template>
  <div>
    <Table>
      <tbody>
        <tr>{{ this.start }}</tr>
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
      this.start = this.event.date;
  }
};
</script>

<style>
</style>
