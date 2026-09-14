<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMediaId } from '@/entities/media';
import { AppButton } from '@/shared';

interface URLStrings {
  previewUrl: string;
  originalUrl: string;
  mediaType: 'image' | 'video';
}

const { id } = useRoute().params;
const urls = ref<URLStrings>();
const mediaUrl = ref<string | undefined>();
const mediaType = ref<'image' | 'video'>();

const showOriginalImg = () => {
  if (history.state.originalUrl && history.state.mediaType) {
    mediaUrl.value = history.state.originalUrl;
    mediaType.value = history.state.mediaType;
  } else {
    mediaUrl.value = urls.value?.originalUrl;
    mediaType.value = urls.value?.mediaType;
  }
};

onMounted(async () => {
  if (history.state.originalUrl && history.state.mediaType) {
    mediaUrl.value = history.state.previewUrl;
    mediaType.value = history.state.mediaType;
  } else {
    urls.value = (await getMediaId(Number(id))) as URLStrings;

    if (urls.value) {
      mediaType.value = urls.value.mediaType;
      if (mediaType.value === 'video') {
        mediaUrl.value = urls.value.originalUrl;
      } else {
        mediaUrl.value = urls.value.previewUrl;
      }
    }
  }
});
</script>
<template>
  <div class="img-container">
    <AppButton v-if="mediaType === 'image'" @click="showOriginalImg">
      <img :src="mediaUrl" class="image" />
    </AppButton>
    <video v-else-if="mediaType === 'video'" controls width="600">
      <source :src="mediaUrl" />
    </video>
    <p v-else>error loading content:(</p>
  </div>
</template>

<style scoped>
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  max-width: 90%;
}
</style>

