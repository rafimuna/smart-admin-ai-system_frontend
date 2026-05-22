<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Products</div>
        <div class="text-grey-7 text-caption">Manage your store products</div>
      </div>

      <q-btn color="primary" icon="add" label="Add Product" unelevated @click="openDialog" />
    </div>

    <!-- SEARCH -->
    <q-input v-model="search" outlined dense placeholder="Search products..." class="q-mb-md">
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- LOADING STATE -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner size="40px" color="primary" />
      <div class="text-grey q-mt-sm">Loading products...</div>
    </div>

    <!-- ERROR STATE -->
    <q-banner v-else-if="error" class="bg-red-2 text-red-10 q-mb-md">
      {{ error }}
    </q-banner>

    <!-- EMPTY STATE -->
    <div v-else-if="filteredProducts.length === 0" class="text-center q-pa-xl">
      <q-icon name="inventory_2" size="60px" color="grey" />
      <div class="text-grey q-mt-sm">No products found</div>
    </div>

    <!-- TABLE -->
    <q-table v-else flat bordered :rows="filteredProducts" :columns="columns" row-key="id">
      <!-- ACTIONS -->
      <template #body-cell-actions="props">
        <q-td>
          <q-btn flat round icon="edit" color="primary" @click="editProduct(props.row)" />

          <q-btn flat round icon="delete" color="negative" @click="removeProduct(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- DIALOG -->
    <q-dialog v-model="dialog">
      <q-card style="width: 450px">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Edit Product' : 'Add Product' }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Name" outlined class="q-mb-md" />
          <q-input v-model="form.price" label="Price" outlined type="number" class="q-mb-md" />
          <q-input v-model="form.image" label="Image URL" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useProductStore } from 'src/stores/product'

const $q = useQuasar()
const productStore = useProductStore()

/* ---------------- STATE ---------------- */
const search = ref('')
const loading = ref(false)
const error = ref(null)

/* ---------------- DIALOG ---------------- */
const dialog = ref(false)
const editMode = ref(false)

const form = ref({
  id: null,
  name: '',
  price: '',
  image: '',
})

/* ---------------- TABLE COLUMNS ---------------- */
const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'price', label: 'Price', field: 'price', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

/* ---------------- COMPUTED ---------------- */
const filteredProducts = computed(() => {
  return productStore.products.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

/* ---------------- LOAD DATA ---------------- */
async function loadProducts() {
  try {
    loading.value = true
    error.value = null

    // simulate API delay
    await new Promise((r) => setTimeout(r, 500))

    // if using API later:
    // await productStore.fetchProducts()
  } catch {
    error.value = 'Failed to load products'
  } finally {
    loading.value = false
  }
}

/* ---------------- ACTIONS ---------------- */
function openDialog() {
  editMode.value = false
  form.value = { id: null, name: '', price: '', image: '' }
  dialog.value = true
}

function editProduct(product) {
  editMode.value = true
  form.value = { ...product }
  dialog.value = true
}

function saveProduct() {
  if (!form.value.name || !form.value.price) {
    $q.notify({ type: 'negative', message: 'Fill all fields' })
    return
  }

  if (editMode.value) {
    productStore.updateProduct(form.value)
    $q.notify({ type: 'positive', message: 'Updated' })
  } else {
    productStore.addProduct(form.value)
    $q.notify({ type: 'positive', message: 'Added' })
  }

  dialog.value = false
}

function removeProduct(id) {
  productStore.deleteProduct(id)
  $q.notify({ type: 'warning', message: 'Deleted' })
}

/* ---------------- INIT ---------------- */
onMounted(() => {
  loadProducts()
})
</script>
