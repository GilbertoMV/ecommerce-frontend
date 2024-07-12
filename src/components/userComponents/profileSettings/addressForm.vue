<template>
    <form @submit.prevent="updateAddress">
        <formInput v-for="field in fields" :key="field.name" :type="field.type" :label="field.label" :name="field.name"
            v-model="formData[field.name]" />
        <label for="addressType">Address Type</label>
        <select v-model="formData.addressType" name="addressType" id="addressType">
            <option value="" disabled selected>--Seleccione una opcion</option>
            <option value="Laboral">Laboral</option>
            <option value="Residencial">Residencial</option>
        </select>
        <div class="error" v-if="!$v.formData.fullname.required && $v.formData.fullname.$dirty">Full name is
            required</div>
        <div class="error" v-if="!$v.formData.cp.required && $v.formData.cp.$dirty">ZIP code is
            required</div>
        <div class="error" v-if="!$v.formData.state.required && $v.formData.state.$dirty">State is
            required</div>
        <div class="error" v-if="!$v.formData.municipality.required && $v.formData.municipality.$dirty">Municipality is
            required</div>
        <div class="error" v-if="!$v.formData.colony.required && $v.formData.colony.$dirty">Colony is
            required</div>
        <div class="error" v-if="!$v.formData.street.required && $v.formData.street.$dirty">Street is
            required</div>
        <div class="error" v-if="!$v.formData.external_number.required && $v.formData.external_number.$dirty">External
            number
            is required</div>
        <div class="error" v-if="!$v.formData.beetwen_street1.required && $v.formData.beetwen_street1.$dirty">Beetwen
            street 1 is required</div>
        <div class="error" v-if="!$v.formData.beetwen_street2.required && $v.formData.beetwen_street2.$dirty">Beetwen
            street 2 is required</div>
        <div class="error" v-if="!$v.formData.indications.required && $v.formData.indications.$dirty">Indications
            is required</div>
        <div class="error" v-if="!$v.formData.contact_phone.required && $v.formData.beetwen_street2.$dirty">Contact
            Phone is required</div>
        <div class="error" v-if="addressTypeError">Address Type is required</div>
        <div class="error"
            v-if="!($v.formData.fullname.minLength && $v.formData.fullname.maxLength) && $v.formData.fullname.$dirty">
            Full name must be 10 to 255 characters long</div>
        <div class="error" v-if="!($v.formData.cp.minLength && $v.formData.cp.maxLength) && $v.formData.cp.$dirty">
            ZIP code must be 5 characters long</div>
        <div class="error"
            v-if="!($v.formData.state.minLength && $v.formData.state.maxLength) && $v.formData.state.$dirty">
            State must be 10 to 30 characters long</div>
        <div class="error"
            v-if="!($v.formData.municipality.minLength && $v.formData.municipality.maxLength) && $v.formData.municipality.$dirty">
            Municipality must be 10 to 20 characters long</div>
        <div class="error"
            v-if="!($v.formData.colony.minLength && $v.formData.colony.maxLength) && $v.formData.colony.$dirty">
            Colony must be 10 to 50 characters long</div>
        <div class="error"
            v-if="!($v.formData.street.minLength && $v.formData.street.maxLength) && $v.formData.street.$dirty">
            Street must be 10 to 30 characters long</div>
        <div class="error"
            v-if="!($v.formData.external_number.minLength && $v.formData.external_number.maxLength) && $v.formData.external_number.$dirty">
            External Number must be 1 to 4 characters long</div>
        <div class="error"
            v-if="!($v.formData.internal_number.minLength && $v.formData.internal_number.maxLength) && $v.formData.internal_number.$dirty">
            Internal Number must be 1 to 4 characters long</div>
        <div class="error"
            v-if="!($v.formData.beetwen_street1.minLength && $v.formData.beetwen_street1.maxLength) && $v.formData.beetwen_street1.$dirty">
            Full name must be 10 to 255 characters long</div>
        <div class="error"
            v-if="!($v.formData.beetwen_street2.minLength && $v.formData.beetwen_street2.maxLength) && $v.formData.beetwen_street2.$dirty">
            Beetwen Street 1 must be 1 to 100 characters long</div>
        <div class="error"
            v-if="!($v.formData.indications.minLength && $v.formData.indications.maxLength) && $v.formData.indications.$dirty">
            Beetwen Street 2 must be 1 to 100 characters long</div>
        <div class="error"
            v-if="!($v.formData.contact_phone.minLength && $v.formData.contact_phone.maxLength) && $v.formData.contact_phone.$dirty">
            Contact Phone must be 10 characters long</div>
        <div class="error" v-if="!$v.formData.fullname.hasLettersSpaces && $v.formData.fullname.$dirty">
            Full name should only have letters and spaces</div>
        <div class="error" v-if="!$v.formData.cp.hasNumbersOnly && $v.formData.cp.$dirty">
            ZIP Code should only have numbers</div>
        <div class="error" v-if="!$v.formData.state.hasLettersSpaces && $v.formData.state.$dirty">
            State should only have letters and spaces</div>
        <div class="error" v-if="!$v.formData.municipality.hasLettersSpaces && $v.formData.municipality.$dirty">
            Municipality should only have letters and spaces</div>
        <div class="error" v-if="!$v.formData.colony.hasLettersNumbersSpaces && $v.formData.colony.$dirty">
            Colony should only have letters, spaces and/or numbers</div>
        <div class="error" v-if="!$v.formData.street.hasLettersNumbersSpaces && $v.formData.street.$dirty">
            Street should only have letters, spaces and/or numbers</div>
        <div class="error"
            v-if="!$v.formData.external_number.hasLettersNumbersSpaces && $v.formData.external_number.$dirty">
            External Number should only have letters, spaces and/or numbers</div>
        <div class="error"
            v-if="!$v.formData.internal_number.hasLettersNumbersSpaces && $v.formData.internal_number.$dirty">
            Internal Number should only have letters, spaces and/or numbers</div>
        <div class="error"
            v-if="!$v.formData.beetwen_street1.hasLettersNumbersSpaces && $v.formData.beetwen_street1.$dirty">
            Beetwen Street 1 should only have letters, spaces and/or numbers</div>
        <div class="error"
            v-if="!$v.formData.beetwen_street2.hasLettersNumbersSpaces && $v.formData.beetwen_street2.$dirty">
            Beetwen Street 1 should only have letters, spaces and/or numbers</div>
        <div class="error" v-if="!$v.formData.indications.hasLettersNumbersSpaces && $v.formData.indications.$dirty">
            Indications should only have letters, spaces and/or numbers</div>
        <div class="error" v-if="!$v.formData.contact_phone.hasNumbersOnly && $v.formData.contact_phone.$dirty">
            Contact Phone should only have numbers</div>
        <button class="btn">+ Add Address</button>
    </form>

