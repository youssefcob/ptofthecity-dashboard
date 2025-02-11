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
    off: boolean,
}
export type Schedule = {
    monday: day,
    tuesday: day,
    wednesday: day,
    thursday: day,
    friday: day,
    saturday: day,
    sunday: day,
};

export type Staff = {
    id: number;
    title: string;
    first_name: string;
    last_name: string;
    bio: string;
    schedule: string;
    image: string;
    occupation: string;
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
    image: string,
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
    id?: string;
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

export type Message = {
    id: number;
    name: string;
    // status: "unread" | "read";
    is_read: number;
    email: string;
    phone: string;
    message: string;
    subject:string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}

export type Count = {
    title: string;
    count: number;
}

export type Career = {
    city: string;
    state: string;
    zip_code: string;
    street_address: string;
    email:string;
    id: number;
    job: string;
    first_name: string;
    last_name: string;
    is_read: number;
    phone: string;
    created_at: string;
    resume: string;
}

export type Eligibility = {
    id: number;
    first_name: string;
    last_name: string;
    gender:string;
    phone: string;
    email: string;
    dob: string;
    created_at: string;
    insurance_card_back: string;
    insurance_card_front: string;
    insurance_provider: string;
    medicaid_id: string;
    member_id: string;
    medicare_id: string;
    status: string;
}

export type Job = {
    id: number;
    title: string;
    description: string;
    isAvailable: number;
    created_at: string;
    updated_at: string;
}

export type FAQ = {
    id: number;
    question: string;
    answer: string;
    category: string;
    is_main: number;
    created_at: string;
    updated_at: string;
}

export type FaqsCateogorized = {
        [key: string]:FAQ[]
        
}

export type User = {
    created_at: string;
    deleted_at: null | string;
    first_name: string;
    id: number;
    last_name: string;
    phone: string;
    role: string;
    updated_at: string;
};