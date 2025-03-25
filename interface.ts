// controllers/auth.js & middleware/auth.js
interface AuthenticationUserApi {
    success: boolean;
    token?: string;
    message?: string;
}

interface UserApi {
    success: boolean;
    message: string;
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
    pagination?: Pagination;
    data?: CompanyModel[] | CompanyModel;
    message?: string;
}

interface Pagination {
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
    maxPage: number;
}

// models/Booking.js
interface BookingModel {
    _id: string;
    apptDate: Date;
    user: string;
    company: CompanyModel;
    createdAt: Date;
}

// models/Company.js
interface CompanyModel {
    _id: string;
    name: string;
    address: string;
    website: string;
    description: string;
    telephone: string;
}

// models/User.js
interface UserModel {
    _id?: string;
    name: string;
    telephone: string;
    email: string;
    password?: string;
    role: string;
    createdAt: Date;
}