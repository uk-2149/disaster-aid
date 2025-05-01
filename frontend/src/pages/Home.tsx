import React, { useState, useEffect, FormEvent } from 'react';
import NavBar from '../components/NavBar';
import RequestForm from '../components/RequestForm';
import { signInAnonymously, User } from 'firebase/auth';
import { db, auth, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { RequestData } from '../types/RequestData';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [formData, setFormData] = useState<RequestData>({
    name: '',
    message: '',
    needs: '',
    photo: null,
    location: null,
  });

  // Handle authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user);
          })
          .catch((error) => {
            console.error('Anonymous sign-in failed:', error);
          });
      }
    });
    return unsubscribe;
  }, []);

  // const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     const storageRef = ref(storage, `photos/${Date.now()}_${file.name}`);
  //     const snapshot = await uploadBytes(storageRef, file);
  //     const downloadURL = await getDownloadURL(snapshot.ref);
  //     setDownloadUrl(downloadURL);
  //     setFormData({ ...formData, photo: downloadURL });
  //   } catch (error) {
  //     console.error('Error uploading photo:', error);
  //     alert('Failed to upload photo. Please try again.');
  //   }
  // };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const isDisasterZone = await verifyDisasterZone(latitude, longitude);
        if (isDisasterZone) {
          setFormData({ ...formData, location: { lat: latitude, lng: longitude } });
        } else {
          alert('Location not in disaster zone!');
        }
      },
      () => alert('Location access denied!')
    );
  };

  const verifyDisasterZone = async (lat: number, lng: number): Promise<boolean> => {
    return true; // Replace with actual logic
  };

  const submitRequest = async (e: FormEvent) => {
    e.preventDefault();
    // if (!formData.location || !downloadUrl) {
    //   alert('Please provide location and photo.');
    //   return;
    // }

    try {
      await addDoc(collection(db, 'requests'), {
        name: formData.name,
        needs: formData.needs,
        location: formData.location,
        photo: downloadUrl,
        status: 'pending',
        source: 'web',
        timestamp: serverTimestamp(),
        uid: user?.uid,
      });
      setFormData({ name: '', message: '', needs: '', photo: null, location: null });
      setDownloadUrl('');
      alert('Request submitted successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center px-4">
        <RequestForm
          formData={formData}
          setFormData={setFormData}
          handlePhotoUpload={handlePhotoUpload}
          getLocation={getLocation}
          submitRequest={submitRequest}
        />
      </div>
    </>
  );
};

export default Home;