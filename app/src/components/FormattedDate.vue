<template>
    <span>{{formattedDate}}</span>
</template>
<script>
import dayjs from "dayjs";

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export default {
    name: "FormattedDate",
    props: {
        date: {
            type: String,
            required: true,
        }
    },
    computed: {
        formattedDate: function (){
            return this.date ? dayjs(this.date).format('L') : ''
        }
    },
}
</script>