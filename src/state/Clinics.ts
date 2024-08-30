import type { Clinic } from "@/interfaces/content";
import Http from "@/mixins/Http";
import { ref, type Ref } from "vue";
interface ClinicsByCity {
    [key: string]: Clinic[];
}
export const clinics: Ref<ClinicsByCity> = ref({});

export const getAllClinics = async () => {
    let data = await Http.get('clinic/groupByLocation');
    clinics.value = data;
    return data;
    // searchedClinics.value = data;
    // clinic_cities.value = Object.keys(data);
    console.log(data)
}
