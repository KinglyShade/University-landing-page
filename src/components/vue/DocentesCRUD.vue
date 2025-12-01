<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Docente {
  _id: string;
  name: string;
  employeeNumber: string;
  department?: string;
  email?: string;
}

const docentes = ref<Docente[]>([]);
const loading = ref(false);
const error = ref('');
const formData = ref({ name: '', employeeNumber: '', department: '', email: '' });

const fetchDocentes = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api/docentes');
    const data = await res.json();
    if (data.success) {
      docentes.value = data.data;
      error.value = '';
    } else {
      error.value = data.error || 'Error desconocido';
    }
  } catch (e) {
    console.error(e);
    error.value = 'Error de conexión (Revisa IP en MongoDB Atlas)';
  } finally {
    loading.value = false;
  }
};

const addDocente = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api/docentes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    });
    const body = await res.json();
    if (!res.ok) {
      error.value = body?.error || 'Error al crear';
      return;
    }
    await fetchDocentes();
    formData.value = { name: '', employeeNumber: '', department: '', email: '' };
  } catch (e) {
    console.error(e);
    error.value = 'Error al guardar';
  } finally {
    loading.value = false;
  }
};

const deleteDocente = async (id: string) => {
  if (!confirm('¿Eliminar docente?')) return;
  loading.value = true;
  try {
    await fetch('/api/docentes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchDocentes();
  } catch (e) {
    console.error(e);
    error.value = 'Error al eliminar';
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchDocentes());
</script>

<template>
  <div class="w-full">
    <div v-if="error" class="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
      <p class="font-bold">Error:</p>
      <p>{{ error }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border border-gray-200">
      <div class="bg-[#002b15] px-6 py-4">
        <h2 class="text-white font-bold text-xl uppercase tracking-wider">Claustro Docente - Agregar Docente</h2>
      </div>
      <div class="p-6">
        <form @submit.prevent="addDocente" class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label class="block text-gray-700 font-bold mb-2">Nombre</label>
            <input v-model="formData.name" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" required placeholder="Nombre completo" />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">No. Empleado</label>
            <input v-model="formData.employeeNumber" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" required placeholder="EMP-001" />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Departamento</label>
            <input v-model="formData.department" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" placeholder="Departamento" />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Correo</label>
            <input v-model="formData.email" type="email" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" placeholder="nombre@correo.com" />
          </div>
          <div class="md:col-span-4 flex justify-end">
            <button :disabled="loading" type="submit" class="bg-[#007a33] hover:bg-[#005c26] text-white font-bold py-2 px-6 rounded shadow transition-colors disabled:opacity-50">
              {{ loading ? 'Guardando...' : 'Guardar Docente' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <table class="min-w-full">
        <thead class="bg-[#002b15] text-white">
          <tr>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Nombre</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">No. Empleado</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Departamento</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Email</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="docente in docentes" :key="docente._id" class="hover:bg-gray-50">
            <td class="px-6 py-4">{{ docente.name }}</td>
            <td class="px-6 py-4 font-mono text-sm">{{ docente.employeeNumber }}</td>
            <td class="px-6 py-4">{{ docente.department }}</td>
            <td class="px-6 py-4">{{ docente.email }}</td>
            <td class="px-6 py-4">
              <button @click="deleteDocente(docente._id)" class="text-red-600 hover:text-red-900 font-semibold text-sm">Eliminar</button>
            </td>
          </tr>
          <tr v-if="docentes.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">No hay registros.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Institutional style: dark green header, green buttons, white inputs */
</style>
