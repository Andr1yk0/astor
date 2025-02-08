<template>
    <Modal :title="file.name" :dialog-class="'modal-lg'" @closed="$emit('closed')">
        <div slot="body">
            <iframe v-if="file.type === 'application/pdf'" class="w-100" :src="fileSrc" />
            <MSDocPreview v-else :file="file" />
        </div>
    </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue";
import MSDocPreview from "@/components/MSDocPreview.vue";

export default {
    name: "DocumentPreviewModal",
    components: {MSDocPreview, Modal},
    props: {
        file: {
            type: File,
            required: true
        }
    },
    data: function (){
        return {
            fileSrc: null,
        }
    },
    created() {
        this.fileSrc = URL.createObjectURL(this.file)
    }
}
</script>
<style scoped>
iframe{
    min-height: 500px;
}
</style>