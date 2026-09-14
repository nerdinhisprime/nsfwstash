<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { AppInput, AppButton, AppDialog } from '@/shared';
import { uploadMedia } from '@/entities/media';

const file = ref<File>();
const modalRef = ref<InstanceType<typeof AppDialog> | null>(null);
const temporaryRef = ref();
const fileName = ref<string>();
const fileExt = ref<string>();
const fileData = ref();
const fileTags = ref<string[]>([]);
const fileKind = ref<'image' | 'video' | ''>();

const handleChange = (event: Event) => {
  const f = (event.target as HTMLInputElement).files?.[0];
  if (f) {
    file.value = markRaw(f);
    temporaryRef.value = URL.createObjectURL(file.value);
    fileData.value = file.value.name.match(/(.*)(\.[^/.]+$)/);
    fileName.value = fileData.value[1];
    fileExt.value = fileData.value[2];

    fileKind.value = f.type.startsWith('video/') ? 'video' : 'image';
  }
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.trim();

  if (value) {
    fileTags.value.push(value);
    target.value = '';
  }
};

const handleUpload = async () => {
  try {
    const res = await uploadMedia(file, `${fileName.value}${fileExt.value}`);
    console.log('uploaded:', res.filename);
  } catch (err) {
    console.error(err);
  }
};
</script>
<template>
  <AppButton @click="modalRef?.open()" class="add-media">+</AppButton>
  <AppDialog ref="modalRef" class="upload-modal">
    <h2>upload a file</h2>
    <form @submit.prevent="handleUpload" class="column">
      <video
        v-if="fileKind === 'video'"
        :src="temporaryRef"
        width="300"
        muted
        autoplay
        loop
        playsinline
      />
      <img v-else-if="temporaryRef" :src="temporaryRef" width="300px" />
      <AppInput
        type="file"
        :placeholder="!temporaryRef ? 'add a file' : 'replace the file'"
        :subtype="temporaryRef ? 'file-button' : 'file-card'"
        @change="handleChange"
      />
      <AppInput :placeholder="fileName" />
      <AppInput placeholder="artist" />
      <AppInput placeholder="source" />
      <AppInput placeholder="add a tag" @keydown.enter="handleInput" />
      <ul class="tag-container">
        <li
          v-for="(i, idx) in fileTags"
          :key="idx"
          @click="fileTags.splice(idx, 1)"
          class="tag"
        >
          <p style="display: inline">{{ i }}</p>
        </li>
      </ul>
      <AppButton v-if="temporaryRef" type="submit" class="upload-button"
        >upload</AppButton
      >
    </form>
  </AppDialog>
</template>

<style scoped>
.add-media {
  width: 100px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 1);
}
.upload-modal {
  background-color: #333;
}
.upload-button {
  background-color: darkolivegreen;
}
.tag-container {
  display: flex;
  gap: 10px;
}
.tag {
  background-color: wheat;
  cursor: pointer;
}
.tag:hover {
  background-color: cornsilk;
  flex-wrap: wrap;
  transition: 1s;
}
</style>
