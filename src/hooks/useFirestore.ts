"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeToCollection } from "@/lib/firebase/service";
import { QueryConstraint } from "firebase/firestore";

/**
 * Generic hook that subscribes to a Firestore sub-collection for the current user.
 * Returns { data, loading, error }.
 */
export function useFirestoreCollection<T>(
    colName: string,
    constraints: QueryConstraint[] = []
) {
    const { user } = useAuth();
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsub = subscribeToCollection<T>(
            user.uid,
            colName,
            constraints,
            (result) => {
                setData(result);
                setLoading(false);
                setError(null);
            }
        );

        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid, colName]);

    return { data, loading, error };
}
