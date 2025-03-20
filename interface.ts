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