</template>
<script>
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import formInput from '../../formInput.vue';
import Swal from 'sweetalert2';
import apiClient from '../../../store/auth-vuex';
import { helpers } from 'vuelidate/lib/validators'
const hasLettersNumbersSpaces = helpers.regex('hasLettersNumbersSpaces', /^[a-zA-Z0-9\s]+$/); //valida que la cadena solo contenga numeros, letras y espacios o que no contenga caracteres especiales
const hasLettersSpaces = helpers.regex('hasLettersSpaces', /^[a-zA-Z\s]+$/) //valida que la cadena solo contenga letras y espacios o que no contenga numeros ni caracteres especiales
const hasNumbersOnly = helpers.regex('hasNumbersOnly', /^[0-9]+$/) //valida que la cadena sea de numeros unicamente
export default {
    name: 'addressForm',
    components: {
        formInput
    },
    computed: {
        ...mapGetters(['idUser'])
    },
    data() {
        return {
            formData: {
                fullname: '', //nombre completo
                cp: '', //codigo postal
                state: '', //estado
                municipality: '', //municipio
                colony: '', //colonia
                street: '', //calle
                external_number: '', //numero exterior
                internal_number: null, //numero interior
                beetwen_street1: '', //entre calle 1
                beetwen_street2: '', //entre calle 2
                indications: '', //indicaciones
                contact_phone: '', //telefono de contacto
                addressType: '',
            },
            addressTypeError: false,
            fields: [
                { name: 'fullname', type: 'text', label: 'Full Name' },
                { name: 'cp', type: 'text', label: 'ZIP Code' },
                { name: 'state', type: 'text', label: 'State' },
                { name: 'municipality', type: 'text', label: 'Municipality' },
                { name: 'colony', type: 'text', label: 'Colony' },
                { name: 'street', type: 'text', label: 'Street' },
                { name: 'external_number', type: 'text', label: 'External Number' },
                { name: 'internal_number', type: 'text', label: 'Internal Number' },
                { name: 'beetwen_street1', type: 'text', label: 'Beetwen Street 1' },
                { name: 'beetwen_street2', type: 'text', label: 'Beetwen Street 2' },
                { name: 'indications', type: 'text', label: 'Indications' },
                { name: 'contact_phone', type: 'text', label: 'Contact Phone' }
            ]
        }
    },
    validations: {
        formData: {
            fullname: { required, minLength: minLength(10), maxLength: maxLength(255), hasLettersSpaces },
            cp: { required, minLength: minLength(5), maxLength: maxLength(5), hasNumbersOnly },
            state: { required, minLength: minLength(3), maxLength: maxLength(30), hasLettersSpaces },
            municipality: { required, minLength: minLength(3), maxLength: maxLength(20), hasLettersSpaces },
            colony: { required, minLength: minLength(5), maxLength: maxLength(50), hasLettersNumbersSpaces },
            street: { required, minLength: minLength(5), maxLength: maxLength(30), hasLettersNumbersSpaces },
            external_number: { required, minLength: minLength(1), maxLength: maxLength(4), hasLettersNumbersSpaces },
            internal_number: { minLength: minLength(1), maxLength: maxLength(4), hasLettersNumbersSpaces },
            beetwen_street1: { required, minLength: minLength(1), maxLength: maxLength(100), hasLettersNumbersSpaces },
            beetwen_street2: { required, minLength: minLength(1), maxLength: maxLength(100), hasLettersNumbersSpaces },
            indications: { required, minLength: minLength(10), maxLength: maxLength(255), hasLettersNumbersSpaces },
            contact_phone: { required, minLength: minLength(10), maxLength: maxLength(10), hasNumbersOnly },
        }
    },
    methods: {
        async updateAddress() {
            this.$store.dispatch('setLoading', true);
            this.$v.$touch();
            this.addressTypeError = this.addressType === '';
            try {
                if (this.$v.$invalid || this.addressTypeError) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error when registering, invalid data",
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    return;
                }
                console.log({ ...this.formData }) //depuracion
                await apiClient.post('/address/create/', {
                    id_usuario: this.idUser,
                    nombre_completo: this.formData.fullname,
                    codigo_postal: this.formData.cp,
                    estado: this.formData.state,
                    municipio: this.formData.municipality,
                    colonia: this.formData.colony,
                    calle: this.formData.street,
                    num_exterior: this.formData.external_number,
                    num_interior: this.formData.internal_number,
                    entre_calle1: this.formData.beetwen_street1,
                    entre_calle2: this.formData.beetwen_street2,
                    tipo_direccion: this.formData.addressType,
                    indicaciones: this.formData.indications,
                    telefono_contacto: this.formData.contact_phone
                });

                Swal.fire({
                    icon: "success",
                    title: "Successful address registration",
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            } catch (error) {
                console.log(error)
                let errorMessage = 'Error when registering'
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ': ' + error.response.data.message
                }
                Swal.fire({
                    icon: "warning",
                    title: errorMessage,
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false)
            }
        }
    }
}
</script>
<style scoped>
form {
    margin-top: 1rem;
    font-size: 1.6rem;
}

label {
    display: block;
    margin-bottom: .5rem;
}

select {
    width: 100%;
    padding: .8rem;
    box-sizing: border-box;
    border: solid .1rem #62ab18;
    border-radius: .5rem;
    background-color: #d8f0c8;
    margin-bottom: .5rem;
}

.btn {
    margin-top: 2rem;
    width: 100%;
    padding: 1.3rem;
    background-color: #62ab18;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: .5rem;
    transition: all .5s ease;
}

.error {
    color: rgba(255, 0, 0, 0.5);
    padding: .3rem 0;
    font-size: 1.5rem;
}
</style>