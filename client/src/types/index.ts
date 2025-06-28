// src/types/index.ts

export interface User {
    _id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
}

export interface JobType {
    name: string;
}

export interface Artisan {
    _id: string;
    user: User;
    jobType?: JobType;
    location?: string;
    rating?: number;
    pricingEstimate?: number;
}
