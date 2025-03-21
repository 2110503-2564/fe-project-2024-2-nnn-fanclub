// controllers/auth.js & middleware/auth.js
interface AuthenticationUserApi {
    success: boolean;
    token?: string;
    message?: string;
}

interface UserApi {
    success: boolean;
    data?: Object;
}

// controllers/bookings.js
interface BookingApi {
    success: boolean;
    count?: number;
    data?: Object;
    message?: string;
}

// controllers/companies.js
interface CompaniesApi {
    success: boolean;
    count?: number;
    pagination?: Object;
    data?: Object;
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
    _id: string;
    name: string;
    telephone: string;
    email: string;
    password?: string;
    role: string;
    createdAt: Date;
}