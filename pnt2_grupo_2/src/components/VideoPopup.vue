<template>
  <div class="overlay">
    <div class="popup">
      <div class="popup-header">
        <button class="close-button" @click="$emit('cerrar')">×</button>
      </div>

      <iframe
        class="video-frame"
        :src="pelicula.trailer"
        title="Trailer"
        frameborder="0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share;
        "
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pelicula: Object,
});

defineEmits(["cerrar"]);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.75);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3000;
}

.popup {
  position: relative;

  width: 900px;
  max-width: 90%;

  border-radius: 16px;

  overflow: hidden;

  background-color: #071423;
}

.popup-header {
  position: absolute;

  top: 0;
  right: 0;

  z-index: 20;
}

.close-button {
  width: 35px;
  height: 35px;

  margin: 14px;

  border: none;
  border-radius: 4px;

  background-color: rgba(187, 181, 181, 0.561);
  color: rgb(30, 3, 3);

  font-size: 24px;
  font-weight: 700;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.video-frame {
  width: 100%;
  height: 500px;

  border: none;

  display: block;
}
</style>
