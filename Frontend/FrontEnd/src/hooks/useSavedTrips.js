import { useState, useEffect, useCallback } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

/**
 * useSavedTrips
 * Provides real-time saved trips from Firestore for the logged-in user.
 * Returns:
 *   savedTrips  — live array of saved docs { id, ...data }
 *   saveTrip(item) — save a state or attraction
 *   removeTrip(docId) — remove by Firestore doc ID
 *   isSaved(stateName, attractionName?) — { saved: bool, docId: string|null }
 */
export function useSavedTrips() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setLoading(false); return; }

    const ref = query(
      collection(db, "users", user.uid, "savedTrips"),
      orderBy("savedAt", "desc")
    );

    const unsub = onSnapshot(ref, (snap) => {
      setSavedTrips(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const saveTrip = useCallback(async (item) => {
    const user = auth.currentUser;
    if (!user) return;
    await addDoc(collection(db, "users", user.uid, "savedTrips"), {
      ...item,
      savedAt: serverTimestamp(),
    });
  }, []);

  const removeTrip = useCallback(async (docId) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "savedTrips", docId));
  }, []);

  const isSaved = useCallback(
    (stateName, attractionName = null) => {
      const found = savedTrips.find(
        (t) =>
          t.stateName === stateName &&
          (attractionName ? t.attractionName === attractionName : !t.attractionName)
      );
      return { saved: !!found, docId: found?.id || null };
    },
    [savedTrips]
  );

  return { savedTrips, loading, saveTrip, removeTrip, isSaved };
}
