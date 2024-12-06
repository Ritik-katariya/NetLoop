import { useEffect, useState } from "react";
import { useGetDoctorQuery } from "../api/doctorApi";
import { useGetPatientQuery } from "../api/patientApi";
import { getUserInfo } from '../../service/auth.service';
import { useGetStaffQuery } from "../api/staffApi";

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [isSkip, setIsSkip] = useState(true);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    const { data: doctorData, isError, isSuccess: dIsSuccess } = useGetDoctorQuery(userId, { skip: isSkip });
    const { data: patientData, isError: pIsError, isSuccess: pIsSuccess } = useGetPatientQuery(userId, { skip: isSkip });


    const { data: staffData, isError: sIsError, isSuccess: sIsSuccess } = useGetStaffQuery(userId, { skip: isSkip });

    useEffect(() => {

        const localAuth = getUserInfo();

        if (localAuth && localAuth !== null) {
            if (localAuth?.role === 'patient') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(patientData)
                setRole(localAuth.role)
                setAuthChecked(pIsSuccess && !pIsError)
            } else if (localAuth.role === 'doctor') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(doctorData)
                setRole(localAuth.role)
                setAuthChecked(dIsSuccess && !isError)
            }
            else if (localAuth.role === 'staff') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(staffData)
                setRole(localAuth.role)
                setAuthChecked(sIsSuccess && !sIsError)
            }
        }

    }, [patientData, doctorData, isError, dIsSuccess, pIsError, pIsSuccess,sIsSuccess,sIsError]);

    return {
        authChecked,
        data,
        role
    };
}