<template>
    <div class="modal fade" ref="modal" tabindex="-1">
        <div class="modal-dialog" :class="dialogClass">
            <div class="modal-content" :class="contentClass">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="close()"></button>
                </div>
                <div class="modal-body">
                    <slot name="body"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close">Закрити</button>
                    <slot name="footer"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Modal} from "bootstrap";

export default {
    name: "Modal",
    props: {
        title: {
            type: String,
        },
        backdropClose: {
            type: Boolean,
            default: false
        },
        dialogClass: {
            type: String,
            default: null
        },
        contentClass: {
            type: String,
            default: null
        }
    },
    data: function (){
        return {
            modal: null,
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal, {
            backdrop: this.backdropClose ? true :'static'
        });
        this.$refs.modal.addEventListener('hidden.bs.modal', () => {
            this.close();
        })
        this.modal.show();
    },
    beforeDestroy: function () {
        this.modal.hide();
    },
    methods: {
        close: function () {
            this.$emit('closed');
        }
    }
}
</script>
