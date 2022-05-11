<template>
  <img v-if="img" :src="img" alt="bg" />
  <div class="bg-dark"></div>
  <div class="container-indecision">
    <input v-model="question" type="text" placeholder="Que quieres saber?" />
    <p>Porfavor introduzca una pregunta</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando....";
        const { answer, image } = await fetch("https://yesno.wtf/api").then(
          (r) => r.json()
        );
        switch (answer) {
          case "yes":
            this.answer = "Si :D";
            break;
          case "no":
            this.answer = "No :(";
            break;
          default:
            this.answer = "No sé ._.";
        }

        this.img = image;
      } catch (error) {
        this.answer = "No hay respues del API";
        this.img = null;
      }
    },
  },
  watch: {
    question(newVal, _) {
      this.isValidQuestion = false;
      console.log(newVal);
      if (newVal.includes("?")) {
        this.getAnswer();
        this.isValidQuestion = true;
      }
    },
  },
};
</script>
<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.container-indecision {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
