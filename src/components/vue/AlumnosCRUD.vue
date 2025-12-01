<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Alumno {
  _id: string;
  nombre: string;
  matricula: string;
  calificacion: number;
  createdAt: string;
  updatedAt: string;
}

const alumnos = ref<Alumno[]>([]);
const loading = ref(false);
const error = ref('');

// Form data
const formData = ref({
  nombre: '',
  matricula: '',
  calificacion: 0
});

// Form validation
const validateForm = () => {
  if (!formData.value.nombre.trim()) {
    error.value = 'El nombre es requerido';
    return false;
  }
  if (!formData.value.matricula.trim()) {
    error.value = 'La matrícula es requerida';
    return false;
  }
  if (formData.value.calificacion < 0 || formData.value.calificacion > 100) {
    error.value = 'La calificación debe estar entre 0 y 100';
    return false;
  }
  error.value = '';
  return true;
};

// Fetch alumnos
const fetchAlumnos = async () => {
  try {
    loading.value = true;
    const response = await fetch('/api/alumnos');
    const data = await response.json();
    if (data.success) {
      alumnos.value = data.data;
    } else {
      error.value = data.error || 'Error al cargar los alumnos';
    }
  } catch (err) {
    error.value = 'Error de conexión con el servidor';
    console.error('Error fetching alumnos:', err);
  } finally {
    loading.value = false;
  }
};

// Add new alumno
const addAlumno = async () => {
  if (!validateForm()) return;
  
  try {
    loading.value = true;
    const response = await fetch('/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });
    
    const data = await response.json();
    
    if (data.success) {
      await fetchAlumnos(); // Refresh the list
      // Reset form
      formData.value = { nombre: '', matricula: '', calificacion: 0 };
    } else {
      error.value = data.error || 'Error al agregar el alumno';
    }
  } catch (err) {
    error.value = 'Error de conexión con el servidor';
    console.error('Error adding alumno:', err);
  } finally {
    loading.value = false;
  }
};

// Delete alumno
const deleteAlumno = async (id: string) => {
  if (!confirm('¿Estás seguro de eliminar este alumno?')) return;
  
  try {
    loading.value = true;
    const response = await fetch('/api/alumnos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      await fetchAlumnos(); // Refresh the list
    } else {
      error.value = data.error || 'Error al eliminar el alumno';
    }
  } catch (err) {
    error.value = 'Error de conexión con el servidor';
    console.error('Error deleting alumno:', err);
  } finally {
    loading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchAlumnos();
});
</script>

<template>
  <div class="alumnos-crud">
    <h2 class="text-2xl font-bold mb-6">Gestión de Alumnos</h2>
    
    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <!-- Add Alumno Form -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 class="text-lg font-semibold mb-4">Agregar Nuevo Alumno</h3>
      <form @submit.prevent="addAlumno" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="formData.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nombre completo"
              required
            />
          </div>
          
          <div>
            <label for="matricula" class="block text-sm font-medium text-gray-700">Matrícula</label>
            <input
              type="text"
              id="matricula"
              v-model="formData.matricula"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Número de matrícula"
              required
            />
          </div>
          
          <div>
            <label for="calificacion" class="block text-sm font-medium text-gray-700">Calificación (0-100)</label>
            <input
              type="number"
              id="calificacion"
              v-model.number="formData.calificacion"
              min="0"
              max="100"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="loading" class="animate-spin mr-2">↻</span>
            {{ loading ? 'Procesando...' : 'Agregar Alumno' }}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Alumnos Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calificación
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Registro
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading && alumnos.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                Cargando...
              </td>
            </tr>
            <tr v-else-if="alumnos.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                No hay alumnos registrados
              </td>
            </tr>
            <tr v-for="alumno in alumnos" :key="alumno._id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ alumno.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ alumno.matricula }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span 
                  :class="{
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                    'bg-red-100 text-red-800': alumno.calificacion < 60,
                    'bg-yellow-100 text-yellow-800': alumno.calificacion >= 60 && alumno.calificacion < 80,
                    'bg-green-100 text-green-800': alumno.calificacion >= 80
                  }"
                >
                  {{ alumno.calificacion }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(alumno.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="deleteAlumno(alumno._id)"
                  :disabled="loading"
                  class="text-red-600 hover:text-red-900 disabled:opacity-50"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles can be added here */
.alumnos-crud {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Animation for loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
  display: inline-block;
}
</style>
