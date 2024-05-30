<template>
    <div class="form-group">
        <label :for="name">{{ label }}</label>
        <input :type="type" :id="name" :name="name" :value="value" :placeholder="label"
            @input="updateValue($event.target.value)" />
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value);
        }
    }
};
</script>

<style scoped></style>