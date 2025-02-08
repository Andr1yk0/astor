<template>
    <div>
        <div class="list-group mt-2">
            <div v-for="(file) in files" :key="file.name" class="list-group-item d-flex justify-content-between">
                <span>{{file.name}}</span>
                <div>
                    <button
                        type="button"
                        v-if="file.type === 'application/pdf'"
                        class="btn btn-outline-primary btn-sm"
                        @click="setPreviewFile(file)"
                    >
                        <FontAwesomeIcon :icon="['far', 'eye']"/>
                    </button>&nbsp;
                    <button
                        type="button"
                        v-if="showRemoveBtn"
                        class="btn btn-outline-danger btn-sm"
                        @click="removeDocumentHandler(file)"
                    >
                        <FontAwesomeIcon :icon="['far', 'trash-can']"/>
                    </button>
                </div>
            </div>
        </div>
        <DocumentPreviewModal v-if="previewFile" :file="previewFile" @closed="previewFile = null" />
    </div>
</template>

<script>
import DocumentPreviewModal from "@/components/DocumentPreviewModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library} from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faEye } from "@fortawesome/free-regular-svg-icons";

library.add(faTrashCan, faEye);

export default {
    name: "DocumentsList",
    components: {DocumentPreviewModal, FontAwesomeIcon},
    props: {
        files: {
            type: Array,
            required: true
        },
        showRemoveBtn: {
            type: Boolean,
            default: false
        }
    },
    data: function (){
        return {
            previewFile: null,
        }
    },
    methods: {
        setPreviewFile: function(file){
            this.previewFile = file;
        },
        removeDocumentHandler: function(file){
            this.$emit('removeDocument', file);
        }
    }
}
</script>

