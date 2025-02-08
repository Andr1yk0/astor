<template>
    <div class="preview-container"></div>
</template>

<script>
import PSPDFKit from "@nutrient-sdk/viewer";

export default {
    name: "MSDocPreview",
    props: {
        file: {
            type: File,
            required: true
        }
    },
    mounted() {
        PSPDFKit.load({
            document: URL.createObjectURL(this.file),
            container: '.preview-container',
        })
    }
}
</script>
<style scoped>
.preview-container{
    width: 100%;
    height: 600px
}
</style>