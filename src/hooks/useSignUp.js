//hooks
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//firebase imports
import { auth, db, storage } from '../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signUp = async (
    email,
    password,
    displayName,
    thumbnail,
    createAddress
  ) => {
    setError(null);
    setIsPending(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', paylod: res.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        console.log(res.user);
        // upload user profile picture
        if (thumbnail == null) {
          return;
        }
        const imageRef = ref(
          storage,
          `thumbnails/${res.user.uid}/${thumbnail.name}`
        );
        uploadBytes(imageRef, thumbnail)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              updateProfile(res.user, {
                displayName: displayName,
                photoURL: url,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });

        const uid = res.user.uid;
        setDoc(doc(db, 'users', uid), {
          online: false,
          displayName,
          address: createAddress,
        });
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
          console.log(error);
        }
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, signUp, isPending };
};
