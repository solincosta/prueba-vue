<template>
  <div class="login">
    <div class="col-12">
      <Toast />
    </div>

    <div class="container">
      <h5>MiTiendaTISSINI</h5>
      <div class="field">
        <label for="celphone">Numero de Teléfono</label>
        <InputText
          id="celphone"
          placeholder="Digite su telefono"
          v-model="mobilephone"
          @keyup.enter="login"
          class="inputfield w-full"
        />
      </div>
      <div v-show="showProgressLogin">
        <ProgressBar mode="indeterminate" style="height: 0.5em" />
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "primevue/toast";
export default {
  name: "Login",

  data() {
    return {
      mobilephone: "",
      customer: [],
      sections: [],
      showProgressLogin: false,
    };
  },

  components: {
    Toast,
  },
  methods: {
    login: async function () {
      var datos = {
        mobilephone: this.mobilephone,
      };
      let vue = this;
      this.showProgressLogin = true;
      await this.axios
        .post("/api/v3/login/client", datos)
        .then(function (response) {
          if (response.status == 200) {
            localStorage.setItem("customer_id", response.data.customer.id);
            localStorage.setItem("customer_name", response.data.customer.name);
            localStorage.setItem("customer", JSON.stringify(response.data.customer));
            vue.customer = response.data.customer;
            vue.$router.push({ name: "Profile" });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: response.data,
              life: 3000,
            });
          }
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Mensaje de error",
            detail: "El usuario no se puede autenticar",
            life: 3000,
          });
        })
        .then(function () {
          vue.showProgressLogin = false;
        });
    },
    getInit: function(){
        let msj = this.$route.query.logout;
        console.log(msj);
    }
  },

  created: function () {
    this.getInit();
  },
};
</script>
