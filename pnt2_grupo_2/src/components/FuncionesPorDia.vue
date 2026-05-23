<script setup>
defineProps({
  fechas: Array,
  fechaSeleccionada: String,
  funcionesPorDia: Object
})
defineEmits(["cambiar-fecha"])
</script>

<template>
  <div>
    <div style="display:flex; gap:10px; margin-bottom:20px;">
      <div
        v-for="f in fechas"
        :key="f"
        @click="$emit('cambiar-fecha', f)"
        :style="{
          padding:'10px 15px',
          borderRadius:'8px',
          cursor:'pointer',
          background: fechaSeleccionada === f ? '#fff' : '#0a1a2f',
          color: fechaSeleccionada === f ? '#000' : '#fff'
        }"
      >
        {{ f }}
      </div>
    </div>
    <div v-if="funcionesPorDia[fechaSeleccionada]">
      <div
        v-for="f in funcionesPorDia[fechaSeleccionada]"
        :key="f.id"
        style="background:#eee; padding:10px; border-radius:8px; margin-bottom:10px;"
      >
        <p><strong>Hora:</strong> {{ f.hora }}</p>
        <p><strong>Sala:</strong> {{ f.sala }}</p>
        <p><strong>Idioma:</strong> {{ f.idioma }}</p>
        <p><strong>Precio:</strong> ${{ f.precio }}</p>
      </div>
    </div>
  </div>
</template>
