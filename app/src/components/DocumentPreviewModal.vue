<template>
    <Modal :title="file.name" :dialog-class="'modal-lg'" @closed="$emit('closed')">
        <div slot="body">
            <iframe class="w-100" :src="fileSrc" />
        </div>
    </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
    name: "DocumentPreviewModal",
    components: {Modal},
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