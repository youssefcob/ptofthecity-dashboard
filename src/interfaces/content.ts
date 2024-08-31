// import type { Service } from "@/components/HomePage/servicesSection/Services";

export type Media = {
    id: number,
    clinic_id: number,
    title: null | string,
    media_type: "image" | "video" | "audio",
    path: string,
}
type day = {
    start: string,
    end: string,
}
export type Schedule = {
    monday: day | string,
    tuesday: day | string,
    wednesday: day | string,
    thursday: day | string,
    friday: day | string,
    saturday: day | string,
    sunday: day | string,
};

export type Clinic = {
    // [key: string]:[
    // {
    id: number,
    name: string,
    street_address: string,
    city: string,
    state: string,
    zip_code: string,
    long: string,
    lat: string,
    summary: string,
    phone: string,
    capacity: number,
    rating: number,
    // number_of_ratings: number | string | null,
    holidays: String[] | null,
    schedule: Schedule,
    media: Media[],
    services: Service[],
    place_id:string,
    reviews: Review[],
    user_ratings_total: number,
    // }
    // ]
}

export type Review = {
    author_name: string,
    author_url: string,
    language: string,
    original_language: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string,
    time: number,
    translated: boolean,
};

export type HttpReview = {
        rating: number,
        reviews: Review[],
        user_ratings_total: number,

}

export type Service = {
    id: string;
    path: string;
    title: string;
    description: string;
    listHeader: string;
    list: string[];
    
}

export type Insurance = {
    id: number,
    title:string,
    path:string
}

export type Reservation = {
    id: number;
    user_id: null | number;
    clinic_id: number;
    clinic: Clinic;
    insurance_id: null | number;
    first_name: string;
    last_name: string;
    gender: "male" | "female" | "other";
    phone: string;
    email: string;
    method: null | string;
    status: "pending" | "confirmed" | "cancelled";
    payment: "self_pay" | "insurance";
    insurance_company: null | string;
    member_id: null | string;
    date_in_unix: number;
    about_your_pain: string;
    reserved_by: "patient" | "staff";
    guest: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}


