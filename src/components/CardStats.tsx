import React, { useEffect, useState } from 'react'
import getStats from '@/libs/getStats';
import { useSession } from 'next-auth/react';

export default function CardStats() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const [totalBookings, setTotalBookings] = useState(0);
    const [totalCompany, setTotalCompany] = useState(0);

    useEffect(() => {
        console.log("Session: ", session)
        if (session) {
            getStats(session.verifiedToken)
            .then((res) => {
                if (res.data) {
                    setLoading(false);
                    setTotalBookings(res.data.totalBooking);
                    setTotalCompany(res.data.totalCompany);
                }
            })
            .catch((err) => {
            })
        }
    }, []);

  return (
    <div>
        My Card Stats:
        {
            loading ? <p>Loading...</p> 
            : 
            <p>Total Comp: {totalCompany} & Total Book: {totalBookings}</p>
        }
    </div>
  );
};