// controllers/auth.js & middleware/auth.js
interface AuthenticationUserApi {
    success: boolean;
    token?: string;
    message?: string;
}

interface UserApi {
    success: boolean;
    token?: string;
    data?: UserModel;
}

// controllers/bookings.js
interface BookingApi {
    success: boolean;
    count?: number;
    data?: BookingModel[] | BookingModel;
    message?: string;
}

// controllers/companies.js
interface CompaniesApi {
    success: boolean;
    count?: number;
    pagination?: Object;
    data?: CompanyModel[] | CompanyModel;
    message?: string;
}

// models/Booking.js
interface BookingModel {
    apptDate: Date;
    user: string;
    company: string;
    createdAt: Date;
}

// models/Company.js
export interface CompanyModel {
    _id: string;
    name: string;
    address: string;
    website: string;
    description: string;
    telephone: string;
}

// models/User.js
export interface UserModel {
    _id: string;
    name: string;
    telephone: string;
    email: string;
    password?: string;
    role: string;
    createdAt: Date;
}