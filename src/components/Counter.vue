<template>
  <div class="container-counter">
    <h2>{{ getTitle }}</h2>
    <p>{{ counter }} <sup>2</sup> = {{ getSquareCounter }}</p>
    <button class="btn" @click="increase">+1</button>
    <button class="btn" @click="decrease">-1</button>
  </div>
</template>
<script>
export default {
  // name: 'OtherName' in developer tools apears with this name
  props: {
    title: String,
    start: {
      type: Number,
      required: true,
      default: 10,
      validator(value) {
        return value > 5;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  computed: {
    getSquareCounter() {
      return this.counter * this.counter;
    },
    getTitle() {
      return this.title || "Counter";
    },
  },
};
</script>
<style scoped>
.btn {
  margin: 0 10px;
  background-color: rgb(231, 131, 0);
  color: white;
  border-radius: 5px;
  border-color: transparent;
}

.btn:hover {
  background-color: rgb(238, 175, 93);
  transition: 0.3s ease-in-out;
}

.container-counter {
  position: relative;
  background: black;
  padding: 2rem;
  z-index: 100;
  margin-bottom: 20px;
}
</style>
