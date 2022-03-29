<template>
  <div class="profile">
    <div class="card">
      <div
        class="flex flex-row-reverse flex-wrap card-container yellow-container"
      >
        <div class="flex align-items-center m-2">
          <Button
            label="Salir"
            icon="pi pi-power-off"
            class="p-button-danger"
            @click="cerrarSesion()"
            :style="{ 'margin-left': '0 .5em' }"
          />
        </div>
        <div class="flex align-items-center m-2">
          <h4>{{ nameuser }}</h4>
        </div>
      </div>
    </div>
    <div v-show="showProgressCategories">
      <ProgressBar mode="indeterminate" style="height: 0.5em" />
    </div>

    <div class="grid">
      <div class="col">
          <DataTable :value="sections" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">
          Categorias
          <Button icon="pi pi-refresh" />
        </div>
      </template>
      <Column field="name" header="Nombre"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img
            :src="'https://v3.tissini.app/' + slotProps.data.image"
            :alt="slotProps.data.image"
            class="product-image"
          />
        </template>
      </Column>
      <Column header="Ver">
        <template #body="slotProps">
          <Button
            icon="pi pi-search"
            class="p-button-rounded p-button-primary mr-2"
            @click="viewCategory(slotProps.data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
          </DataTable>
      </div>
      <div class="col">
            <DataView
      :value="products"
      :layout="layout"
      :paginator="true"
      :rows="6"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Ordenar por precio"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img
              :src="'https://v3.tissini.app' + slotProps.data.image.url"
              :alt="slotProps.data.name"
              class="product-image"
            />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
              <Rating
                :value="slotProps.data.rating.votes"
                :readonly="true"
                :cancel="false"
              ></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{
                slotProps.data.categories.name
              }}</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{
                  slotProps.data.categories.name
                }}</span>
              </div>
            </div>
            <div class="product-grid-item-content">
              <img
                :src="defaultroute + slotProps.data.image.url"
                :alt="slotProps.data.name"
                class="product-image"
              />
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
              <Rating
                :value="slotProps.data.rating.votes"
                :readonly="true"
                :cancel="false"
              ></Rating>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart"></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
      </div>
    </div>
    


  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      defaultroute: "https://v3.tissini.app",
      showProgressCategories: false,
      nameuser: "",
      iduser: 0,
      customer: [],
      products: [],
      sections: [],
      nuevo: "NUEVO",
      noesnuevo: "DE SEGUNDA",
      layout: "grid",
      sortKey: 1,
      sortOrder: 5,
      sortField: "name",
      sortOptions: [
        { label: "Precio mas alto", value: "!price" },
        { label: "Precio mas bajo", value: "price" },
      ],
    };
  },

  methods: {
    getSections: async function () {
      this.showProgressCategories = true;
      let vue = this;
      await this.axios
        .get("/api/v3/categories/sections")
        .then(function (response) {
          vue.sections = response.data;
        })
        .catch((error) => {
          alert(error);
        })
        .then(function () {
          vue.showProgressCategories = false;
        });
    },

    viewCategory: function (data) {
      let nameSearch = data.name;
      var arr = this.sections.find((res) => res.name === nameSearch);
      this.products = arr.products;
    },

    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    cerrarSesion() {
      localStorage.clear();
      //localStorage.removeItem('customer_id');
      this.$router.push({ name: "Login" });
    },
  },

  created: function () {
    this.getSections();
  },

  mounted() {
    if (localStorage.getItem("customer_id")) {
      this.nameuser = localStorage.getItem("customer_name");
      this.iduser = localStorage.getItem("customer_id");
      let data = localStorage.getItem('customer');
      //console.log('data: ', );
      this.customer = JSON.parse(data);
    } else {
      //this.$router.push({ patch: "/login" , query:{logout:'Se ha finalizado su sesión de ususario'}});
      this.$router.push({ name: "Login" , query:{logout:'Se ha finalizado su sesión de ususario'}});
    }
  },
};
</script>

<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
